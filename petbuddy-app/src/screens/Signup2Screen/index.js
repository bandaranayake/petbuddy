import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button as PaperButton, Dialog, Portal, Title, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { theme } from '../../core/theme';
import { ValidatePhone } from '../../utils/validation';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import * as COLLECTIONS from '../../constants/collections';
import * as GLOBAL from '../../constants/global';
import Background from '../../components/Background';
import Button from '../../components/Button';
import DropdownCustom from '../../components/DropdownCustom';

function Signup2Screen(props) {
    const [details, setDetails] = useState({
        fname: '',
        lname: '',
        phone: '',
        city: null,
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
        else if (!ValidatePhone(details.phone.trim())) {
            setError('Invalid phone number. Please provide a valid phone number.');
            showDialog();
        }
        else if (details.city == null) {
            setError('Please select your current city.');
            showDialog();
        }
        else {
            auth()
                .createUserWithEmailAndPassword(props.route.params.email, props.route.params.password)
                .then((user) => {
                    firestore()
                        .collection(COLLECTIONS.PROFILES)
                        .doc(user.user.uid)
                        .set({
                            firstname: details.fname,
                            lastname: details.lname,
                            phone: details.phone,
                            city: details.city,
                            role: ROLES.PETOWNER,
                        })
                        .catch((error) => {
                            setError('Something went wrong. Please try again later.');
                            showDialog();
                        });
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        setError('The provided email address is already in use. Please enter a different email address.');
                        props.navigation.navigate(ROUTES.SIGNUP);
                    }
                    else if (error.code === 'auth/invalid-email') {
                        setError('That provided email address is invalid. Please enter a valid email address.');
                        props.navigation.navigate(ROUTES.SIGNUP);
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
                <TextInput mode='flat' label='Phone Number' placeholder='Your phone number' style={styles.input} onChangeText={(text) => setDetails({ ...details, phone: text.trim() })} />
                <DropdownCustom title='Current City' items={GLOBAL.DISTRICTS} style={{ marginTop: 30 }} onValueChange={(value) => setDetails({ ...details, city: value })} />
                <Button mode='contained' style={{ marginTop: 25 }} onPress={() => Signup()}>Sign Up</Button>
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
        </Background >
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
});

export default Signup2Screen;