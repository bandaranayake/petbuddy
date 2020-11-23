import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import DateRangeDisplay from '../../components/DateRangeDisplay';
import { theme } from '../../core/theme';

function FilterScreen({ navigation }) {
    let items = [

    ];

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>City: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Dropdown label='Select a City' items={items} />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Service: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Dropdown label='Select a Service' items={items} />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Level: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Dropdown label='Select a Level' items={items} />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Pet: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Dropdown label='Select a Pet type' items={items} />
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
            <Button mode='contained' style={styles.button}>Filter</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingHorizontal: 50,
        paddingVertical: 30,
        width: '100%',
    },
    row: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center'
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

export default memo(FilterScreen);