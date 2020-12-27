import { LOADING_PETS, FETCH_PETS, CLEAR_PETS } from '../actions/types';

const initailState = {
    isLoading: false,
    details: null,
}

export default function (state = initailState, action) {
    switch (action.type) {
        case LOADING_PETS:
            return {
                ...state,
                isLoading: true,
                details: null,
            };
        case FETCH_PETS:
            return {
                ...state,
                isLoading: false,
                details: action.payload,
            };
        case CLEAR_PETS:
            return {
                ...state,
                details: null,
            };
        default:
            return state;
    }
}