import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import ad from './ad'

export default combineReducers({
    alert,
    auth,
    ad
})