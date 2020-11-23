import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { theme } from '../../core/theme';

function Dropdown(props) {
    return (
        <RNPickerSelect
            placeholder={{
                label: props.label,
                value: null,
            }}
            onValueChange={(value) => {

            }}
            style={{ ...pickerSelectStyles }}
            useNativeAndroidPickerStyle={false}
            hideIcon={true}
            items={props.items}
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
        color: theme.colors.onBackground,
    },
});

export default memo(Dropdown);