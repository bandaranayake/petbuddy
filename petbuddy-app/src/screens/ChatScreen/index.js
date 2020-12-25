import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { theme } from '../../core/theme';
import * as ROLES from '../../constants/roles';
import * as GLOBAL from '../../constants/global';
import ChatBubble from '../../components/ChatBubble';

function ChatScreen(props) {
    const details = props.route.params.details;
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const scrollViewRef = useRef();

    useEffect(() => {
        const messagesListener = firestore()
            .collection('bookings')
            .doc(details.id)
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot(snapshot => {
                if (!snapshot.metadata.hasPendingWrites) {
                    let c = [];
                    snapshot.forEach(doc => c.push(doc.data()));

                    setMessages(c);
                }
            })

        return () => messagesListener();
    }, [])

    const renderMessages = () => {
        return messages.map((item, i) =>
            <ChatBubble key={i} timestamp={item.timestamp} message={item.message} side={(item.sender === props.profile.uid) ? 'right' : 'left'} />
        )
    }

    const sendMessage = () => {
        if (messageText.length > 0) {
            const message = {
                timestamp: firestore.FieldValue.serverTimestamp(),
                message: messageText,
                sender: props.profile.uid,
            };

            firestore()
                .collection('bookings')
                .doc(details.id)
                .collection('messages')
                .add(message)
                .then(setMessageText(''));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Icon1 name='book' size={20} color='black' style={styles.icon} />
                        <Text>Service: </Text>
                        <Text>{GLOBAL.FindLabel(details.service, GLOBAL.SERVICES)}</Text>
                    </View>
                    {
                        (props.profile.role === ROLES.PETOWNER) ?
                            <View style={styles.col}>
                                <Icon1 name='work' size={20} color='black' style={styles.icon} />
                                <Text>Provider: </Text>
                                <Text>{details.petSitterName}</Text>
                            </View>
                            :
                            <View style={styles.col}>
                                <Icon2 name='account-tie' size={20} color='black' style={styles.icon} />
                                <Text>Customer: </Text>
                                <Text>{details.petOwnerName}</Text>
                            </View>
                    }
                </View>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Icon1 name='calendar-today' size={20} color='black' style={styles.icon} />
                        <Text>From: </Text>
                        <Text>{details.fromDate}</Text>
                    </View>
                    <View style={styles.col}>
                        <Icon1 name='calendar-today' size={20} color='black' style={styles.icon} />
                        <Text>To: </Text>
                        <Text>{details.toDate}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Icon1 name='credit-card' size={20} color='black' style={styles.icon} />
                        <Text>Total Price: </Text>
                        <Text>{details.fee} LKR</Text>
                    </View>
                    <View style={styles.col}>
                        <Icon1 name='history' size={20} color='black' style={styles.icon} />
                        <Text>Status: </Text>
                        <Text>{GLOBAL.FindLabel(details.status, GLOBAL.STATUS)}</Text>
                    </View>
                </View>
            </View>
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => { scrollViewRef.current.scrollToEnd({ animated: true }) }}>
                {renderMessages()}
            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={styles.subContainer}>
                    <View style={{ flex: 1, marginRight: 5, }}>
                        <TextInput placeholder='Type your message' style={{ height: 30, backgroundColor: theme.colors.background }} value={messageText} onChangeText={value => setMessageText(value)} />
                    </View>
                    <View style={{ width: 40 }}>
                        <IconButton
                            icon='send'
                            size={25}
                            color={theme.colors.primary}
                            onPress={sendMessage}
                        />
                    </View>
                </View>
            </View>
        </View >
    );
}

const mapStateToProps = state => ({
    profile: state.profile.details,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    headContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        shadowColor: theme.colors.onBackground,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: theme.colors.background,
    },
    footerContainer: {
        marginTop: 3,
        margin: 10,
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    col: {
        flexDirection: 'row',
        flex: 3,
    },
    icon: {
        marginRight: 5,
    }
});

export default connect(mapStateToProps)(ChatScreen);