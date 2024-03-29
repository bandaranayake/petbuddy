import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ROUTES from '../../constants/routes'
import Background from '../../components/Background';
import Button from '../../components/Button';

function BlockScreen() {
    const navigation = useNavigation();

    return (
        <Background>
            <View>
                <Button mode='contained' onPress={() => navigation.navigate(ROUTES.SIGNUP)}>Sign Up</Button>
                <Button mode='contained' onPress={() => navigation.navigate(ROUTES.LOGIN)}>Sign In</Button>
            </View>
        </Background>
    );
}

export default BlockScreen;