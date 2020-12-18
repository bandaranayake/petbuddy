import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import * as ROUTES from '../../constants/routes'
import Button from '../../components/Button';
import { theme } from '../../core/theme';

function LandingScreen({ navigation }) {
    return (
        <ImageBackground source={require('../../assets/background.png')} style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>PET BUDDY</Text>
                <Button mode='contained' onPress={() => navigation.navigate(ROUTES.MAIN)}>Find Pet Sitter</Button>
                <Button mode='contained' onPress={() => navigation.navigate(ROUTES.SIGNUP)}>Sign Up</Button>
                <Button mode='contained' onPress={() => navigation.navigate(ROUTES.LOGIN)}>Sign In</Button>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    inner: {
        flex: 1,
        padding: 45,
        marginBottom: 30,
        justifyContent: 'flex-end',
    },
    title: {
        alignSelf: 'center',
        marginBottom: 20,
        fontSize: 35,
        fontWeight: 'bold',
        color: theme.colors.primary,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
    },
});

export default LandingScreen;