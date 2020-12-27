import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Divider, List, Text, Title } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { switchProfile } from '../../actions/profileActions';
import { theme } from '../../core/theme';
import * as GLOBAL from '../../constants/global';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import Rating from '../../components/Rating';

function ProfileScreen(props) {
    const navigation = useNavigation();
    console.log(props.profile);
    console.log(props.current);

    const renderBasicDetails = () => {
        if (props.current === ROLES.PETSITTER) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ marginTop: 5, fontWeight: 'bold', fontSize: 18 }}>{GLOBAL.FindLabel(props.profile.level, GLOBAL.LEVELS)}</Text>
                    <Rating style={{ marginTop: 5 }} count={5} rating={props.profile.rating} size={23} />
                    <Text style={{ marginTop: 5 }}>Job Count ({props.profile.jobcount})</Text>
                </View>
            )
        }
    }
    const renderPetSitter = () => {
        if (props.profile.role === ROLES.PETOWNER) {
            return <List.Item style={styles.item} title='Become Pet Sitter' onPress={() => navigation.navigate(ROUTES.REGISTER_PETSITTER)} left={() => <List.Icon icon='account-plus' />} />
        }
        else if (props.profile.role === ROLES.PETSITTER && props.current === ROLES.PETOWNER) {
            return <List.Item style={styles.item} title='Switch Profile' onPress={() => props.switchProfile(ROLES.PETSITTER)} left={() => <List.Icon icon='account-switch' />} />
        }
        else if (props.profile.role === ROLES.PETSITTER && props.current === ROLES.PETSITTER) {
            return <List.Item style={styles.item} title='Switch Profile' onPress={() => props.switchProfile(ROLES.PETOWNER)} left={() => <List.Icon icon='account-switch' />} />
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Avatar.Text size={100} label='CW' />
                <Title style={{ marginTop: 10 }}>{props.profile.firstname + ' ' + props.profile.lastname}</Title>
                {renderBasicDetails()}
            </View>
            <Divider />
            <List.Section>
                <List.Subheader style={styles.head}>General</List.Subheader>
                <List.Item style={styles.item} title='Profile' onPress={() => navigation.navigate(ROUTES.PROFILE)} left={() => <List.Icon icon='account' />} />
                <List.Item style={styles.item} title='Settings' onPress={() => navigation.navigate(ROUTES.SETTINGS)} left={() => <List.Icon icon='cog' />} />
                <List.Subheader style={styles.head}>Pet Sitter</List.Subheader>
                {renderPetSitter()}
                <List.Subheader style={styles.head}>Logout</List.Subheader>
                <List.Item style={styles.item} title='Logout' onPress={() => auth().signOut()} left={() => <List.Icon icon='logout' />} />
            </List.Section>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.background,
    },
    subcontainer: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
    },
    head: {
        margin: 0,
        paddingVertical: 3,
    },
    item: {
        margin: 0,
        paddingVertical: 0,
    },
});

const mapStateToProps = state => ({
    profile: state.profile.details,
    current: state.profile.currentProfile,
});

export default connect(mapStateToProps, { switchProfile })(ProfileScreen);