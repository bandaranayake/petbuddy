import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import moment from 'moment';
import { theme } from '../../core/theme';
import DateRangePicker from '../DateRangePicker';

function DateRangeDisplay(props) {
    const [visible, setVisible] = useState(false);
    const [textColor, setTextColor] = useState(theme.colors.secondary);
    const [displayText, setDisplayText] = useState('Select the Dates');
    const [selectedDates, setSelectedDates] = useState({
        from: null,
        to: null,
        count: 0,
    });

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const onPressOk = () => {
        hideDialog();

        if (selectedDates.count > 0) {
            props.onPressOK(selectedDates);

            setDisplayText(selectedDates.from + ' to ' + selectedDates.to);
            setTextColor(theme.colors.placeholder);
        }
    };

    return (
        <View>
            <TouchableOpacity style={styles.display} onPress={showDialog}>
                <Text style={{ fontSize: 15, color: textColor }}>{displayText}</Text>
            </TouchableOpacity>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Select the dates</Dialog.Title>
                    <Dialog.Content>
                        <DateRangePicker
                            initialRange={(selectedDates.from === null) ? null : [selectedDates.from, selectedDates.to]}
                            minDate={moment().format('YYYY-MM-DD')}
                            onSuccess={(from, to, count) => setSelectedDates({ from: from, to: to, count: count + 1 })}
                            theme={{ markColor: theme.colors.primary, arrowColor: theme.colors.primary, markTextColor: theme.colors.onPrimary }} />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => onPressOk()}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    display: {
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.background,
    },
});

export default DateRangeDisplay;