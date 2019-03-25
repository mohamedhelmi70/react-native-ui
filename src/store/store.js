
import { createStore, applyMiddleware, compose} from 'redux';
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import logger from 'redux-logger';
import {thunk} from 'redux-thunk';
import { connect } from 'react-redux';

import AppNavigator from '../navigation/AppNavigator';
import appReducer from './reducers/appReducer';

let composeEnhancers = compose;

const middleware = [];

middleware.push(thunk);

middleware.push(createReactNavigationReduxMiddleware(state => state.nav ));

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const App = createReduxContainer(AppNavigator);

const mapStateToProps = state => ({ state: state.nav });
 
export const AppWithNavigationState = connect(mapStateToProps)(App);

export const store = createStore(appReducer, composeEnhancers(applyMiddleware(...middleware)));
