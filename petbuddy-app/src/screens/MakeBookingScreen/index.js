import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import * as GLOBAL from '../../constants/global';
import { theme } from '../../core/theme';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import DateRangeDisplay from '../../components/DateRangeDisplay';
import PetSelector from '../../components/PetSelector';

function MakeBookingScreen(props) {
    const [services, setServices] = useState([]);
    const [booking, setBooking] = useState({
        service: null,
        fromDate: null,
        toDate: null,
        days: 0,
        pets: []
    });

    useEffect(() => {
        let c = [];
        const fees = props.route.params.services;

        GLOBAL.SERVICES.forEach((service, i) => {
            if (fees[i] !== -1) {
                c.push({ label: service.label + ' (' + fees[i] + ' LKR)', value: i })
            }
        });

        setServices(c);
    }, [props.route.params])

    useEffect(() => {
        let c = [];
        props.pets.map(pet => c.push({ ...pet, checked: 'unchecked' }));

        setBooking({ ...booking, pets: c })
    }, [props.pets])

    const totalFee = () => {
        const fees = props.route.params.services;
        let petCount = booking.pets.filter(cb => cb.checked === 'checked').length;

        if (petCount > 0 && booking.service != null && booking.fromDate != null) {
            return fees[booking.service] * petCount * booking.days;
        }

        return 0;
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Service: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Dropdown label='Select a Service' items={services} value={booking.service} onValueChange={value => setBooking({ ...booking, service: value })} />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Date: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <DateRangeDisplay onPressOK={(selectedDates) => setBooking({ ...booking, fromDate: selectedDates.from, toDate: selectedDates.to, days: selectedDates.count })} />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Pets: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <PetSelector items={booking.pets} onSelect={selected => setBooking({ ...booking, pets: selected })} />
                </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Total Price: </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.label}>{totalFee()} LKR</Text>
                </View>
            </View>
            <Button mode='contained' style={styles.button}>Book</Button>
        </View>
    );
}

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
        alignItems: 'center',
    },
    divider: {
        marginTop: 16,
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


const mapStateToProps = state => ({
    pets: state.pets.details,
});

export default connect(mapStateToProps)(MakeBookingScreen);