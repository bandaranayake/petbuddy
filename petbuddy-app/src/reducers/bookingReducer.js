import { LOADING_BOOKINGS, REFRESHING_BOOKINGS, FETCH_BOOKINGS, FETCH_MORE_BOOKINGS, FETCH_UPDATED_BOOKINGS } from '../actions/types';

const initailState = {
    items: [],
    isLoading: false,
    isRefreshing: false,
}

export default function (state = initailState, action) {
    switch (action.type) {
        case LOADING_BOOKINGS:
            return {
                ...state,
                items: [],
                isLoading: true,
            };
        case REFRESHING_BOOKINGS:
            return {
                ...state,
                isRefreshing: true,
            };
        case FETCH_BOOKINGS:
            return {
                ...state,
                items: action.payload,
                isLoading: false,
            };
        case FETCH_MORE_BOOKINGS:
            return {
                ...state,
                items: [...state.items, ...action.payload],
                isRefreshing: false,
            };
        case FETCH_UPDATED_BOOKINGS:
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
}