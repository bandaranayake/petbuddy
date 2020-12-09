import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BookingScreen from '../screens/BookingScreen';
import ChatScreen from '../screens/ChatScreen';
import MainScreen from '../screens/MainScreen';
import MakeBookingScreen from '../screens/MakeBookingScreen';
import SettingsScreen from '../screens/SettingsScreen';

import * as ROUTES from '../constants/routes'

const Stack = createStackNavigator()

function SignInStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTES.MAIN} headerMode="none">
                <Stack.Screen name={ROUTES.BOOKING} component={BookingScreen} />
                <Stack.Screen name={ROUTES.CHAT} component={ChatScreen} />
                <Stack.Screen name={ROUTES.MAIN} component={MainScreen} />
                <Stack.Screen name={ROUTES.MAKE_BOOKING} component={MakeBookingScreen} />
                <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default SignInStack;