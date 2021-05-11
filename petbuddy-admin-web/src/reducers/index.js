import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import petSitterReducer from './petSitterReducer';
import bookingReducer from './bookingReducer';

export default combineReducers({
    customers: customerReducer,
    petSitters: petSitterReducer,
    bookings: bookingReducer,
});