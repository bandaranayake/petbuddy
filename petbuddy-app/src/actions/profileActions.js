import axios from 'axios';
import { LOADING_PROFILE, CLEAR_PROFILE, FETCH_PROFILE, SWITCH_PROFILE, ADD_PET, DELETE_PET, UPDATE_PET } from './types';
import { BASE_URL } from '../utils/firebase';

export const fetchProfile = (uid, token) => dispatch => {
    dispatch({ type: LOADING_PROFILE });

    axios.post(BASE_URL + 'api/profile', { 'uid': uid },
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'text/plain'
            }
        })
        .then((res) => {
            if (res.status === 200) {
                let pets = res.data.ownedPets;
                delete res.data.ownedPets;

                dispatch({
                    type: FETCH_PROFILE,
                    payload: { details: res.data, pets: pets, token: token }
                });
            }
        })
        .catch((error) => { });
}

export const updatePet = (pets, updatedPet) => dispatch => {
    let i = pets.findIndex(pet => pet.id === updatePet.id);
    pets[i] = updatedPet;

    dispatch({
        type: UPDATE_PET,
        payload: pets
    });
}

export const addPet = (pets, pet, id) => dispatch => {
    pet.id = id;
    pets.push(pet);

    dispatch({
        type: ADD_PET,
        payload: pets
    });
}

export const deletePet = (pets, key) => dispatch => {
    let _pets = pets.filter((_, index) => index !== key);
    dispatch({
        type: DELETE_PET,
        payload: _pets
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