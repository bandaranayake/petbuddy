import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, TextInput } from 'react-native-paper';
import { theme } from '../../core/theme';
import Background from '../../components/Background';
import Button from '../../components/Button';

function SettingsScreen({ navigation }) {
    return (
        <Background>
            <View>
                <Title style={styles.title}>Settings</Title>
                <TextInput mode='flat' label='Current Password' placeholder='Enter current password' style={styles.input} secureTextEntry />
                <TextInput mode='flat' label='New Password' placeholder='Enter new password' style={styles.input} secureTextEntry secureTextEntry />
                <TextInput mode='flat' label='Confirm Password' placeholder='Confirm new password' style={styles.input} secureTextEntry secureTextEntry />
                <Button mode='contained' style={styles.button}>Update Password</Button>
            </View>
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

export default memo(SettingsScreen);