import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { updateStatus } from '../../actions/bookingActions';
import firestore from '@react-native-firebase/firestore';
import { theme } from '../../core/theme';
import * as ROLES from '../../constants/roles';
import * as GLOBAL from '../../constants/global';
import * as COLLECTIONS from '../../constants/collections';
import ChatBubble from '../../components/ChatBubble';
import PetCard from '../../components/PetCard';

function ChatScreen(props) {
    const bookingid = props.route.params.bookingid;
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [details, setDetails] = useState({ status: 0, service: 0 });
    const scrollViewRef = useRef();

    useEffect(() => {
        const messagesListener = firestore()
            .collection(COLLECTIONS.BOOKINGS)
            .doc(bookingid)
            .collection(COLLECTIONS.MESSAGES)
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

    useEffect(() => {
        let i = props.bookings.findIndex(item => item.id === bookingid);
        if (i !== null) {
            setDetails(props.bookings[i]);
        }
    }, [props.bookings])

    const renderMessages = () => {
        return messages.map((item, i) =>
            (item.type === undefined) ?
                <ChatBubble key={i} timestamp={item.timestamp} message={item.message} side={(item.sender === props.profile.uid) ? 'right' : 'left'} />
                :
                <PetCard key={i} type={item.type} name={item.name} gender={item.gender} birthday={item.birthday} side={(item.sender === props.profile.uid) ? 'right' : 'left'} />
        )
    }

    const renderActionButtons = () => {
        if (props.currentProfile === ROLES.PETOWNER && details.status === 1) {
            return <View style={{ paddingTop: 10, marginBottom: 5, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'center' }}>
                <Button mode='contained' color='#3BB273' dark={true} style={{ marginRight: 2 }} onPress={() => updateStatus(4)}>Complete Order</Button>
                <Button mode='contained' color='#E1BC29' dark={true} style={{ marginLeft: 2 }} onPress={() => updateStatus(3)}>Cancel Order</Button>
            </View>
        }
        else if (props.currentProfile === ROLES.PETSITTER && details.status === 0) {
            return <View style={{ paddingTop: 10, marginBottom: 5, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'center' }}>
                <Button mode='contained' color='#4D9DE0' dark={true} style={{ marginRight: 2 }} onPress={() => updateStatus(1)}>Accept Order</Button>
                <Button mode='contained' color='#E15554' style={{ marginLeft: 2 }} onPress={() => updateStatus(2)}>Reject Order</Button>
            </View>
        }
        return null;
    }

    const sendMessage = () => {
        if (messageText.length > 0) {
            const message = {
                timestamp: firestore.FieldValue.serverTimestamp(),
                message: messageText,
                sender: props.profile.uid,
            };

            firestore()
                .collection(COLLECTIONS.BOOKINGS)
                .doc(bookingid)
                .collection(COLLECTIONS.MESSAGES)
                .add(message)
                .then(setMessageText(''));
        }
    }

    const updateStatus = (newStatus) => {
        firestore()
            .collection(COLLECTIONS.BOOKINGS)
            .doc(bookingid)
            .update({ status: newStatus });
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
                        (props.currentProfile === ROLES.PETOWNER) ?
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
                        <Text>{(details.fromDate != undefined) ? details.fromDate : null}</Text>
                    </View>
                    <View style={styles.col}>
                        <Icon1 name='calendar-today' size={20} color='black' style={styles.icon} />
                        <Text>To: </Text>
                        <Text>{(details.toDate != undefined) ? details.toDate : null}</Text>
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
            {renderActionButtons()}
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => { scrollViewRef.current.scrollToEnd({ animated: true }) }}>
                {renderMessages()}
            </ScrollView>
            {
                (details.status === 2 || details.status === 3 || details.status === 4) ? null :
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
            }
        </View >
    );
}

const mapStateToProps = state => ({
    profile: state.profile.details,
    currentProfile: state.profile.currentProfile,
    bookings: state.bookings.items,
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

export default connect(mapStateToProps, { updateStatus })(ChatScreen);