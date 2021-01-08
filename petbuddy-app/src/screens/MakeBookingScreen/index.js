import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as PaperButton, Divider, Dialog, Portal, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/firebase';
import * as GLOBAL from '../../constants/global';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes'
import { theme } from '../../core/theme';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import DateRangeDisplay from '../../components/DateRangeDisplay';
import PetSelector from '../../components/PetSelector';

function MakeBookingScreen(props) {
    const fees = props.route.params.services;
    const petSitter = props.route.params.petSitter;

    const [services, setServices] = useState([]);
    const [booking, setBooking] = useState({
        service: null,
        fromDate: null,
        toDate: null,
        days: 0,
        pets: []
    });
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        let c = [];
        Object.keys(fees).forEach(key => {
            let element = GLOBAL.FindElement(key, GLOBAL.SERVICES);
            c.push({ label: element.label + ' (' + fees[key] + ' LKR)', value: parseInt(key) })
        });

        setServices(c);
    }, [props.route.params])

    useEffect(() => {
        let c = [];
        props.pets.map(pet => c.push({ ...pet, checked: 'unchecked' }));

        setBooking({ ...booking, pets: c })
    }, [props.pets])

    function makeBooking() {
        let selectedPets = booking.pets.filter(cb => cb.checked === 'checked');

        if (booking.service == null) {
            setError('You need to select a service.');
            showDialog();
        }
        else if (booking.fromDate == null) {
            setError('You need to select the dates.');
            showDialog();
        }
        else if (selectedPets.length < 1) {
            setError('You need to select the pets.');
            showDialog();
        }
        else {
            setIsLoading(true);

            let data = {
                petSitterName: petSitter.firstname,
                petOwnerName: props.profile.firstname,
                fee: totalFee(),
                toDate: booking.toDate,
                fromDate: booking.fromDate,
                service: booking.service,
                pets: selectedPets
            };

            data[ROLES.PETSITTER] = petSitter.uid;
            data[ROLES.PETOWNER] = props.profile.uid;

            axios.post(BASE_URL + 'api/booking', data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + props.token,
                        'Content-Type': 'text/plain'
                    }
                })
                .then((res) => {
                    setIsLoading(false);

                    if (res.status === 200) {
                        props.navigation.navigate(ROUTES.BOOKING);
                    }
                    else {
                        setError('Something went wrong. Please try again later.');
                        showDialog();
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError('Something went wrong. Please try again later.');
                    showDialog();
                });
        }
    }

    const totalFee = () => {
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
            <Button mode='contained' style={styles.button} loading={isLoading} onPress={() => { if (!isLoading) makeBooking() }}>Book</Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Booking Error</Dialog.Title>
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
    pets: state.profile.pets,
    profile: state.profile.details,
    token: state.profile.token
});

export default connect(mapStateToProps)(MakeBookingScreen);