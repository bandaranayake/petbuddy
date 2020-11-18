import React, { useState, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import moment from 'moment';
import { theme } from '../../core/theme';
import DateRangePicker from '../DateRangePicker';

function DateRangeDisplay() {
    const [visible, setVisible] = useState(false);
    const [textColor, setTextColor] = useState(theme.colors.secondary);
    const [displayText, setDisplayText] = useState('Select the Dates');
    const [selectedRange, setSelectedRange] = useState(null);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const onPressOk = () => {
        hideDialog();

        if (selectedRange !== null) {
            setDisplayText(selectedRange[0] + ' to ' + selectedRange[1]);
            setTextColor(theme.colors.onBackground);
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
                            initialRange={selectedRange}
                            minDate={moment().format('YYYY-MM-DD')}
                            onSuccess={(s, e) => setSelectedRange([s, e])}
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

export default memo(DateRangeDisplay);