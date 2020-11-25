import React, { memo } from 'react';
import { View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../core/theme';
import ServiceCard from '../../components/ServiceCard';

function HomeScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.col5}>
                    <Searchbar
                        placeholder='Search'
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
                <View style={styles.col1}>
                    <TouchableHighlight onPress={() => navigation.navigate('Filter')} underlayColor={theme.colors.primary} style={styles.btnContainer}>
                        <View>
                            <Icon name='tune' size={30} color={theme.colors.onPrimary} style={styles.icon} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ paddingRight: 20 }}>
                    <View style={styles.row}>
                        <ServiceCard onPress={() => navigation.navigate('Filter')} />
                    </View>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    row: {
        marginTop: 15,
    },
    col1: {
        flex: 1,
        alignItems: 'flex-end',
    },
    col5: {
        flex: 5,
        alignItems: 'center',
    },
    btnContainer: {
        height: 50,
        width: 50,
        padding: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
    },
});

export default memo(HomeScreen);