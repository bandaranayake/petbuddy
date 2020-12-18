import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableHighlight } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { fetchServices, fetchMoreServices } from '../../actions/serviceActions';
import { theme } from '../../core/theme';
import * as ROUTES from '../../constants/routes';
import ServiceCard from '../../components/ServiceCard';

function HomeScreen(props) {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        props.fetchServices(props.filters);
    }, [props.filters])

    const onChangeSearch = query => setSearchQuery(query);
    const renderFooter = () => (props.isLoading) ? <ActivityIndicator /> : null;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Searchbar
                        placeholder='Search'
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableHighlight onPress={() => navigation.navigate(ROUTES.FILTER)} underlayColor={theme.colors.primary} style={styles.btnContainer}>
                        <View>
                            <Icon name='tune' size={30} color={theme.colors.onPrimary} style={styles.icon} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ marginTop: 10 }}
                    data={props.services}
                    keyExtractor={(item) => item.key}
                    renderItem={
                        ({ item }) => <ServiceCard onPress={() => navigation.navigate(ROUTES.SERVICE)} firstname={item.firstname} lastname={item.lastname} jobs={item.jobcount} level={item.level} rating={item.rating} />
                    }
                    ListFooterComponent={renderFooter}
                    onEndReached={() => {
                        if (props.isRefreshing == false) props.fetchMoreServices(props.filters, props.services[props.services.length - 1].key)
                    }}
                    onEndReachedThreshold={0.5}
                    refreshing={props.isRefreshing}
                />
            </View>
        </View >
    );
}

const mapStateToProps = state => ({
    filters: state.services.filters,
    services: state.services.items,
    isLoading: state.services.isLoading,
    isRefreshing: state.services.isRefreshing,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.background,
    },
    row: {
        marginTop: 15,
        marginBottom: 10,
        flexDirection: 'row',
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

export default connect(mapStateToProps, { fetchServices, fetchMoreServices })(HomeScreen);