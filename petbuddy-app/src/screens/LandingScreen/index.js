import React, { memo } from 'react';
import { View } from 'react-native';
import Background from '../../components/Background';
import Button from '../../components/Button';

function LandingScreen({ navigation }) {
    return (
        <Background>
            <View>
                <Button mode='contained' onPress={() => navigation.navigate('Filter')}>Find Pet Sitter</Button>
                <Button mode='contained' onPress={() => navigation.navigate('Signup')}>Sign Up</Button>
                <Button mode='contained' onPress={() => navigation.navigate('Login')}>Sign In</Button>
            </View>
        </Background>
    );
}

export default memo(LandingScreen);