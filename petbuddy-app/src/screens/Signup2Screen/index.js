import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, TextInput } from 'react-native-paper';
import { theme } from '../../core/theme';
import Background from '../../components/Background';
import Button from '../../components/Button';

function Signup2Screen({ navigation }) {
    return (
        <Background>
            <View style={styles.form}>
                <Title style={styles.title}>Sign Up</Title>
                <TextInput mode='flat' label='First Name' placeholder='Your first name' style={styles.input} />
                <TextInput mode='flat' label='Last Name' placeholder='Your last name' style={styles.input} secureTextEntry />
                <TextInput mode='flat' label='Username' placeholder='Your username' style={styles.input} secureTextEntry />
                <TextInput mode='flat' label='Phone Number' placeholder='Your phone number' style={styles.input} secureTextEntry />
                <Button mode='contained' style={styles.button}>Sign Up</Button>
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
    form: {
        flex: 3,
        width: '100%',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: theme.colors.background,
        marginTop: 16,
    },
    button: {
        marginTop: 25,
    },
});

export default memo(Signup2Screen);