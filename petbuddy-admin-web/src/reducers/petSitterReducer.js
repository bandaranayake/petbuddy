import { LOADING_PETSITTERS, REFRESHING_PETSITTERS, FETCH_PETSITTERS, FETCH_MORE_PETSITTERS } from '../actions/types';

const initailState = {
    items: [],
    isLoading: false,
    isRefreshing: false,
}

export default function (state = initailState, action) {
    switch (action.type) {
        case LOADING_PETSITTERS:
            return {
                ...state,
                items: [],
                isLoading: true,
            };
        case REFRESHING_PETSITTERS:
            return {
                ...state,
                isRefreshing: true,
            };
        case FETCH_PETSITTERS:
            return {
                ...state,
                items: action.payload,
                isLoading: false,
            };
        case FETCH_MORE_PETSITTERS:
            return {
                ...state,
                items: [...state.items, ...action.payload],
                isRefreshing: false,
            };
        default:
            return state;
    }
}