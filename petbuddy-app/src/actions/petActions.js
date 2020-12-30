import firestore from '@react-native-firebase/firestore';
import { LOADING_PETS, CLEAR_PETS, FETCH_PETS } from './types';
import * as COLLECTIONS from '../constants/collections';

export const fetchPets = (uid) => dispatch => {
    dispatch({ type: LOADING_PETS });

    firestore()
        .collection(COLLECTIONS.PROFILES)
        .doc(uid)
        .collection(COLLECTIONS.PETS)
        .get()
        .then(snapshot => {
            let pets = [];

            snapshot.forEach(doc => {
                doc.data().id = doc.id;
                pets.push(doc.data());
            });

            dispatch({
                type: FETCH_PETS,
                payload: pets
            })
        });
}

export const clearPets = () => dispatch => {
    dispatch({ type: CLEAR_PETS });
}