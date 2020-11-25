import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Title, TextInput } from 'react-native-paper';
import { theme } from '../../core/theme';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Button from '../../components/Button';

function SignupScreen({ navigation }) {
    return (
        <Background>
            <View style={styles.logo} >
                <Logo />
            </View>
            <View style={styles.form}>
                <Title style={styles.title}>Sign Up</Title>
                <TextInput mode='flat' label='Email' placeholder='Your email address' style={styles.input} />
                <TextInput mode='flat' label='Password' placeholder='Your password' style={styles.input} secureTextEntry />
                <Button mode='contained' style={styles.button} onPress={() => navigation.navigate('Signup2')}>Continue</Button>
                <View style={styles.footer}>
                    <Text>Have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.highligtText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: theme.colors.background,
        marginTop: 16,
    },
    button: {
        marginTop: 25,
    },
});

export default memo(SignupScreen);