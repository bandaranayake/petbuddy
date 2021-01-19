import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import moment from 'moment';
import { theme } from '../../core/theme';
import * as GLOBAL from '../../constants/global';

function PetCard(props) {
    const renderDetails = (type, name, gender, birthday) => {
        return (
            <View>
                <Text>Type: {GLOBAL.FindLabel(type, GLOBAL.PETS)}</Text>
                <Text>Name: {name}</Text>
                <Text>Gender: {GLOBAL.FindLabel(gender, GLOBAL.GENDER)}</Text>
                <Text>Age: {moment().diff(moment(birthday), 'years')}</Text>
            </View>
        );
    }

    const renderAvatar = (side, avatar) => {
        return (
            <View style={{ marginRight: (side === 'right') ? 15 : 0, marginLeft: (side === 'left') ? 15 : 0 }} >
                <Avatar.Image size={80} source={{ uri: avatar }} />
            </View>
        );
    }

    return (
        <View style={{ flexDirection: 'column', alignItems: (props.side === 'left') ? 'flex-start' : 'flex-end' }}>
            <View style={styles.innerContainer}>
                {props.side === 'left' ? renderDetails(props.type, props.name, props.gender, props.birthday) : renderAvatar('right', props.avatar)}
                {props.side === 'left' ? renderAvatar('left', props.avatar) : renderDetails(props.type, props.name, props.gender, props.birthday)}
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