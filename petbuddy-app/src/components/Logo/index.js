import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../core/theme';
import { IMAGE_LOGO } from '../../assets/images';

function Logo() {
    return (
        <View style={styles.container}>
            <Image source={IMAGE_LOGO} style={styles.image} />
            <Text style={styles.logo}>Pet Buddy</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 12,
    },
    logo: {
        color: theme.colors.secondary,
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 0,
    }
});

export default Logo;