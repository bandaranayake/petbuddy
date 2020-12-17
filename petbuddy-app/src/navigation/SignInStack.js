import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FilterScreen from '../screens/FilterScreen';
import BookingScreen from '../screens/BookingScreen';
import ChatScreen from '../screens/ChatScreen';
import MainScreen from '../screens/MainScreen';
import MakeBookingScreen from '../screens/MakeBookingScreen';
import ServiceScreen from '../screens/ServiceScreen';
import SettingsScreen from '../screens/SettingsScreen';

import * as ROUTES from '../constants/routes'

const Stack = createStackNavigator()

function SignInStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTES.MAIN} headerMode='none'>
                <Stack.Screen name={ROUTES.FILTER} component={FilterScreen} />
                <Stack.Screen name={ROUTES.BOOKING} component={BookingScreen} />
                <Stack.Screen name={ROUTES.CHAT} component={ChatScreen} />
                <Stack.Screen name={ROUTES.MAIN}>
                    {props => (<MainScreen {...props} auth={true} />)}
                </Stack.Screen>
                <Stack.Screen name={ROUTES.MAKE_BOOKING} component={MakeBookingScreen} />
                <Stack.Screen name={ROUTES.SERVICE} component={ServiceScreen} />
                <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default SignInStack;