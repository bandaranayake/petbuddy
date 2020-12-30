import firestore from '@react-native-firebase/firestore';
import { LOADING_PROFILE, CLEAR_PROFILE, FETCH_PROFILE, SWITCH_PROFILE } from './types';
import * as COLLECTIONS from '../constants/collections';

export const fetchProfile = (uid) => dispatch => {
    dispatch({ type: LOADING_PROFILE });

    firestore()
        .collection(COLLECTIONS.PROFILES)
        .doc(uid)
        .get()
        .then(doc => {
            if (doc.exists) {
                dispatch({
                    type: FETCH_PROFILE,
                    payload: { uid: uid, ...doc.data() }
                })
            }
        });
}

export const clearProfile = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
}

export const switchProfile = (profile) => dispatch => {
    dispatch({
        type: SWITCH_PROFILE,
        payload: profile,
    });
}