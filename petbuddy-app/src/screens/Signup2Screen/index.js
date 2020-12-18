import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button as PaperButton, Dialog, Portal, Title, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { theme } from '../../core/theme';
import { ValidatePhone } from '../../utils/validation';
import * as ROUTES from '../../constants/routes';
import * as COLLECTIONS from '../../constants/collections';
import Background from '../../components/Background';
import Button from '../../components/Button';

function Signup2Screen(props) {
    const [details, setDetails] = useState({
        fname: '',
        lname: '',
        username: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    function Signup() {
        if (details.fname.length < 1) {
            setError('The first name field cannot be empty.');
            showDialog();
        }
        else if (!details.fname.match(/^[a-zA-Z]+$/)) {
            setError('The first name can only contain letters.');
            showDialog();
        }
        else if (details.lname.length < 1) {
            setError('The last name field cannot be empty.');
            showDialog();
        }
        else if (!details.lname.match(/^[a-zA-Z]+$/)) {
            setError('The last name can only contain letters.');
            showDialog();
        }
        else if (details.username.length < 1) {
            setError('The username field cannot be empty.');
            showDialog();
        }
        else if (!details.username.match(/^[a-zA-Z0-9]+$/)) {
            setError('Username can only contain alphanumeric characters (letters A-Z, numbers 0-9)');
            showDialog();
        }
        else if (details.username.length < 4) {
            setError('The username must be of minimum 4 characters length.');
            showDialog();
        }
        else if (!ValidatePhone(details.phone.trim())) {
            setError('Invalid phone number. Please provide a valid phone number.');
            showDialog();
        }
        //check if username exists
        else {
            auth()
                .createUserWithEmailAndPassword(props.route.params.email, props.route.params.password)
                .then((user) => {
                    //batch write username to username collection
                    firestore()
                        .collection(COLLECTIONS.PROFILES)
                        .doc(user.uid)
                        .set({ //add avatar
                            firstname: details.fname,
                            lastname: details.lname,
                            username: details.username,
                            phone: details.phone,
                            role: 'PETOWNER',
                        })
                        .then(() => {
                            props.navigation.navigate(ROUTES.MAIN);
                        })
                        .catch((error) => {
                            setError('Something went wrong. Please try again later.');
                            showDialog();
                        });
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        setError('The provided email address is already in use. Please enter a different email address.');
                        navigation.navigate(ROUTES.SIGNUP);
                    }
                    else if (error.code === 'auth/invalid-email') {
                        setError('That provided email address is invalid. Please enter a valid email address.');
                        navigation.navigate(ROUTES.SIGNUP);
                    }
                    else {
                        setError('Something went wrong. Please try again later.');
                    }

                    showDialog();
                })
        }
    }

    return (
        <Background>
            <View>
                <Title style={styles.title}>Sign Up</Title>
                <TextInput mode='flat' label='First Name' placeholder='Your first name' style={styles.input} onChangeText={(text) => setDetails({ ...details, fname: text.trim() })} />
                <TextInput mode='flat' label='Last Name' placeholder='Your last name' style={styles.input} onChangeText={(text) => setDetails({ ...details, lname: text.trim() })} />
                <TextInput mode='flat' label='Username' placeholder='Your username' style={styles.input} onChangeText={(text) => setDetails({ ...details, username: text.trim() })} />
                <TextInput mode='flat' label='Phone Number' placeholder='Your phone number' style={styles.input} onChangeText={(text) => setDetails({ ...details, phone: text.trim() })} />
                <Button mode='contained' style={styles.button} onPress={() => Signup()}>Sign Up</Button>
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Sign Up Error</Dialog.Title>
                    <Dialog.Content>
                        <Text>{error}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <PaperButton onPress={hideDialog}>Ok</PaperButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Background>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: theme.colors.background,
        marginTop: 16,
    },
    button: {
        marginTop: 25,
    },
});

export default Signup2Screen;