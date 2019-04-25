import configureStore from './createStore';
import rootSaga from '../store/sagas/index';
import rootReducer from '../store/reducers/appReducer';

export default () => {
  return configureStore(rootReducer, rootSaga);
};
