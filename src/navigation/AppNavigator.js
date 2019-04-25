import { createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen';


const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Tab: MainTabNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


export default createAppContainer(RootNavigator);