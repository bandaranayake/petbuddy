import { LOADING_PROFILE, FETCH_PROFILE, CLEAR_PROFILE, SWITCH_PROFILE } from '../actions/types';
import * as ROLES from '../constants/roles';

const initailState = {
    isLoading: false,
    details: null,
    pets: [],
    currentProfile: null,
    token: null,
}

export default function (state = initailState, action) {
    switch (action.type) {
        case LOADING_PROFILE:
            return {
                ...state,
                isLoading: true,
                details: null,
            };
        case FETCH_PROFILE:
            return {
                ...state,
                isLoading: false,
                currentProfile: ROLES.PETOWNER,
                details: action.payload.details,
                pets: action.payload.pets,
                token: action.payload.token,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                details: null,
                pets: [],
                currentProfile: null,
                token: null,
            };
        case SWITCH_PROFILE:
            return {
                ...state,
                currentProfile: action.payload,
            };
        default:
            return state;
    }
}