import { combineReducers } from 'redux';
import serviceReducer from './serviceReducer';
import profileReducer from './profileReducer';
import bookingReducer from './bookingReducer';

export default combineReducers({
    services: serviceReducer,
    profile: profileReducer,
    bookings: bookingReducer,
});