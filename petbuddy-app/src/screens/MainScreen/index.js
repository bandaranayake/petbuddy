import React, { memo } from 'react';
import { BottomNavigation } from 'react-native-paper';
import HomeScreen from '../HomeScreen';
import BookingScreen from '../BookingScreen';
import ProfileScreen from '../ProfileScreen';
import BlockScreen from '../BlockScreen';

function MainScreen(props) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'bookings', title: 'Bookings', icon: 'calendar' },
        { key: 'profile', title: 'Profile', icon: 'account' },
    ]);

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