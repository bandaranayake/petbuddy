import React, { memo } from 'react';
import Background from '../../components/Background';
import Button from '../../components/Button';
import { StyleSheet, View } from 'react-native';

function LandingScreen({ navigation }) {
    return (
        <Background>
            <View style={styles.form}>
                <Button mode='contained' style={styles.button} onPress={() => navigation.navigate('Filter')}>Find Pet Sitter</Button>
                <Button mode='contained' style={styles.button} onPress={() => navigation.navigate('Signup')}>Sign Up</Button>
                <Button mode='contained' style={styles.button} onPress={() => navigation.navigate('Login')}>Sign In</Button>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 3,
        width: '100%',
        justifyContent: 'center',
    },
});

export default memo(LandingScreen);