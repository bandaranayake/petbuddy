import { FETCH_PROFILE, CLEAR_PROFILE } from '../actions/types';

const initailState = {
    token: null,
}

export default function (state = initailState, action) {
    switch (action.type) {
        case FETCH_PROFILE:
            return {
                ...state,
                token: action.payload.token,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                token: null,
            };
        default:
            return state;
    }
}