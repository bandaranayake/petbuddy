import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { theme } from '../../core/theme';

function DropdownCustom(props) {
    const [selectedValue, setSelectedValue] = useState(props.value);

    const onValueChange = (value) => {
        setSelectedValue(value);
        props.onValueChange(value);
    }

    return (
        <View style={props.style}>
            {(selectedValue != null) ?
                <Text style={styles.title}>{props.title}</Text> : null
            }
            <RNPickerSelect
                style={{ ...pickerSelectStyles }}
                placeholder={{ label: props.title, value: null }}
                useNativeAndroidPickerStyle={false}
                hideIcon={true}
                items={props.items}
                key={props.value}
                value={props.value}
                onValueChange={(value) => onValueChange(value)}
            />
            <Divider style={styles.divider} />
        </View>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        height: 40,
        fontSize: 16,
        padding: 10,
        marginLeft: 3,
        marginBottom: 3,
        backgroundColor: theme.colors.background,
        color: theme.colors.onBackground,
    },
    placeholder: {
        color: theme.colors.placeholder,
    },
});

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: theme.colors.secondary,
    },
    title: {
        fontSize: 12,
        marginLeft: 10,
        color: theme.colors.placeholder,
    },
});

export default DropdownCustom;