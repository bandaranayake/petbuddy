import firebase, { firestore } from '../lib/firebase';
import { LOADING_PETSITTERS, REFRESHING_PETSITTERS, FETCH_PETSITTERS, FETCH_MORE_PETSITTERS } from './types';
import { PETSITTER } from '../constants/roles';
import * as COLLECTIONS from '../constants/collections';

export const fetchPetSitters = () => dispatch => {
    dispatch({ type: LOADING_PETSITTERS });
    let profiles = firestore.collection(COLLECTIONS.PROFILES);

    profiles.where('role', '==', PETSITTER)
        .orderBy(firebase.firestore.FieldPath.documentId())
        .limit(10)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.map(document => {
                return { ...document.data(), uid: document.id };
            })

            dispatch({
                type: FETCH_PETSITTERS,
                payload: data
            })
        });
}

export const fetchMorePetSitters = (lastVisible) => dispatch => {
    dispatch({ type: REFRESHING_PETSITTERS });
    let profiles = firestore.collection(COLLECTIONS.PROFILES);

    profiles.where('role', '==', PETSITTER)
        .orderBy(firebase.firestore.FieldPath.documentId())
        .startAfter(lastVisible)
        .limit(10)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.map(document => {
                return { ...document.data(), uid: document.id };
            })

            dispatch({
                type: FETCH_MORE_PETSITTERS,
                payload: data
            })
        });
}