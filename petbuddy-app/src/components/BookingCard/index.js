import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../../core/theme';

function BookingCard(props) {
    const color = { 'Upcoming': '#7768AE', 'Approved': '#4D9DE0', 'Rejected': '#E15554', 'Cancelled': '#E1BC29', 'Completed': '#3BB273' };
    return (
        <View>
            <TouchableHighlight onPress={props.onPress} underlayColor={theme.colors.highlight} style={{ marginTop: 5 }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', flex: 2, alignItems: 'center', paddingLeft: 10 }}>
                        <Text style={{ marginRight: 10 }}>{props.id}</Text>
                        <Text>{props.service}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: color[props.status], borderRadius: 5, padding: 2 }}>
                        <Text style={{ color: theme.colors.onPrimary }}>{props.status}</Text>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center' }}>
                        <Text>{props.date}</Text>
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