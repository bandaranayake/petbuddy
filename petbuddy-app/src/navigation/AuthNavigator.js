import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { clearProfile, fetchProfile } from '../actions/profileActions';
import { clearPets, fetchPets } from '../actions/petActions';
import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';
import LoadingScreen from '../screens/LoadingScreen';

function AuthNavigator(props) {
    const [initializing, setInitializing] = useState(true)

    function onAuthStateChanged(result) {
        if (result != null) {
            props.fetchProfile(result.uid);
            props.fetchPets(result.uid);
        }
        else {
            props.clearProfile();
            props.clearPets();
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
    else if (props.profile != null && props.pets != null) {
        return (<SignInStack />);
    }
    else {
        return (<SignOutStack />);
    }
}

const mapStateToProps = state => ({
    profile: state.profile.details,
    pets: state.pets.details,
    isLoading: state.profile.isLoading || state.pets.isLoading,
});

export default connect(mapStateToProps, { clearProfile, fetchProfile, clearPets, fetchPets })(AuthNavigator);