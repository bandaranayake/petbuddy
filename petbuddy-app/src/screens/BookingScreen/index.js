import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { fetchBookings, fetchMoreBookings, updateBookings } from '../../actions/bookingActions';
import { theme } from '../../core/theme';
import * as COLLECTIONS from '../../constants/collections';
import * as GLOBAL from '../../constants/global';
import * as ROUTES from '../../constants/routes';
import Dropdown from '../../components/Dropdown';
import BookingCard from '../../components/BookingCard';
import firestore from '@react-native-firebase/firestore';

function BookingScreen(props) {
    const navigation = useNavigation();
    const [filter, _setFilter] = useState(null);

    const filterRef = React.useRef(filter);
    const setFilter = data => {
        filterRef.current = data;
        _setFilter(data);
    };

    useEffect(() => {
        props.fetchBookings(filter, props.details);
    }, [filter])

    useEffect(() => {
        const messagesListener = firestore()
            .collection(COLLECTIONS.BOOKINGS)
            .where(props.details.role, '==', props.details.uid)
            .orderBy(firestore.FieldPath.documentId())
            .onSnapshot(snapshot => {
                let c = [];
                snapshot.forEach(doc => {
                    doc.data().id = doc.id;
                    c.push(doc.data());
                });

                if (filterRef.current === null) {
                    props.updateBookings(c);
                }
                else {
                    props.updateBookings(c.filter(booking => booking.status === filterRef.current));
                }
            })

        return () => messagesListener();
    }, [])

    const renderFooter = () => (props.isLoading) ? <ActivityIndicator /> : null;

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Dropdown
                    label='All'
                    items={GLOBAL.STATUS}
                    onValueChange={value => setFilter(value)}
                />
            </View>
            <View style={{ flex: 5 }}>
                <FlatList
                    data={props.bookings}
                    keyExtractor={(item) => item.id}
                    renderItem={
                        ({ item }) => <BookingCard onPress={() => navigation.navigate(ROUTES.CHAT, { bookingid: item.id })} id={item.id} service={item.service} status={item.status} fromDate={item.fromDate} />
                    }
                    ListFooterComponent={renderFooter}
                    onEndReached={() => {
                        if (props.isRefreshing == false) props.fetchMoreBookings(filter, props.details, props.bookings[props.bookings.length - 1].fromDate)
                    }}
                    onEndReachedThreshold={0.5}
                    refreshing={props.isRefreshing}
                />
            </View>
        </View >
    );
}

const mapStateToProps = state => ({
    details: state.profile.details,
    bookings: state.bookings.items,
    isLoading: state.bookings.isLoading,
    isRefreshing: state.bookings.isRefreshing,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.background,
    },
    topRow: {
        marginTop: 15,
        marginBottom: 10,
    },
});

export default connect(mapStateToProps, { fetchBookings, fetchMoreBookings, updateBookings })(BookingScreen);