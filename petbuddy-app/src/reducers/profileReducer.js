import { LOADING_PROFILE, FETCH_PROFILE, CLEAR_PROFILE, SWITCH_PROFILE, ADD_PET, DELETE_PET, UPDATE_PET } from '../actions/types';
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
                isLoading: false,
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
        case ADD_PET:
            return {
                ...state,
                pets: action.payload,
            };
        case DELETE_PET:
            return {
                ...state,
                pets: action.payload,
            };
        case UPDATE_PET:
            return {
                ...state,
                pets: action.payload,
            };
        default:
            return state;
    }
}