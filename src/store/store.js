
import { createStore, applyMiddleware} from 'redux';
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import AppNavigator from '../navigation/AppNavigator';
import appReducer from './reducers/appReducer';


const middleware = [];

middleware.push(createReactNavigationReduxMiddleware(state => state.nav ));

const App = createReduxContainer(AppNavigator);

const mapStateToProps = state => ({ state: state.nav });
 
export const AppWithNavigationState = connect(mapStateToProps)(App);

export const store = createStore(appReducer, applyMiddleware(...middleware));
