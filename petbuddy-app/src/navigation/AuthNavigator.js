import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';
import LoadingScreen from '../screens/LoadingScreen';

function AuthNavigator() {
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState(null)

    function onAuthStateChanged(result) {
        setUser(result)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);

        return authSubscriber;
    }, [])

    if (initializing) {
        return (<LoadingScreen />);
    }
    else if (user) {
        return (<SignInStack />);
    }
    else {
        return (<SignOutStack />);
    }
}

export default AuthNavigator;