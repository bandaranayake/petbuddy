import { LOADING_CUSTOMERS, REFRESHING_CUSTOMERS, FETCH_CUSTOMERS, FETCH_MORE_CUSTOMERS } from '../actions/types';

const initailState = {
    items: [],
    isLoading: false,
    isRefreshing: false,
}

export default function (state = initailState, action) {
    switch (action.type) {
        case LOADING_CUSTOMERS:
            return {
                ...state,
                items: [],
                isLoading: true,
            };
        case REFRESHING_CUSTOMERS:
            return {
                ...state,
                isRefreshing: true,
            };
        case FETCH_CUSTOMERS:
            return {
                ...state,
                items: action.payload,
                isLoading: false,
            };
        case FETCH_MORE_CUSTOMERS:
            return {
                ...state,
                items: [...state.items, ...action.payload],
                isRefreshing: false,
            };
        default:
            return state;
    }
}