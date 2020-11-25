import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../../core/theme';

function Button({ mode, style, labelStyle, children, ...props }) {
    return (
        <PaperButton
            style={[
                styles.button,
                mode === 'outlined' && { backgroundColor: theme.colors.primary },
                style,
            ]}
            labelStyle={[
                styles.text,
                labelStyle,
            ]}
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
        color: theme.colors.onPrimary,
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
});

export default memo(Button);