import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Divider, Dialog, Portal, Text } from 'react-native-paper';
import { Calendar as RNCalendar } from 'react-native-calendars';
import moment from 'moment';
import { theme } from '../../core/theme';

function Calendar(props) {
    const [visible, setVisible] = useState(false);
    const [textColor, setTextColor] = useState(theme.colors.placeholder);
    const [displayText, setDisplayText] = useState(props.placeholder);
    const [selectedDate, setSelectedDate] = useState(null);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const onDateChanged = (date) => {
        let markedDates = {};
        let serviceDate = moment(date.dateString);

        markedDates[date.dateString] = { selected: true, selectedColor: theme.colors.primary };
        setSelectedDate(markedDates);
        setTextColor(theme.colors.onSurface);
        setDisplayText(serviceDate.format("YYYY.MM.DD"));
        props.onValueChange(date);
    };

    return (
        <View style={props.style}>
            <TouchableOpacity onPress={showDialog}>
                <Text style={{ fontSize: 16, padding: 10, color: textColor }}>{displayText}</Text>
                <Divider style={{ height: 1, backgroundColor: theme.colors.secondary }} />
            </TouchableOpacity>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Select a Date</Dialog.Title>
                    <Dialog.Content>
                        <RNCalendar
                            markedDates={selectedDate}
                            theme={{
                                todayTextColor: theme.colors.onSurface,
                                arrowColor: theme.colors.primary
                            }}
                            onDayPress={(day) => onDateChanged(day)} />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => hideDialog()}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

export default Calendar;