import React, { memo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../core/theme';
import Dropdown from '../../components/Dropdown';
import BookingCard from '../../components/BookingCard';

function BookingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Dropdown
                    label={null}
                    items={[
                        { label: 'All', value: 'all' },
                        { label: 'Upcoming', value: 'upcoming' },
                        { label: 'Approved', value: 'approved' },
                        { label: 'Rejected', value: 'rejected' },
                        { label: 'Cancelled', value: 'canecelled' },
                        { label: 'Completed', value: 'completed' },
                    ]}
                />
            </View>
            <View style={{ flex: 5 }}>
                <ScrollView>
                </ScrollView>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.background,
    },
    topRow: {
        marginTop: 15,
        marginBottom: 10,
    },
});

export default memo(BookingScreen);