import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import moment from 'moment';
import { theme } from '../../core/theme';

function PetCard(props) {
    const renderDetails = (type, name, gender, birthday) => {
        return (
            <View>
                <Text>Type: {type}</Text>
                <Text>Name: {name}</Text>
                <Text>Gender: {gender}</Text>
                <Text>Age: {moment().diff(birthday.toDate(), 'years')}</Text>
            </View>
        );
    }

    const renderAvatar = (side) => {
        return (
            <View style={{ marginRight: (side === 'right') ? 15 : 0, marginLeft: (side === 'left') ? 15 : 0 }} >
                <Avatar.Text size={80} label='CW' />
            </View>
        );
    }

    return (
        <View style={{ flexDirection: 'column', alignItems: (props.side === 'left') ? 'flex-start' : 'flex-end' }}>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    {props.side === 'left' ? renderDetails(props.type, props.name, props.gender, props.birthday) : renderAvatar('right')}
                    {props.side === 'left' ? renderAvatar('left') : renderDetails(props.type, props.name, props.gender, props.birthday)}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '55%',
        margin: 10,
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
});

export default PetCard;