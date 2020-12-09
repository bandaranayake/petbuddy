import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button as PaperButton, Dialog, Portal, Title, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { theme } from '../../core/theme';
import { ValidateEmail } from '../../utils/validation';
import * as ROUTES from '../../constants/routes'
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Button from '../../components/Button';

function ResetScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    function handleReset() {
        if (!ValidateEmail(email)) {
            setError('The provided email address is not valid. Please enter a valid email address.');
            showDialog();
        }
        else {
            auth()
                .sendPasswordResetEmail(email)
                .then(() => navigation.navigate(ROUTES.LOGIN))
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        setError('There is no user record corresponding to the provided email address.');
                    }
                    else if (error.code === 'auth/invalid-email') {
                        setError('That provided email address is invalid. Please enter a valid email address.');
                    }
                    else {
                        setError('Something went wrong. Please try again later.');
                    }
                    showDialog();
                });
        }
    }

    return (
        <Background>
            <View style={styles.logo} >
                <Logo />
            </View>
            <View style={styles.form}>
                <Title style={styles.title}>Reset Password</Title>
                <TextInput mode='flat' label='Email' placeholder='Your email address' style={styles.input} onChangeText={(text) => setEmail(text)} />
                <Button mode='contained' style={styles.button} onPress={() => handleReset()}>Continue</Button>
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Password Reset Error</Dialog.Title>
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
    logo: {
        flex: 2,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    form: {
        flex: 3,
        width: '100%',
    },
    input: {
        backgroundColor: theme.colors.background,
        marginTop: 16,
    },
    button: {
        marginTop: 25,
    },
});

export default ResetScreen;