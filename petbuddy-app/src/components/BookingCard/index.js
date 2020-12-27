import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../../core/theme';
import * as GLOBAL from '../../constants/global';

function BookingCard(props) {
    const status = GLOBAL.FindElement(props.status, GLOBAL.STATUS);

    return (
        <View>
            <TouchableHighlight onPress={props.onPress} underlayColor={theme.colors.highlight} style={{ marginTop: 5 }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', flex: 2, alignItems: 'center', paddingLeft: 10 }}>
                        <Text style={{ marginRight: 10 }}>#{props.id}</Text>
                        <Text>{GLOBAL.FindLabel(props.service, GLOBAL.SERVICES)}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: status.bg, borderRadius: 5, padding: 2, marginRight: 20 }}>
                        <Text style={{ color: theme.colors.onPrimary }}>{status.label}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', paddingRight: 10 }}>
                        <Text>{props.fromDate}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: theme.colors.secondary,
    },
});

export default BookingCard;