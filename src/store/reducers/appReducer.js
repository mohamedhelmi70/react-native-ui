import { combineReducers } from 'redux';
import authReducer from './authReducer';
import identityReducer from './identityReducer'
import uiReducer from './uiReducer';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import AppNavigator from '../../navigation/AppNavigator';


const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer, // required, handle actions from react-navigation
  identity: identityReducer,
  auth: authReducer,
  ui: uiReducer,
});

export default appReducer;