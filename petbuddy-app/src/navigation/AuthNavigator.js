import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { clearProfile, fetchProfile } from '../actions/profileActions';
import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';
import LoadingScreen from '../screens/LoadingScreen';

function AuthNavigator(props) {
    const [initializing, setInitializing] = useState(true)

    function onAuthStateChanged(result) {
        if (result != null) {
            result.getIdToken().then(token => {
                if (token) {
                    props.fetchProfile(result.uid, token);
                }
            });
        }
        else {
            props.clearProfile();
        }

        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return authSubscriber;
    }, [])

    if (initializing || props.isLoading) {
        return (<LoadingScreen />);
    }
    else if (props.profile != null) {
        return (<SignInStack />);
    }
    else {
        return (<SignOutStack />);
    }
}

const mapStateToProps = state => ({
    profile: state.profile.details,
    isLoading: state.profile.isLoading,
});

export default connect(mapStateToProps, { clearProfile, fetchProfile })(AuthNavigator);