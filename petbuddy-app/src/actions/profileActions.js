import firestore from '@react-native-firebase/firestore';
import { LOADING_PROFILE, CLEAR_PROFILE, FETCH_PROFILE } from './types';

export const fetchProfile = (uid) => dispatch => {
    dispatch({ type: LOADING_PROFILE });

    firestore()
        .collection('profiles')
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