import React, { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../core/theme';
import ChatBubble from '../../components/ChatBubble';

function ChatScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Icon name='book' size={20} color='black' style={styles.icon} />
                        <Text>Service: </Text>
                        <Text>Pet Sitting</Text>
                    </View>
                    <View style={styles.col}>
                        <Icon name='work' size={20} color='black' style={styles.icon} />
                        <Text>Provider: </Text>
                        <Text>Ward Carlos</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Icon name='calendar-today' size={20} color='black' style={styles.icon} />
                        <Text>From: </Text>
                        <Text>2020/12/15</Text>
                    </View>
                    <View style={styles.col}>
                        <Icon name='calendar-today' size={20} color='black' style={styles.icon} />
                        <Text>To: </Text>
                        <Text>2020/12/16</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Icon name='credit-card' size={20} color='black' style={styles.icon} />
                        <Text>Total Price: </Text>
                        <Text>$50</Text>
                    </View>
                    <View style={styles.col}>
                        <Icon name='history' size={20} color='black' style={styles.icon} />
                        <Text>Status: </Text>
                        <Text>Approved</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <ChatBubble side='right' />
            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={styles.subContainer}>
                    <View style={{ flex: 1, marginRight: 5, }}>
                        <TextInput placeholder='Type your message' style={{ height: 30, backgroundColor: theme.colors.background }} />
                    </View>
                    <View style={{ width: 40 }}>
                        <IconButton
                            icon='send'
                            size={25}
                            color={theme.colors.primary}
                            onPress={() => console.log('call send message method')}
                        />
                    </View>
                </View>
            </View>
        </View >
    );
}

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

export default memo(ChatScreen);