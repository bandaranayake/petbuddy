import React, { memo } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../../core/theme';

function BookingCard(props) {
    return (
        <View>
            <TouchableHighlight onPress={props.onPress} underlayColor={theme.colors.highlight} style={{ marginTop: 5 }}>
                <View style={styles.container}>
                    <View style={{ flex: 2, alignItems: 'center' }}>
                        <Text></Text >
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', borderRadius: 2 }}>
                        <Text style={{ color: 'white' }}></Text>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center' }}>
                        <Text></Text>
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

export default memo(BookingCard);