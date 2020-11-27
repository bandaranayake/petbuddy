import React, { useState, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, Dialog, Portal, Text } from 'react-native-paper';
import { theme } from '../../core/theme';

function PetSelector(props) {
    const [visible, setVisible] = useState(false);
    const [textColor, setTextColor] = useState(theme.colors.secondary);
    const [displayText, setDisplayText] = useState('Select the Pets');

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const [checkboxes, setCheckboxes] = useState(props.items);

    const onPressOk = () => {
        hideDialog();

        let c = checkboxes.filter((cb) => cb.checked === 'checked').length;

        if (c !== 0) {
            setDisplayText(c);
            setTextColor(theme.colors.onBackground);
        }
        else {
            setDisplayText('Select the Pets');
            setTextColor(theme.colors.secondary);
        }
    };

    const toggleCheckbox = (id, index) => {
        const checkboxData = [...checkboxes];

        if (checkboxData[index].checked === 'checked') {
            checkboxData[index].checked = 'unchecked'
        }
        else {
            checkboxData[index].checked = 'checked'
        }
        setCheckboxes(checkboxData);
    }

    return (
        <View>
            <TouchableOpacity style={styles.display} onPress={showDialog}>
                <Text style={{ fontSize: 15, color: textColor }}>{displayText}</Text>
            </TouchableOpacity>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Select the Pets</Dialog.Title>
                    <Dialog.Content>
                        {
                            checkboxes.map((cb, index) => {
                                return (
                                    <Checkbox.Item
                                        label={cb.title}
                                        key={index}
                                        status={cb.checked}
                                        onPress={() => toggleCheckbox(cb.id, index)} />
                                );
                            })
                        }
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

export default memo(PetSelector);