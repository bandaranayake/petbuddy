import React from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { theme } from '../../core/theme';

function Background({ children }) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {children}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 20,
        width: '100%',
    },
    inner: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-around',
    }
});

export default Background;