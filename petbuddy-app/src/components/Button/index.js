import React, { memo } from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { theme } from '../../core/theme';

function Button({ mode, style, children, ...props }) {
    return (
        <PaperButton
            style={[
                styles.button,
                mode === 'outlined' && { backgroundColor: theme.colors.surface },
                style,
            ]}
            labelStyle={styles.text}
            mode={mode}
            {...props}
        >
            {children}
        </PaperButton>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        marginVertical: 15,
        width: '100%',
    },
    text: {
        color: theme.colors.background,
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
});

export default memo(Button);