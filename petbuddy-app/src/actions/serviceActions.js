import firestore from '@react-native-firebase/firestore';
import { LOADING, REFRESHING, FETCH_SERVICES, FETCH_MORE_SERVICES, SET_FILTERS } from './types';
import { PETSITTER } from '../constants/roles';

export const fetchServices = (filters) => dispatch => {
    dispatch({ type: LOADING });

    let profiles = firestore().collection('profiles');

    if (filters != null) {
        if (filters.city != null) profiles = profiles.where('city', '==', filters.city);
        if (filters.service != null) profiles = profiles.where('services', 'array-contains', filters.service);
        if (filters.level != null) profiles = profiles.where('level', '==', filters.level);
        if (filters.pet != null) profiles = profiles.where('pets', 'array-contains', filters.pet);
    }

    profiles.where('role', '==', PETSITTER)
        .orderBy(firestore.FieldPath.documentId())
        .limit(10)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.map(document => {
                document.data().key = document.id;
                return document.data();
            })

            dispatch({
                type: FETCH_SERVICES,
                payload: data
            })
        });
}

export const fetchMoreServices = (filters, lastVisible) => dispatch => {
    dispatch({ type: REFRESHING });

    let profiles = firestore().collection('profiles');

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
                document.data().key = document.id;
                return document.data();
            })

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