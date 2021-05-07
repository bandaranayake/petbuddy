import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Button as PaperButton, Avatar, Checkbox, Divider, Dialog, Portal, Text, Title, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker/src/index'
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchProfile } from '../../actions/profileActions';
import { theme } from '../../core/theme';
import { ValidatePhone } from '../../utils/validation';
import * as COLLECTIONS from '../../constants/collections';
import * as GLOBAL from '../../constants/global';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { BASE_URL } from '../../utils/firebase';
import Button from '../../components/Button';
import DropdownCustom from '../../components/DropdownCustom';

function EditProfileScreen(props) {
    const petsitter = props.profile.petsitter;
    const [details, setDetails] = useState({});
    const [preferences, setPreferences] = useState([]);
    const [petTypes, setPetTypes] = useState([]);
    const [servicesCbx, setServicesCbx] = useState([]);
    const [fees, setFees] = useState([]);
    const [about, setAbout] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [avatarUpdating, setAvatarUpdating] = useState(false);
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const options = {
        title: 'Select Image',
        customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        if (props.profile.role === ROLES.PETSITTER) {
            let _petsTypes = [false, false, false, false, false];
            let _fees = ['0', '0', '0', '0'];
            let _servicesCbx = [];

            props.profile.pets.forEach((index) => _petsTypes[index] = true);

            Object.keys(petsitter.services).forEach(key => {
                let _key = parseInt(key, 10);

                _fees[_key] = petsitter.services[key];
                _servicesCbx[_key] = props.profile.services[_key];
            });

            setAbout(petsitter.about);
            setPreferences(petsitter.preferences);
            setFees(_fees);
            setPetTypes(_petsTypes);
            setServicesCbx(_servicesCbx);
            setDetails({
                fname: props.profile.firstname,
                lname: props.profile.lastname,
                phone: props.profile.phone,
                city: props.profile.city,
                avatar: props.profile.avatar,
            })
        }
        else {
            setDetails({
                fname: props.profile.firstname,
                lname: props.profile.lastname,
                phone: props.profile.phone,
                city: props.profile.city,
                avatar: props.profile.avatar,
            })
        }
    }, [])

    function UpdateDetails() {
        let typeCount = 0;
        let servicesCount = 0;

        petTypes.forEach(e => typeCount = (e) ? typeCount + 1 : typeCount);
        servicesCbx.forEach(e => servicesCount = (e) ? servicesCount + 1 : servicesCount);

        if (details.fname.length < 1) {
            setError('The first name field cannot be empty.');
            showDialog();
        }
        else if (!details.fname.match(/^[a-zA-Z]+$/)) {
            setError('The first name can only contain letters.');
            showDialog();
        }
        else if (details.lname.length < 1) {
            setError('The last name field cannot be empty.');
            showDialog();
        }
        else if (!details.lname.match(/^[a-zA-Z]+$/)) {
            setError('The last name can only contain letters.');
            showDialog();
        }
        else if (!ValidatePhone(details.phone.trim())) {
            setError('Invalid phone number. Please provide a valid phone number.');
            showDialog();
        }
        else if (details.city == null) {
            setError('Please select your current city.');
            showDialog();
        }
        else if (props.profile.role === ROLES.PETSITTER && about.length < 1) {
            setError('The about field cannot be empty.');
            showDialog();
        }
        else if (props.profile.role === ROLES.PETSITTER && typeCount < 1) {
            setError('You need to select at least one Pet type.');
            showDialog();
        }
        else if (props.profile.role === ROLES.PETSITTER && servicesCount < 1) {
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

                let data = {};
                data['uid'] = props.profile.uid;
                data['details'] = details;

                if (props.profile.role === ROLES.PETSITTER) {
                    data['preferences'] = preferences;
                    data['services'] = servicesCbx;
                    data['pettypes'] = petTypes;
                    data['fees'] = fees;
                    data['about'] = about;
                    data['role'] = ROLES.PETSITTER;
                }
                else {
                    data['role'] = ROLES.PETOWNER;
                }

                axios.post(BASE_URL + 'api/profile/update', data,
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
                        isLoading(false);
                    })
                    .catch((error) => { });
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
        cloned[key] = value;

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

    const selectAvatar = () => {
        launchImageLibrary(options, (response) => {
            if (!response.didCancel) {
                setAvatarUpdating(true);

                let ref = storage().ref(props.profile.uid + '/avatar');

                ref.putFile(response.uri)
                    .then(() => {
                        ref.getDownloadURL().then((url) => {

                            firestore()
                                .collection(COLLECTIONS.PROFILES)
                                .doc(props.profile.uid)
                                .update({ avatar: url })
                                .then(() => {
                                    setAvatarUpdating(false);
                                    props.fetchProfile(props.profile.uid, props.token);
                                })
                        })
                    })
            }
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.subcontainer}>
                <TouchableOpacity onPress={() => selectAvatar()}>
                    {
                        (avatarUpdating) ? <ActivityIndicator /> : <Avatar.Image size={120} source={{ uri: details.avatar }} />
                    }
                </TouchableOpacity>
            </View>
            <Divider />
            <View style={{ paddingVertical: 20 }}>
                <Title style={styles.title}>Basic Details</Title>
                <TextInput mode='flat' label='First Name' placeholder='Your first name' style={styles.input} value={details.fname} onChangeText={(text) => setDetails({ ...details, fname: text.trim() })} />
                <TextInput mode='flat' label='Last Name' placeholder='Your last name' style={styles.input} value={details.lname} onChangeText={(text) => setDetails({ ...details, lname: text.trim() })} />
                <TextInput mode='flat' label='Phone Number' placeholder='Your phone number' style={styles.input} value={details.phone} onChangeText={(text) => setDetails({ ...details, phone: text.trim() })} />
                <DropdownCustom title='Current City' items={GLOBAL.DISTRICTS} style={{ marginTop: 14 }} value={details.city} onValueChange={(value) => setDetails({ ...details, city: value })} />
            </View>
            {
                (props.profile.role === ROLES.PETSITTER) ?
                    <View style={{ paddingVertical: 20 }}>
                        <Title style={styles.title}>Pet Sitter</Title>
                        <Title style={{ marginTop: 20, marginBottom: 5 }}>About</Title>
                        <TextInput mode='flat' label='About Me' placeholder='Short description about yourself' value={about} onChangeText={(text) => setAbout(text.trim())} multiline style={styles.input} />
                        <Title style={{ marginTop: 20 }}>Preferences</Title>
                        {renderPreferences()}
                        <Title style={{ marginTop: 20 }}>Supported Pet Types</Title>
                        {renderPetTypes()}
                        <Title style={{ marginTop: 20 }}>Services</Title>
                        {renderServices()}
                    </View>
                    : null
            }
            <Button mode='contained' style={{ marginTop: 25, marginBottom: 5 }} onPress={() => UpdateDetails()} >Update Details</Button>
            <Button mode='contained' style={{ marginVertical: 5 }} onPress={() => props.navigation.navigate(ROUTES.PETS)}>Advanced Options</Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Update Profile</Dialog.Title>
                    <Dialog.Content>
                        <Text>{error}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <PaperButton onPress={hideDialog}>Ok</PaperButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView >
    );
}

const mapStateToProps = state => ({
    profile: state.profile.details,
    token: state.profile.token,
});

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: theme.colors.background,
    },
    subcontainer: {
        marginVertical: 30,
        alignItems: 'center',
    },
    input: {
        marginBottom: 16,
        backgroundColor: theme.colors.background,
    },
});

export default connect(mapStateToProps, { fetchProfile })(EditProfileScreen);