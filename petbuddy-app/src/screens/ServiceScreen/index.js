import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Avatar, Checkbox, Divider, List, Text, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { theme } from '../../core/theme';
import * as GLOBAL from '../../constants/global';
import * as ROUTES from '../../constants/routes';
import Button from '../../components/Button';
import Rating from '../../components/Rating';

function ServiceScreen(props) {
    const basicDetails = props.route.params.details;
    const [about, setAbout] = useState('');
    const [preferences, setPreferences] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        firestore()
            .collection('services')
            .doc(basicDetails.uid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    setAbout(doc.data().about);
                    setPreferences(doc.data().preferences);
                    setServices(doc.data().fees);
                }
            })
            .then(
                setIsLoading(false)
            );

    }, [props.route.params])

    const renderServices = () => {
        return services.map((fee, i) => {
            if (fee === -1) {
                return null;
            }
            else {
                let element = GLOBAL.FindElement(i, GLOBAL.SERVICES);
                return (
                    <List.Item
                        key={i}
                        title={element.label}
                        description={fee + ' LKR per day'}
                        left={props => <List.Icon {...props} icon={element.icon} />}
                    />)
            }
        })
    }

    const renderPreferences = () => {
        return preferences.map((preference, i) =>
            <Checkbox.Item key={i} label={GLOBAL.FindLabel(i, GLOBAL.PREFERENCES)} color={theme.colors.primary} labelStyle={{ color: theme.colors.text }} status={(preference) ? 'checked' : 'unchecked'} />
        )
    }

    const renderPetTypes = () => {
        return basicDetails.pets.map((pet, i) => {
            let element = GLOBAL.FindElement(pet, GLOBAL.PETS);
            return (<List.Item
                key={i}
                title={element.label}
                left={props => <List.Icon {...props} icon={element.icon} />}
            />)
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ marginTop: 30, alignItems: 'center' }}>
                <Avatar.Text size={100} label='CW' />
                <Title style={{ marginTop: 10 }}>{basicDetails.firstname + ' ' + basicDetails.lastname}</Title>
                <Text style={{ marginTop: 15, fontWeight: 'bold', fontSize: 18 }}>{GLOBAL.FindLabel(basicDetails.level, GLOBAL.LEVELS)}</Text>
                <Rating style={{ marginTop: 5 }} count={5} rating={basicDetails.rating} size={23} />
                <Text style={{ marginTop: 5 }}>Job Count ({basicDetails.jobcount})</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Title>About</Title>
                <Paragraph>{about}</Paragraph>
                <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Location: {GLOBAL.FindLabel(basicDetails.city, GLOBAL.DISTRICTS)}</Text>
            </View>
            {
                (isLoading)
                    ?
                    <ActivityIndicator />
                    :
                    <View>
                        <Divider />
                        <View style={{ padding: 10 }}>
                            <Title>Services</Title>
                            {renderServices()}
                        </View>
                        <Divider />
                        <View style={{ padding: 10 }}>
                            <Title>Preferences</Title>
                            {renderPreferences()}
                        </View>
                        <Divider />
                        <View style={{ padding: 10 }}>
                            <Title>Supported Pet Types</Title>
                            {renderPetTypes()}
                        </View>
                        <View style={{ paddingHorizontal: 44, paddingTop: 10 }}>
                            <Button mode='contained' style={styles.button} onPress={() => props.navigation.navigate(ROUTES.MAKE_BOOKING, { services: services, uid: basicDetails.uid })}>Book</Button>
                        </View>
                    </View>
            }
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.background,
    },
});

export default ServiceScreen;