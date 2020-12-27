import { combineReducers } from 'redux';
import serviceReducer from './serviceReducer';
import profileReducer from './profileReducer';
import petReducer from './petReducer';
import bookingReducer from './bookingReducer';

export default combineReducers({
    services: serviceReducer,
    profile: profileReducer,
    pets: petReducer,
    bookings: bookingReducer,
});