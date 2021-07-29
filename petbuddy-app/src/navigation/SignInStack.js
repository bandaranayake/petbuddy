import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FilterScreen from '../screens/FilterScreen';
import BookingScreen from '../screens/BookingScreen';
import ChatScreen from '../screens/ChatScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import MainScreen from '../screens/MainScreen';
import MakeBookingScreen from '../screens/MakeBookingScreen';
import PetsScreen from '../screens/PetsScreen';
import PetSitterScreen from '../screens/PetSitterScreen';
import ServiceScreen from '../screens/ServiceScreen';
import SettingsScreen from '../screens/SettingsScreen';

import * as ROUTES from '../constants/routes'

const Stack = createStackNavigator()

function SignInStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTES.MAIN}>
                <Stack.Screen name={ROUTES.FILTER} component={FilterScreen} options={{ title: 'Filter' }} />
                <Stack.Screen name={ROUTES.BOOKING} component={BookingScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.CHAT} component={ChatScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.MAIN} options={{ headerShown: false }}>
                    {props => (<MainScreen {...props} auth={true} />)}
                </Stack.Screen>
                <Stack.Screen name={ROUTES.MAKE_BOOKING} component={MakeBookingScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.SERVICE} component={ServiceScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} options={{ title: 'Settings' }} />
                <Stack.Screen name={ROUTES.PROFILE} component={EditProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.PETS} component={PetsScreen} options={{ title: 'Pets' }} />
                <Stack.Screen name={ROUTES.REGISTER_PETSITTER} component={PetSitterScreen} options={{ title: 'Register' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default SignInStack;