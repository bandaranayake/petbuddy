import firestore from '@react-native-firebase/firestore';
import { LOADING_PETS, CLEAR_PETS, FETCH_PETS } from './types';

export const fetchPets = (uid) => dispatch => {
    dispatch({ type: LOADING_PETS });

    firestore()
        .collection('profiles')
        .doc(uid)
        .collection('pets')
        .get()
        .then(snapshot => {
            let pets = [];

            snapshot.forEach(doc => {
                doc.data().key = doc.id;
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