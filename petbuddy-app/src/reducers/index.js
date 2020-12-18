import { combineReducers } from 'redux';
import serviceReducer from './serviceReducer';

export default combineReducers({
    services: serviceReducer,
});