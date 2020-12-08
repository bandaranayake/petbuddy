import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FilterScreen from '../screens/FilterScreen';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import ResetScreen from '../screens/ResetScreen';
import ServiceScreen from '../screens/ServiceScreen';
import SignupScreen from '../screens/SignupScreen';
import Signup2Screen from '../screens/Signup2Screen';

import * as ROUTES from '../constants/routes'

const Stack = createStackNavigator()

function SignOutStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTES.LOGIN} headerMode="none">
                <Stack.Screen name={ROUTES.FILTER} component={FilterScreen} />
                <Stack.Screen name={ROUTES.LANDING} component={LandingScreen} />
                <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
                <Stack.Screen name={ROUTES.MAIN} component={MainScreen} />
                <Stack.Screen name={ROUTES.RESET} component={ResetScreen} />
                <Stack.Screen name={ROUTES.SERVICE} component={ServiceScreen} />
                <Stack.Screen name={ROUTES.SIGNUP} component={SignupScreen} />
                <Stack.Screen name={ROUTES.SIGNUP2} component={Signup2Screen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default SignOutStack;