import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button as PaperButton, Dialog, Portal, Title, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { theme } from '../../core/theme';
import { ValidatePhone } from '../../utils/validation';
import * as ROUTES from '../../constants/routes'
import Background from '../../components/Background';
import Button from '../../components/Button';

function Signup2Screen(props) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    function Signup() {
        if (fname.length < 1) {
            setError('The first name field cannot be empty.');
            showDialog();
        }
        else if (!fname.match(/^[a-zA-Z]+$/)) {
            setError('The first name can only contain letters.');
            showDialog();
        }
        else if (lname.length < 1) {
            setError('The last name field cannot be empty.');
            showDialog();
        }
        else if (!lname.match(/^[a-zA-Z]+$/)) {
            setError('The last name can only contain letters.');
            showDialog();
        }
        else if (username.length < 1) {
            setError('The username field cannot be empty.');
            showDialog();
        }
        else if (!username.match(/^[a-zA-Z0-9]+$/)) {
            setError('Username can only contain alphanumeric characters (letters A-Z, numbers 0-9)');
            showDialog();
        }
        else if (username.length < 4) {
            setError('The username must be of minimum 4 characters length.');
            showDialog();
        }
        else if (!ValidatePhone(phone.trim())) {
            setError('Invalid phone number. Please provide a valid phone number.');
            showDialog();
        }
        else {
            auth()
                .createUserWithEmailAndPassword(props.route.params.email, props.route.params.password)
                .then(() => {
                    props.navigation.navigate(ROUTES.MAIN);
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
                <TextInput mode='flat' label='First Name' placeholder='Your first name' style={styles.input} onChangeText={(text) => setFname(text.trim())} />
                <TextInput mode='flat' label='Last Name' placeholder='Your last name' style={styles.input} onChangeText={(text) => setLname(text.trim())} />
                <TextInput mode='flat' label='Username' placeholder='Your username' style={styles.input} onChangeText={(text) => setUsername(text.trim())} />
                <TextInput mode='flat' label='Phone Number' placeholder='Your phone number' style={styles.input} onChangeText={(text) => setPhone(text.trim())} />
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