import React, { memo, useEffect, useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import HomeScreen from '../HomeScreen';
import BookingScreen from '../BookingScreen';
import ProfileScreen from '../ProfileScreen';
import BlockScreen from '../BlockScreen';

function MainScreen(props) {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'bookings', title: 'Bookings', icon: 'calendar' },
        { key: 'profile', title: 'Profile', icon: 'account' },
    ]);

    useEffect(() => {
        if (props.route.params !== undefined && props.route.params.navigateTo !== undefined) {
            setIndex(props.route.params.navigateTo);
        }
    }, [props.route.params])

    const renderScene = BottomNavigation.SceneMap(
        (props.auth) ?
            {
                home: HomeScreen,
                bookings: BookingScreen,
                profile: ProfileScreen,
            }
            :
            {
                home: HomeScreen,
                bookings: BlockScreen,
                profile: BlockScreen,
            }
    );

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}

export default memo(MainScreen);