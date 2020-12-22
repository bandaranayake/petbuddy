import { LOADING_SERVICES, REFRESHING_SERVICES, FETCH_SERVICES, FETCH_MORE_SERVICES, SET_FILTERS } from '../actions/types';

const initailState = {
    items: [],
    lastVisible: null,
    filters: null,
    isLoading: false,
    isRefreshing: false,
}

export default function (state = initailState, action) {
    switch (action.type) {
        case LOADING_SERVICES:
            return {
                ...state,
                items: [],
                isLoading: true,
            };
        case REFRESHING_SERVICES:
            return {
                ...state,
                isRefreshing: true,
            };
        case FETCH_SERVICES:
            return {
                ...state,
                items: action.payload,
                isLoading: false,
            };
        case FETCH_MORE_SERVICES:
            return {
                ...state,
                items: [...state.items, ...action.payload],
                isRefreshing: false,
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        default:
            return state;
    }
}