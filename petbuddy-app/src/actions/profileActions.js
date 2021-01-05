import axios from 'axios';
import { LOADING_PROFILE, CLEAR_PROFILE, FETCH_PROFILE, SWITCH_PROFILE } from './types';
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

export const clearProfile = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
}

export const switchProfile = (profile) => dispatch => {
    dispatch({
        type: SWITCH_PROFILE,
        payload: profile,
    });
}