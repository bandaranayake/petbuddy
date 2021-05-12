import { LOADING_BOOKINGS, REFRESHING_BOOKINGS, FETCH_BOOKINGS, FETCH_MORE_BOOKINGS, DELETE_BOOKING } from '../actions/types';

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
        case DELETE_BOOKING:
            return {
                ...state,
                items: state.items.filter(booking => booking.id !== action.payload),
            };
        default:
            return state;
    }
}