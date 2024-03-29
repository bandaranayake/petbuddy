import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import moment from 'moment';
import { theme } from '../../core/theme';

function ChatBubble(props) {
    const renderAvatar = (side, avatar) => {
        return (
            <View style={{ width: 50, marginRight: (side == 'left') ? 5 : 0, marginLeft: (side == 'left') ? 0 : 5 }} >
                <Avatar.Image size={50} source={{ uri: avatar }} />
            </View>
        );
    }

    const renderMessage = (side, message, timestamp) => {
        return (
            <View style={{ flex: 1, alignItems: (side == 'left') ? 'flex-start' : 'flex-end' }} >
                <View style={styles.chatBubble}>
                    <Text>{message}</Text>
                    <Text style={styles.text}>{moment(timestamp.toDate()).format('YYYY-MM-DD h:mm A')}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {props.side == 'left' ? renderAvatar('left', props.avatar) : renderMessage('right', props.message, props.timestamp)}
            {props.side == 'left' ? renderMessage('left', props.message, props.timestamp) : renderAvatar('right', props.avatar)}
        </View>
    );
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