import { LOADING_PROFILE, FETCH_PROFILE, CLEAR_PROFILE, SWITCH_PROFILE } from '../actions/types';
import * as ROLES from '../constants/roles';

const initailState = {
    isLoading: false,
    details: null,
    currentProfile: null,
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
                details: action.payload,
                currentProfile: ROLES.PETOWNER,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                details: null,
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