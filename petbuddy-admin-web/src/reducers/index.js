import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import bookingReducer from './bookingReducer';

export default combineReducers({
    customers: customerReducer,
    bookings: bookingReducer,
});