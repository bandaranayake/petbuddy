import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Divider, List, Title, Subheading } from 'react-native-paper';
import { theme } from '../../core/theme';

function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar.Text size={100} label='CW' />
                <Subheading style={styles.row}>wardcarlos</Subheading>
                <Title style={styles.row}>Ward Carlos</Title>
            </View>
            <Divider />
            <List.Section>
                <List.Subheader>General</List.Subheader>
                <List.Item title='Profile' left={() => <List.Icon icon='account' />} />
                <List.Item title='Settings' left={() => <List.Icon icon='cog' />} />
            </List.Section>
            <List.Section>
                <List.Subheader>Pet Sitter</List.Subheader>
                <List.Item title='Become Pet Sitter' left={() => <List.Icon icon='account-plus' />} />
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
    avatarContainer: {
        marginTop: 30,
        marginBottom: 10,
        alignItems: 'center',
    },
    row: {
        marginTop: 10,
    },
});

export default memo(ProfileScreen);