import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { theme } from '../../core/theme';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import DateRangeDisplay from '../../components/DateRangeDisplay';
import PetSelector from '../../components/PetSelector';

function MakeBookingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Service: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Dropdown label='Select a Service' items={[]} />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Date: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <DateRangeDisplay />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Pets: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <PetSelector items={[]} />
                </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Total Price: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.label}>0 LKR</Text>
                </View>
            </View>
            <Button mode='contained' style={styles.button}>Book</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingHorizontal: 44,
        paddingVertical: 20,
        width: '100%',
    },
    row: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        marginTop: 16,
    },
    labelContainer: {
        flex: 2,
    },
    itemContainer: {
        flex: 5,
    },
    button: {
        marginTop: 25,
    },
    label: {
        fontSize: 15,
        color: theme.colors.secondary,
    },
});

export default memo(MakeBookingScreen);