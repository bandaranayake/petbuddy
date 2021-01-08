import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Divider, Dialog, Portal, Text } from 'react-native-paper';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { theme } from '../../core/theme';

function Calendar(props) {
    const [visible, setVisible] = useState(false);
    const [textColor, setTextColor] = useState(theme.colors.placeholder);
    const [displayText, setDisplayText] = useState('');
    const [selectedDate, setSelectedDate] = useState({});

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        let markedDates = {};
        markedDates[props.value] = { selected: true, selectedColor: theme.colors.primary };
        setSelectedDate(markedDates);

        if (props.value == undefined) {
            setTextColor(theme.colors.placeholder);
            setDisplayText(props.placeholder);
        }
        else {
            setTextColor(theme.colors.onSurface);
            setDisplayText(props.value);
        }
    }, [])

    const onDateChanged = (date) => {
        let markedDates = {};
        markedDates[date.dateString] = { selected: true, selectedColor: theme.colors.primary };
        setSelectedDate(markedDates);
        setTextColor(theme.colors.onSurface);
        setDisplayText(date.dateString);
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