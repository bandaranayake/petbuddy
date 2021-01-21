import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button as PaperButton, Dialog, FAB, Portal, Snackbar, Text, TextInput } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker/src/index'
import { connect } from 'react-redux';
import { addPet, deletePet, updatePet } from '../../actions/profileActions';
import { fetchProfile } from '../../actions/profileActions';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { theme } from '../../core/theme';
import * as COLLECTIONS from '../../constants/collections';
import * as GLOBAL from '../../constants/global';
import Button from '../../components/Button';
import DropdownCustom from '../../components/DropdownCustom';
import Calendar from '../../components/Calendar';

function PetScreen(props) {
    const [pets, setPets] = useState(props.pets);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [snackVisible, setSnackVisible] = React.useState(false);

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

    const onToggleSnackBar = () => setSnackVisible(!snackVisible);
    const onDismissSnackBar = () => setSnackVisible(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    function update(key) {
        const pet = pets[key];

        if (pet.name == undefined || pet.name < 1) {
            setError('The name field cannot be empty.');
            showDialog();
        }
        else if (pet.birthday == undefined) {
            setError('You need to select the birthday.');
            showDialog();
        }
        else if (pet.gender == undefined) {
            setError('You need to select the gender.');
            showDialog();
        }
        else if (pet.type == undefined) {
            setError('You need to select the pet type.');
            showDialog();
        }
        else {
            if (pet.id == undefined) {
                firestore()
                    .collection(COLLECTIONS.PROFILES)
                    .doc(props.details.uid)
                    .collection(COLLECTIONS.PETS)
                    .add({
                        name: pet.name,
                        birthday: pet.birthday,
                        gender: pet.gender,
                        type: pet.type,
                    })
                    .then(docRef => {
                        props.addPet(props.pets, pet, docRef.id);
                        setMessage('New pet added');
                        onToggleSnackBar();
                    }).catch((error) => {
                        setError('Something went wrong. Please try again later.');
                        showDialog();
                    });
            }
            else {
                firestore()
                    .collection(COLLECTIONS.PROFILES)
                    .doc(props.details.uid)
                    .collection(COLLECTIONS.PETS)
                    .doc(pet.id)
                    .update({
                        name: pet.name,
                        birthday: pet.birthday,
                        gender: pet.gender,
                        type: pet.type,
                    })
                    .then(() => {
                        props.updatePet(props.pets, pet)
                        setMessage('Pet details updated');
                        onToggleSnackBar();
                    }).catch((error) => {
                        setError('Something went wrong. Please try again later.');
                        showDialog();
                    });
            }
        }
    }

    function removePet(key) {
        let id = pets[key].id;

        if (id == undefined) {
            let cloned = pets.filter((_, index) => index !== key);
            setPets(cloned);
        }
        else {
            firestore()
                .collection(COLLECTIONS.PROFILES)
                .doc(props.details.uid)
                .collection(COLLECTIONS.PETS)
                .doc(id)
                .delete()
                .then(() => {
                    props.deletePet(props.pets, key);
                    setPets(pets.filter((_, index) => index !== key));
                    setMessage('Pet removed');
                    onToggleSnackBar();
                }).catch((error) => {
                    setError('Something went wrong. Please try again later.');
                    showDialog();
                });
        }
    }

    function addPet() {
        let cloned = [...pets];
        cloned.push({});
        setPets(cloned);
    }

    const setDetails = (key, field, value) => {
        let cloned = [...pets];
        cloned[key][field] = value;
        setPets(cloned);
    }

    const selectAvatar = (i) => {
        launchImageLibrary(options, (response) => {
            if (!response.didCancel) {
                let ref = storage().ref(props.details.uid + '/' + pets[i].id + '/avatar');

                ref.putFile(response.uri)
                    .then(() => {
                        ref.getDownloadURL().then((url) => {

                            firestore()
                                .collection(COLLECTIONS.PROFILES)
                                .doc(props.details.uid)
                                .collection(COLLECTIONS.PETS)
                                .doc(pets[i].id)
                                .update({ avatar: url })
                                .then(() => {
                                    props.fetchProfile(props.details.uid, props.token);
                                })
                        })
                    })
            }
        })
    }

    const renderPets = () => {
        return pets.map((pet, i) =>
            <View key={i} style={styles.card}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => selectAvatar(i)}>
                        {
                            <Avatar.Image size={120} source={{ uri: pet.avatar }} />
                        }
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput mode='flat' label='Name' placeholder='Your pet name' style={styles.input} value={pet.name} onChangeText={(text) => setDetails(i, 'name', text.trim())} />
                    <Calendar placeholder='Birthday' style={{ marginBottom: 15 }} value={pet.birthday} onValueChange={(value) => setDetails(i, 'birthday', value.dateString)} />
                    <DropdownCustom title='Pet Type' items={GLOBAL.PETS} style={{ marginBottom: 15 }} value={pet.type} onValueChange={(value) => setDetails(i, 'type', value)} />
                    <DropdownCustom title='Gender' items={GLOBAL.GENDER} style={{ marginBottom: 15 }} value={pet.gender} onValueChange={(value) => setDetails(i, 'gender', value)} />
                    <Button mode='contained' style={{ marginVertical: 5 }} onPress={() => update(i)}>Update Details</Button>
                    <Button mode='contained' style={{ marginVertical: 5 }} onPress={() => removePet(i)}>Delete Pet</Button>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ paddingVertical: 10 }}>
                    {renderPets()}
                </View>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon='plus'
                onPress={() => addPet()}
            />
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
            <Snackbar
                visible={snackVisible}
                onDismiss={onDismissSnackBar}>
                {message}
            </Snackbar>
        </View>
    );
}

const mapStateToProps = state => ({
    pets: state.profile.pets,
    details: state.profile.details,
});

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 40,
        padding: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.placeholder,
    },
    input: {
        backgroundColor: theme.colors.background,
        marginBottom: 15,
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.primary,
    },
});

export default connect(mapStateToProps, { addPet, deletePet, updatePet, fetchProfile })(PetScreen);