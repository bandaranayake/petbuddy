import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Checkbox, Divider, Title, TextInput } from 'react-native-paper';
import { theme } from '../../core/theme';
import * as GLOBAL from '../../constants/global';
import Button from '../../components/Button';
import DropdownCustom from '../../components/DropdownCustom';

function EditProfileScreen(props) {
    const [details, setDetails] = useState({
        fname: '',
        lname: '',
        phone: '',
        city: null,
    });

    const [preferences, setPreferences] = useState([false, false, false, false]);
    const [petTypes, setPetTypes] = useState([false, false, false, false, false]);
    const [servicesCbx, setServicesCbx] = useState([false, false, false, false, false]);
    const [fees, setFees] = useState(['0', '0', '0', '0', '0']);

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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.subcontainer}>
                <Avatar.Text size={120} label='CW' />
            </View>
            <Divider />
            <View style={{ paddingVertical: 20 }}>
                <Title style={styles.title}>Basic Details</Title>
                <TextInput mode='flat' label='First Name' placeholder='Your first name' style={styles.input} onChangeText={(text) => setDetails({ ...details, fname: text.trim() })} />
                <TextInput mode='flat' label='Last Name' placeholder='Your last name' style={styles.input} onChangeText={(text) => setDetails({ ...details, lname: text.trim() })} />
                <TextInput mode='flat' label='Phone Number' placeholder='Your phone number' style={styles.input} onChangeText={(text) => setDetails({ ...details, phone: text.trim() })} />
                <DropdownCustom title='Current City' items={GLOBAL.DISTRICTS} style={{ marginTop: 14 }} onValueChange={(value) => setDetails({ ...details, city: value })} />
            </View>
            <View style={{ paddingVertical: 20 }}>
                <Title style={styles.title}>Pet Sitter</Title>
                <Title style={{ marginTop: 20, marginBottom: 5 }}>About</Title>
                <TextInput mode='flat' label='About Me' placeholder='Short description about yourself' multiline style={styles.input} />
                <Title style={{ marginTop: 20 }}>Preferences</Title>
                {renderPreferences()}
                <Title style={{ marginTop: 20 }}>Supported Pet Types</Title>
                {renderPetTypes()}
                <Title style={{ marginTop: 20 }}>Services</Title>
                {renderServices()}
                <Button mode='contained' style={{ marginTop: 25, marginBottom: 5 }} >Update Details</Button>
                <Button mode='contained' style={{ marginVertical: 5 }} >Advanced Options</Button>
            </View>
        </ScrollView >
    );
}

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

export default EditProfileScreen;