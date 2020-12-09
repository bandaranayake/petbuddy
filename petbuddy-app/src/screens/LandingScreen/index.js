import React from 'react';
import { View } from 'react-native';
import * as ROUTES from '../../constants/routes'
import Background from '../../components/Background';
import Button from '../../components/Button';

function LandingScreen({ navigation }) {
    return (
        <Background>
            <View>
                <Button mode='contained' onPress={() => navigation.navigate(ROUTES.FILTER)}>Find Pet Sitter</Button>
                <Button mode='contained' onPress={() => navigation.navigate(ROUTES.SIGNUP)}>Sign Up</Button>
                <Button mode='contained' onPress={() => navigation.navigate(ROUTES.LOGIN)}>Sign In</Button>
            </View>
        </Background>
    );
}

export default LandingScreen;