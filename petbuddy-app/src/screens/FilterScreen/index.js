import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as PaperButton, Dialog, Portal, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { setFilters } from '../../actions/serviceActions';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import { theme } from '../../core/theme';
import * as GLOBAL from '../../constants/global';

function FilterScreen(props) {
    const [filters, setFilters] = useState({
        city: null,
        service: null,
        level: null,
        pet: null,
    });

    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        if (props.filters !== null) {
            setFilters(props.filters);
        }
    }, [])

    function ClearFilter() {
        props.setFilters({
            city: null,
            service: null,
            level: null,
            pet: null,
        });

        props.navigation.goBack();
    }

    function Filter() {
        if (filters.city === null) {
            setError('You need to select a city in order to filter.');
            showDialog();
        }
        else {
            props.setFilters(filters);
            props.navigation.goBack(null);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>City: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Dropdown label='Select a City' items={GLOBAL.DISTRICTS} value={filters.city} onValueChange={(value) => setFilters({ ...filters, city: value })} />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Service: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Dropdown label='Select a Service' items={GLOBAL.SERVICES} value={filters.service} onValueChange={(value) => setFilters({ ...filters, service: value })} />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Level: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Dropdown label='Select a Level' items={GLOBAL.LEVELS} value={filters.level} onValueChange={(value) => setFilters({ ...filters, level: value })} />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Pet: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Dropdown label='Select a Pet type' items={GLOBAL.PETS} value={filters.pet} onValueChange={(value) => setFilters({ ...filters, pet: value })} />
                </View>
            </View>
            <View style={{ marginTop: 15 }}>
                <Button mode='contained' style={{ marginVertical: 5 }} onPress={() => Filter()}>Filter</Button>
                <Button mode='contained' style={{ marginVertical: 5 }} onPress={() => ClearFilter()}>Clear Filters</Button>
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Content>
                        <Text>{error}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <PaperButton onPress={hideDialog}>Ok</PaperButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const mapStateToProps = state => ({
    filters: state.services.filters,
});

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
        alignItems: 'center'
    },
    labelContainer: {
        flex: 2,
    },
    itemContainer: {
        flex: 5,
    },
    label: {
        fontSize: 15,
        color: theme.colors.placeholder,
    },
});

export default connect(mapStateToProps, { setFilters })(FilterScreen);