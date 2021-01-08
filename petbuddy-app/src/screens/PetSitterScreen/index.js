import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button as PaperButton, Checkbox, Dialog, Portal, Text, Title, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchProfile } from '../../actions/profileActions';
import { theme } from '../../core/theme';
import * as GLOBAL from '../../constants/global';
import { BASE_URL } from '../../utils/firebase';
import Button from '../../components/Button';

function PetSitterScreen(props) {
    const [preferences, setPreferences] = useState([false, false, false, false]);
    const [petTypes, setPetTypes] = useState([false, false, false, false, false]);
    const [servicesCbx, setServicesCbx] = useState([false, false, false, false]);
    const [fees, setFees] = useState(['0', '0', '0', '0']);
    const [about, setAbout] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    function RegisterPetSitter() {
        let typeCount = 0;
        let servicesCount = 0;

        petTypes.forEach(e => typeCount = (e) ? typeCount + 1 : typeCount);
        servicesCbx.forEach(e => servicesCount = (e) ? servicesCount + 1 : servicesCount);

        if (about.length < 1) {
            setError('The about field cannot be empty.');
            showDialog();
        }
        else if (typeCount < 1) {
            setError('You need to select at least one Pet type.');
            showDialog();
        }
        else if (servicesCount < 1) {
            setError('You need to select at least one Service offering.');
            showDialog();
        }
        else {
            let tmp = '';

            servicesCbx.forEach((service, i) => {
                if (service) {
                    const parsed = parseInt(fees[i], 10);

                    if (isNaN(parsed) || parsed < 0) {
                        tmp += 'Invalid charge for the service: ' + GLOBAL.SERVICES[i].label + '\n';
                    }
                }
            });

            if (tmp.length > 0) {
                setError(tmp);
                showDialog();
            }
            else {
                setIsLoading(true);

                axios.post(BASE_URL + 'api/petsitter/register', {
                    'uid': props.profile.uid,
                    'preferences': preferences,
                    'services': servicesCbx,
                    'pettypes': petTypes,
                    'fees': fees,
                    'about': about,
                },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + props.token,
                            'Content-Type': 'text/plain'
                        }
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            props.fetchProfile(props.profile.uid, props.token);
                        }
                        else {
                            setError('Something went wrong. Please try again later.');
                            showDialog();
                        }
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        setError('Something went wrong. Please try again later.');
                        showDialog();
                    });
            }
        }
    }

    const togglePreferences = (key) => {
        let cloned = [...preferences];
        cloned[key] = !cloned[key];

        setPreferences(cloned);
    }

    const togglePetTypes = (key) => {
        let cloned = [...petTypes];
        cloned[key] = !cloned[key];

        setPetTypes(cloned);
    }

    const toggleServices = (key) => {
        let cloned = [...servicesCbx];
        cloned[key] = !cloned[key];

        setServicesCbx(cloned);
    }

    const onValueChange = (value, key) => {
        let cloned = [...fees];
        cloned[key] = value.trim();
        setFees(cloned);
    }

    const renderPreferences = () => {
        return GLOBAL.PREFERENCES.map((preference, i) =>
            <Checkbox.Item key={i} label={preference.label} color={theme.colors.primary} labelStyle={{ color: theme.colors.text }} status={(preferences[i]) ? 'checked' : 'unchecked'} onPress={() => togglePreferences(i)} />
        )
    }

    const renderPetTypes = () => {
        return GLOBAL.PETS.map((pet, i) =>
            <Checkbox.Item key={i} label={pet.label} color={theme.colors.primary} labelStyle={{ color: theme.colors.text }} status={(petTypes[i]) ? 'checked' : 'unchecked'} onPress={() => togglePetTypes(i)} />
        )
    }

    const renderServices = () => {
        return GLOBAL.SERVICES.map((service, i) => {
            return <View key={i} style={{ marginVertical: 10, paddingVertical: (servicesCbx[i]) ? 15 : 5, paddingHorizontal: 10, borderColor: theme.colors.placeholder, borderWidth: 0.5 }}>
                <Checkbox.Item label={service.label} color={theme.colors.primary} labelStyle={{ color: theme.colors.text }} status={(servicesCbx[i]) ? 'checked' : 'unchecked'} onPress={() => toggleServices(i)} />
                {
                    (servicesCbx[i]) ?
                        <TextInput mode='flat' label={service.basis} placeholder={service.label} style={{ backgroundColor: theme.colors.background }} value={fees[i]} onChangeText={(value) => onValueChange(value, i)} />
                        : null
                }
            </View>
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingVertical: 20 }}>
                <Title style={{ marginVertical: 5 }}>About</Title>
                <TextInput mode='flat' label='About Me' placeholder='Short description about yourself' value={about} onChangeText={(text) => setAbout(text.trim())} multiline style={styles.input} />
                <Title style={{ marginTop: 20 }}>Preferences</Title>
                {renderPreferences()}
                <Title style={{ marginTop: 20 }}>Supported Pet Types</Title>
                {renderPetTypes()}
                <Title style={{ marginTop: 20 }}>Services</Title>
                {renderServices()}
                <Button mode='contained' style={{ marginTop: 25 }} loading={isLoading} onPress={() => { if (!isLoading) RegisterPetSitter() }}>Register</Button>
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Registration Error</Dialog.Title>
                    <Dialog.Content>
                        <Text>{error}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <PaperButton onPress={hideDialog}>Ok</PaperButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: theme.colors.background,
    },
    input: {
        marginBottom: 16,
        backgroundColor: theme.colors.background,
    },
});

const mapStateToProps = state => ({
    profile: state.profile.details,
    token: state.profile.token,
});

export default connect(mapStateToProps, { fetchProfile })(PetSitterScreen);