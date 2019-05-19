import React from 'react';
import { 
  StyleSheet,
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import * as  theme  from '../../../constants/Theme/Theme';
import { ButtonD, Block, Text} from '../../../components/UI/index';
import Firebase from '../../../services/Firebase';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import Button from '../../../components/UI/Button/Button';
import Logo from '../../../components/UI/Logo/Logo';
import validate from '../../../utility/validation';

class SignInScreen extends React.Component {
     
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        errorMessage: null,
        controls: {
          email: {
            value: "",
            valid: false,
            validationRules: {
              isEmail: true
            },
            touched: false
          },
          password: {
            value: "",
            valid: false,
            validationRules: {
              menLength: 6
            },
            touched: false
          }
        }
      }
    };  

    static navigationOptions = {
      header: null,
    };

    static propTypes = {
      navigation: PropTypes.object,
      validate: PropTypes.func,
    };

    signInHandler = async () => {
      const email = this.state.controls.email.value;
      const password = this.state.controls.password.value;
      this.setState({loading : true});
      await Firebase
        .auth()
        .signInWithEmailAndPassword(
          email,
          password
        )
        .then(() => {
          this.setState({loading : false}); 
          this.props.navigation.navigate('home');  
        })
        .catch(error => {
          if (error.message !== null) {
            this.setState({ errorMessage: error.message, loading: false });
            alert(error.message)
          } else {
            this.setState({ errorMessage: null });
          }
        });
    };

    startSignupScreen = () => {
      const navActions = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: "signup"})]
      });
      this.props.navigation.dispatch(navActions);
    };

    startForgetScreen = () => {
      const navActions = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: "forgetpassword"})]
      });
      this.props.navigation.dispatch(navActions);
    }

    updateInputState = (key, value) => {
      let connectedValue = {};
      if (this.state.controls[key].validationRules.equalTo) {
        const equalControl = this.state.controls[key].validationRules.equalTo;
        const equalValue = this.state.controls[equalControl].value;
        connectedValue = {
          ...connectedValue,
          equalTo: equalValue
        };
      }
      if (key === "password") {
        connectedValue = {
          ...connectedValue,
          equalTo: value
        };
      }
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            [key]: {
              ...prevState.controls[key],
              value: value,
              valid: validate(
                value,
                prevState.controls[key].validationRules,
                connectedValue
              ),
              touched: true
            }
          }
        };
      });
    };

    render() {

      return (
      
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          
          <Block padding={[0, theme.sizes.base * 2]}>
              
              <Block left margin={[30 , 0]}>
                  
                  <Logo />

                  <Text h2 semibold black>Fingerprint Makes Life Easier</Text>
        
              </Block>
                    
                
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <Block center middle> 

                        
                      <Block row space="between" margin={[5, 0]} style={styles.inputContainer}>
                              
                        <DefaultInput 
                          iconName='email'
                          placeholder="Email"
                          value={this.state.controls.email.value}
                          onChangeText={(val) => this.updateInputState("email", val)}
                          valid={this.state.controls.email.valid}
                          touched={this.state.controls.email.touched}
                          autoCapitalize='none'
                          autoCorrect={false}
                          placeholderTextColor="#5a6e65"
                          keyboardType="email-address"
                          textContentType='emailAddress'
                        />

                      </Block>
                          
                      <Block row space="between" margin={[5, 0]} style={styles.inputContainer}>
                        
                        <DefaultInput 
                          iconName='remove-red-eye'
                          placeholder="Password"
                          value={this.state.controls.password.value}
                          onChangeText={val => this.updateInputState("password", val)}
                          valid={this.state.controls.password.valid}
                          touched={this.state.controls.password.touched}
                          autoCorrect={false}
                          placeholderTextColor="#5a6e65"
                          secureTextEntry={true}
                          textContentType='password'
                        />

                      </Block>

                      <Block left row>

                        <Button 
                          onPress={this.startForgetScreen} 
                          color="#000" 
                          size={14}
                          bBColor="#000"
                          bBWidth={1}
                          bStyle="solid"
                          fWeight='bold'
                          marginL={5}
                        >Forget Password</Button>
                      
                      </Block>

                      <Block center margin={[20, 0, 0, 0]}>

                        <ButtonD gradient
                          onPress={this.signInHandler} 
                          disabled={ 
                            !this.state.controls.email.valid ||
                            !this.state.controls.password.valid 
                          }  
                        >
                          {loading ?
                            <ActivityIndicator size="small" color="white" /> :
                            <Text bold black center>Log In</Text>
                          }
                        
                        </ButtonD>  
                        
                        <Block row space="between" margin={[10 , 0]}>
                          
                          <Text meduim> Don’t have an account ? </Text> 
                            
                          <Text onPress={this.startSignupScreen} meduim tintColor >Sign up</Text>  
                        
                        </Block> 
                        
                      </Block> 

                </Block>
                
            </TouchableWithoutFeedback>                                
          
          </Block>

        </KeyboardAvoidingView>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8fb',
  },
  inputContainer: {
    width: "80%",
  },
});

export default SignInScreen;