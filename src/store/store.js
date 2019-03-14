import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import appReducer from '../store/reducers/appReducer';
  
const middleware = [];

middleware.push(thunk);

const persistConfig = {
    version: 0,
    key: 'root',
    whitelist: ['nav'],
    storage,
};
  

const loggerConfig = {
    duration: true,
    diff: true,
};
  
const loggerMiddleware = createLogger(loggerConfig);

const navigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
);

middleware.push(navigationMiddleware);

// eslint-disable-next-line no-undef
if (__DEV__) {
  // log only in dev
  middleware.push(loggerMiddleware);
}


const persistedReducer = persistReducer(persistConfig, appReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware),
);

const persistor = persistStore(store);

export { store , persistor };