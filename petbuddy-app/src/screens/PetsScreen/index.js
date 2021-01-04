import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import { theme } from '../../core/theme';
import * as GLOBAL from '../../constants/global';
import Button from '../../components/Button';
import DropdownCustom from '../../components/DropdownCustom';
import Calendar from '../../components/Calendar';

function PetScreen(props) {
    const [pets, setPets] = useState([{}, {}, {}]);

    const removePet = (key) => {
        let cloned = pets.filter((_, index) => index !== key);
        setPets(cloned);
    }

    const setDetails = (key, field, value) => {
        let cloned = [...pets];
        cloned[key][field] = value;
        setPets(cloned);
    }

    const renderPets = () => {
        return pets.map((pet, i) =>
            <View key={i} style={styles.card}>
                <View style={{ alignItems: 'center' }}>
                    <Avatar.Text size={100} label='CW' />
                </View>
                <View >
                    <TextInput mode='flat' label='Name' placeholder='Your pet name' style={styles.input} onChangeText={(text) => setDetails(i, 'name', text.trim())} />
                    <Calendar placeholder='Birthday' style={{ marginBottom: 15 }} onValueChange={(value) => setDetails(i, 'birthday', value)} />
                    <DropdownCustom title='Pet Type' items={GLOBAL.PETS} style={{ marginBottom: 15 }} onValueChange={(value) => setDetails(i, 'type', value)} />
                    <DropdownCustom title='Gender' items={GLOBAL.GENDER} style={{ marginBottom: 15 }} onValueChange={(value) => setDetails(i, 'gender', value)} />
                    <Button mode='contained' style={{ marginVertical: 5 }}>Update Details</Button>
                    <Button mode='contained' style={{ marginVertical: 5 }} onPress={() => removePet(i)}>Delete Pet</Button>
                </View>
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={{ paddingVertical: 10 }}>
                {renderPets()}
            </View>
        </ScrollView>
    );
}

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
});

export default PetScreen;