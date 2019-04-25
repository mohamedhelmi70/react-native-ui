import {createStackNavigator} from 'react-navigation';

import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen/SignupScreen';
import ForgetPassword from '../screens/Auth/ForgetPassword/ForgetPasswordScreen';
import ConfirmPassword from '../screens/Auth/ConfirmPassword/ConfirmPasswordScreen';


const AuthStack = createStackNavigator({ 
    login: LoginScreen,
    signup: SignupScreen,
    forgetpassword: ForgetPassword,
    confirmpassword: ConfirmPassword
});

export default AuthStack; 