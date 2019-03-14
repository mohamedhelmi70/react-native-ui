import { combineReducers } from 'redux';
import navigationReducer from './navigationReducer';
import authReducer from './authReducer';
import identityReducer from './identityReducer'
  
const AppReducer = combineReducers({
    navigationReducer,
    authReducer,
    identityReducer,
});
  

export default AppReducer;