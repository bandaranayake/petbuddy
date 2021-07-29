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
            <Stack.Navigator initialRouteName={ROUTES.LANDING}>
                <Stack.Screen name={ROUTES.FILTER} component={FilterScreen} options={{ title: 'Filter' }} />
                <Stack.Screen name={ROUTES.LANDING} component={LandingScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.MAIN} options={{ headerShown: false }}>
                    {props => (<MainScreen {...props} auth={false} />)}
                </Stack.Screen>
                <Stack.Screen name={ROUTES.RESET} component={ResetScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.SERVICE} component={ServiceScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.SIGNUP} component={SignupScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.SIGNUP2} component={Signup2Screen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default SignOutStack;