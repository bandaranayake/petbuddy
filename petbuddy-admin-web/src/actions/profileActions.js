import { FETCH_PROFILE, CLEAR_PROFILE } from '../actions/types';

export const fetchProfile = (token) => dispatch => {
    dispatch({
        type: FETCH_PROFILE,
        payload: { token: token }
    });
}

export const clearProfile = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
}