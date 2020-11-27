import React, { memo } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import HomeScreen from '../HomeScreen';
import BookingScreen from '../BookingScreen';
import ProfileScreen from '../ProfileScreen';

function MainScreen(props) {
    const HomeRoute = () => <HomeScreen navigation={props.navigation} />;
    const BookingsRoute = () => <BookingScreen navigation={props.navigation} />;
    const ProfileRoute = () => <ProfileScreen navigation={props.navigation} />;

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'bookings', title: 'Bookings', icon: 'calendar' },
        { key: 'profile', title: 'Profile', icon: 'account' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        bookings: BookingsRoute,
        profile: ProfileRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}

export default memo(MainScreen);