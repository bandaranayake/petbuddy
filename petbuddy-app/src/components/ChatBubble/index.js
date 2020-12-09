import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { theme } from '../../core/theme';

function ChatBubble(props) {
    return (
        <View style={styles.container}>
            {props.side == 'left' ? renderAvartar('left') : renderMessage('right')}
            {props.side == 'left' ? renderMessage('left') : renderAvartar('right')}
        </View>
    );
}

function renderAvartar(side) {
    return (
        <View style={{ width: 50, marginRight: (side == 'left') ? 5 : 0, marginLeft: (side == 'left') ? 0 : 5 }} >
            <Avatar.Text size={50} label='CW' />
        </View>
    );
}

function renderMessage(side) {
    return (
        <View style={{ flex: 1, alignItems: (side == 'left') ? 'flex-start' : 'flex-end' }} >
            <View style={styles.chatBubble}>
                <Text>{props.message}</Text>
                <Text style={styles.text}>{props.timestamp}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    chatBubble: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.background,
        shadowColor: theme.colors.onBackground,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 1,
    },
    text: {
        marginTop: 5,
        fontSize: 10,
        color: theme.colors.placeholder,
    },
});

export default ChatBubble;