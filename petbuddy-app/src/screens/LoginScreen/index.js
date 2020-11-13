import React, { memo } from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Title, TextInput } from 'react-native-paper';
import { theme } from '../../core/theme';

function LoginScreen({ navigation }) {
    return (
        <Background>
            <View style={styles.logo} >
                <Logo />
            </View>
            <View style={styles.form}>
                <Title style={styles.title}>Sign In</Title>
                <TextInput mode='flat' label='Email' placeholder='Your email address' style={styles.input} />
                <TextInput mode='flat' label='Password' placeholder='Your password' style={styles.input} secureTextEntry />
                <Button mode='contained' style={styles.button}>Sign In</Button>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.navigate('ResetScreen')}>
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                        <Text style={styles.highligtText}>Sign Up</Text>
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
    row: {
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default memo(LoginScreen);