import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Avatar, Divider, Text } from 'react-native-paper';
import Rating from '../Rating';
import { theme } from '../../core/theme';
import * as GLOBAL from '../../constants/global';

function ServiceCard(props) {
    return (
        <View>
            <TouchableHighlight onPress={props.onPress} underlayColor={theme.colors.background}>
                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Avatar.Text size={60} label='CW' />
                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-start', marginLeft: 15 }}>
                        <Text style={{ marginBottom: 2, fontSize: 15, fontWeight: 'bold' }}>{props.firstname + ' ' + props.lastname}</Text >
                        <Rating style={{ marginBottom: 2 }} count={5} rating={props.rating} size={16} />
                        <Text style={{ marginBottom: 2, fontSize: 12, }}>Job Count ({props.jobs})</Text >
                    </View>
                    <View style={{ flex: 2, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>{GLOBAL.FindLabel(props.level, GLOBAL.LEVELS)}</Text>
                    </View>
                </View>
            </TouchableHighlight>
            <Divider />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingStart: 5,
    },
});

export default ServiceCard;