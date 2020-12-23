import { LOADING_PROFILE, FETCH_PROFILE, CLEAR_PROFILE } from '../actions/types';

const initailState = {
    isLoading: false,
    details: null,
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
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                details: null,
            };
        default:
            return state;
    }
}