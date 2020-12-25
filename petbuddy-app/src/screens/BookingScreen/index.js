import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { fetchBookings, fetchMoreBookings } from '../../actions/bookingActions';
import { theme } from '../../core/theme';
import * as GLOBAL from '../../constants/global';
import * as ROUTES from '../../constants/routes';
import Dropdown from '../../components/Dropdown';
import BookingCard from '../../components/BookingCard';

function BookingScreen(props) {
    const navigation = useNavigation();
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        props.fetchBookings(filter, props.details);
    }, [filter])

    useEffect(() => {
        const bookings = props.bookings;

        if (filter === null) {
            setFilteredData(bookings);
        }
        else {
            setFilteredData(bookings.filter(booking => booking.status === filter));
        }
    }, [props.bookings])

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
                    style={{ marginTop: 10 }}
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={
                        ({ item }) => <BookingCard onPress={() => navigation.navigate(ROUTES.CHAT, { details: item })} id={item.id} service={item.service} status={item.status} fromDate={item.fromDate} />
                    }
                    ListFooterComponent={renderFooter}
                    onEndReached={() => {
                        if (props.isRefreshing == false) props.fetchMoreBookings(filter, props.details, props.bookings[props.bookings.length - 1].id)
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

export default connect(mapStateToProps, { fetchBookings, fetchMoreBookings })(BookingScreen);