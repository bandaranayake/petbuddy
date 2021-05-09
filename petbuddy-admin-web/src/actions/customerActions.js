import firebase, { firestore } from '../lib/firebase';
import { LOADING_CUSTOMERS, REFRESHING_CUSTOMERS, FETCH_CUSTOMERS, FETCH_MORE_CUSTOMERS, DELETE_CUSTOMER } from './types';
import { PETOWNER } from '../constants/roles';
import * as COLLECTIONS from '../constants/collections';

export const fetchCustomers = () => dispatch => {
    dispatch({ type: LOADING_CUSTOMERS });
    let profiles = firestore.collection(COLLECTIONS.PROFILES);

    profiles.where('role', '==', PETOWNER)
        .orderBy(firebase.firestore.FieldPath.documentId())
        .limit(10)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.map(document => {
                return { ...document.data(), uid: document.id };
            })

            dispatch({
                type: FETCH_CUSTOMERS,
                payload: data
            })
        });
}

export const fetchMoreCustomers = (lastVisible) => dispatch => {
    dispatch({ type: REFRESHING_CUSTOMERS });
    let profiles = firestore.collection(COLLECTIONS.PROFILES);

    profiles.where('role', '==', PETOWNER)
        .orderBy(firebase.firestore.FieldPath.documentId())
        .startAfter(lastVisible)
        .limit(10)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.map(document => {
                return { ...document.data(), uid: document.id };
            })

            dispatch({
                type: FETCH_MORE_CUSTOMERS,
                payload: data
            })
        });
}