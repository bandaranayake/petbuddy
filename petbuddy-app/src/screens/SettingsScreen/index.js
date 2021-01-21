import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button as PaperButton, Dialog, Portal, Snackbar, Title, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { theme } from '../../core/theme';
import Background from '../../components/Background';
import Button from '../../components/Button';

function SettingsScreen() {
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [snackVisible, setSnackVisible] = React.useState(false);

    const onToggleSnackBar = () => setSnackVisible(!snackVisible);
    const onDismissSnackBar = () => setSnackVisible(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const updatePassword = () => {
        if (password.length < 8) {
            setMessage('Password must be of minimum 8 characters length.');
            showDialog();
        }
        else if (cPassword !== password) {
            setMessage('Passwords does not match.');
            showDialog();
        }
        else {
            auth().currentUser.updatePassword(password).then(() => {
                setMessage('Password updated successfully');
                onToggleSnackBar();
            }).catch(err => {
                setMessage('Something went wrong. Please try again later.');
                showDialog();
            });
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Background>
                <View>
                    <Title style={styles.title}>Settings</Title>
                    <TextInput mode='flat' label='New Password' placeholder='Enter new password' style={styles.input} secureTextEntry secureTextEntry onChangeText={(text) => setPassword(text.trim())} />
                    <TextInput mode='flat' label='Confirm Password' placeholder='Confirm new password' style={styles.input} secureTextEntry secureTextEntry onChangeText={(text) => setCPassword(text.trim())} />
                    <Button mode='contained' style={{ marginTop: 25 }} onPress={() => updatePassword()}>Update Password</Button>
                </View>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Update Password</Dialog.Title>
                        <Dialog.Content>
                            <Text>{message}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <PaperButton onPress={hideDialog}>Ok</PaperButton>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Background>
            <Snackbar
                visible={snackVisible}
                onDismiss={onDismissSnackBar}>
                {message}
            </Snackbar>
        </View>
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

export default SettingsScreen;