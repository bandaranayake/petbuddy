import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { theme } from '../../core/theme';

function Dropdown(props) {
    return (
        <RNPickerSelect
            placeholder={
                (props.label !== null) ?
                    {
                        label: props.label,
                        value: null,
                    } : {}
            }
            onValueChange={(value) => {
                props.onValueChange(value);
            }}
            style={{ ...pickerSelectStyles }}
            useNativeAndroidPickerStyle={false}
            hideIcon={true}
            items={
                props.items.map((item) => {
                    return { label: item, value: item }
                })
            }
            key={props.value}
            value={props.value}
        />
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        height: 40,
        fontSize: 15,
        padding: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.background,
        color: theme.colors.placeholder,
    },
});

export default Dropdown;