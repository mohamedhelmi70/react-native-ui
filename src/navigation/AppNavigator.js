import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignupScreen from '../screens/SignupScreen/SignupScreen';
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen';

const AppTabStack = createStackNavigator({ 
  Main: MainTabNavigator
});

const AuthStack = createStackNavigator({ 
  login: LoginScreen,
  signup: SignupScreen 
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppTabStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));