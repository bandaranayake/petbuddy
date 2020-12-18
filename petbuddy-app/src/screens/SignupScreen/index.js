import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Button as PaperButton, Dialog, Portal, Title, TextInput } from 'react-native-paper';
import { theme } from '../../core/theme';
import { ValidateEmail } from '../../utils/validation';
import * as ROUTES from '../../constants/routes'
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Button from '../../components/Button';

function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    function Validate() {
        if (!ValidateEmail(email)) {
            setError('The provided email address is not valid. Please enter a valid email address.');
            showDialog();
        }
        else if (password.length < 8) {
            setError('Password must be of minimum 8 characters length.');
            showDialog();
        }
        else {
            navigation.navigate(ROUTES.SIGNUP2, { email: email, password: password });
        }
    }

    return (
        <Background>
            <View style={styles.header} >
                <Logo />
            </View>
            <View style={styles.form}>
                <Title style={styles.title}>Sign Up</Title>
                <TextInput mode='flat' label='Email' placeholder='Your email address' style={styles.input} onChangeText={(text) => setEmail(text.trim())} />
                <TextInput mode='flat' label='Password' placeholder='Your password' style={styles.input} secureTextEntry onChangeText={(text) => setPassword(text.trim())} />
                <Button mode='contained' style={{ marginTop: 25 }} onPress={() => Validate()}>Continue</Button>
                <View style={styles.footer}>
                    <Text>Have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
                        <Text style={styles.highligtText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
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
});

export default SignupScreen;