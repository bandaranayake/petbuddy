import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Button as PaperButton, Dialog, Portal, Title, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { theme } from '../../core/theme';
import { ValidateEmail } from '../../utils/validation';
import * as ROUTES from '../../constants/routes'
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Button from '../../components/Button';

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    function handleLogin() {
        if (!ValidateEmail(email)) {
            setError('The provided email address is not valid. Please enter a valid email address.');
            showDialog();
        }
        else if (password.length < 1) {
            setError('The password field cannot be empty.');
            showDialog();
        }
        else {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => navigation.navigate(ROUTES.MAIN))
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        setError('The provided email address is not valid. Please enter a valid email address.');
                    }
                    else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                        setError('You have entered an invalid email address or password.');
                    }
                    else if (error.code === 'auth/too-many-requests') {
                        setError('We have blocked all requests from this device due to unusual activity. Try again later.');
                    }
                    else if (error.code === 'auth/user-disabled') {
                        setError('Your account has been disabled.');
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
            <View style={styles.header} >
                <Logo />
            </View>
            <View style={styles.form}>
                <Title style={styles.title}>Sign In</Title>
                <TextInput mode='flat' label='Email' placeholder='Your email address' style={styles.input} onChangeText={(text) => setEmail(text)} />
                <TextInput mode='flat' label='Password' placeholder='Your password' style={styles.input} secureTextEntry onChangeText={(text) => setPassword(text)} />
                <Button mode='contained' style={styles.button} onPress={() => handleLogin()}>Sign In</Button>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.RESET)}>
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
                        <Text style={styles.highligtText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Sign In Error</Dialog.Title>
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
    header: {
        flex: 2,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    highligtText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    form: {
        flex: 3,
        width: '100%',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    input: {
        marginTop: 16,
        backgroundColor: theme.colors.background,
    },
    row: {
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default LoginScreen;