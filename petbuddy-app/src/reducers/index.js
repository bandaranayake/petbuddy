import { combineReducers } from 'redux';
import serviceReducer from './serviceReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    services: serviceReducer,
    profile: profileReducer,
});