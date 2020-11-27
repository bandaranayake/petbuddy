import React, { memo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Checkbox, Divider, List, Title, Paragraph, Subheading } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { theme } from '../../core/theme';
import Button from '../../components/Button';

function ServiceScreen({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar.Text size={100} label='CW' />
                <Subheading style={styles.row}>wardcarlos</Subheading>
                <Title>Ward Carlos</Title>
                <Rating
                    readonly
                    ratingCount={5}
                    imageSize={20}
                    showRating={false}
                    style={styles.row}
                />
            </View>
            <View style={styles.subContainer}>
                <Title>About</Title>
                <Paragraph></Paragraph>
            </View>
            <Divider />
            <List.Item
                title="Pet Sitting"
                description="50$ pet day"
                left={props => <List.Icon {...props} icon="home" />}
            />
            <Divider />
            <View style={styles.subContainer}>
                <Title>Preferences</Title>
                <Checkbox.Item label="" status="checked" />
            </View>
            <View style={styles.buttonContainer}>
                <Button mode='contained' style={styles.button}>Book</Button>
            </View>
        </ScrollView >
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
        alignItems: 'center',
    },
    subContainer: {
        padding: 10,
    },
    buttonContainer: {
        paddingHorizontal: 44,
        paddingTop: 10,
    },
    row: {
        marginTop: 10,
    },
});

export default memo(ServiceScreen);