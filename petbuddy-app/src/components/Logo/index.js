import React, { memo } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { theme } from '../../core/theme';

function Logo() {
    <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.image} />
        <Text style={styles.logo}>Pet Buddy</Text>
    </View>
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

export default memo(Logo);