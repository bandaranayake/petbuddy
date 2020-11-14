import React, { memo } from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { StyleSheet, View } from 'react-native';
import { Title, TextInput } from 'react-native-paper';
import { theme } from '../../core/theme';

function ResetScreen() {
    return (
        <Background>
            <View style={styles.logo} >
                <Logo />
            </View>
            <View style={styles.form}>
                <Title style={styles.title}>Reset Password</Title>
                <TextInput mode='flat' label='Email' placeholder='Your email address' style={styles.input} />
                <Button mode='contained' style={styles.button}>Continue</Button>
            </View>
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

export default memo(ResetScreen);