import firestore from '@react-native-firebase/firestore';
import { LOADING_SERVICES, REFRESHING_SERVICES, FETCH_SERVICES, FETCH_MORE_SERVICES, SET_FILTERS } from './types';
import { PETSITTER } from '../constants/roles';
import * as COLLECTIONS from '../constants/collections';

export const fetchServices = (uid, filters) => dispatch => {
    dispatch({ type: LOADING_SERVICES });

    let profiles = firestore().collection(COLLECTIONS.PROFILES);

    if (filters != null) {
        if (filters.city != null) profiles = profiles.where('city', '==', filters.city);
        if (filters.service != null) profiles = profiles.where('services.' + filters.service, '==', true);
        if (filters.level != null) profiles = profiles.where('level', '==', filters.level);
        if (filters.pet != null) profiles = profiles.where('pets', 'array-contains', filters.pet);
    }

    profiles.where('role', '==', PETSITTER)
        .orderBy(firestore.FieldPath.documentId())
        .limit(10)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.map(document => {
                document.data().uid = document.id;
                return document.data();
            });

            if (uid != null) {
                data = data.filter(document => uid !== document.uid);
            }

            dispatch({
                type: FETCH_SERVICES,
                payload: data
            })
        });
}

export const fetchMoreServices = (uid, filters, lastVisible) => dispatch => {
    dispatch({ type: REFRESHING_SERVICES });

    let profiles = firestore().collection(COLLECTIONS.PROFILES);

    if (filters != null) {
        if (filters.city != null) profiles = profiles.where('city', '==', filters.city);
        if (filters.service != null) profiles = profiles.where('services', 'array-contains', filters.service);
        if (filters.level != null) profiles = profiles.where('level', '==', filters.level);
        if (filters.pet != null) profiles = profiles.where('pets', 'array-contains', filters.pet);
    }

    profiles.where('role', '==', PETSITTER)
        .orderBy(firestore.FieldPath.documentId())
        .startAfter(lastVisible)
        .limit(10)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.map(document => {
                document.data().uid = document.id;
                return document.data();
            });

            if (uid != null) {
                data = data.filter(document => uid !== document.uid);
            }

            dispatch({
                type: FETCH_MORE_SERVICES,
                payload: data
            })
        });
}

export const setFilters = (filters) => dispatch => {
    dispatch({
        type: SET_FILTERS,
        payload: filters
    });
}