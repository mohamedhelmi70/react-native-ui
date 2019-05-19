import React, {Component} from 'react';
import { 
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView, 
} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import * as  theme  from '../../../constants/Theme/Theme';
import { ButtonD, Block, Text} from '../../../components/UI/index';
import Firebase from '../../../services/Firebase';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import Logo from '../../../components/UI/Logo/Logo';
import validate from '../../../utility/validation';

class SignupScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errorMessage: null,
            controls: {
                name: {
                  value: "",
                  valid: false,
                  validationRules: {
                    menLength: 6
                  },
                  touched: false
                },  
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
                },
                confirmPassword: {
                    value: "",
                    valid: false,
                    validationRules: {
                        equalTo: "password"
                    },
                    touched: false
                }
            },
        };
    }

    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        navigation: PropTypes.object,
        validate: PropTypes.func,
    };

    signupUser = async (userName) => {
      await Firebase.auth().onAuthStateChanged( FBUser => {
        FBUser.updateProfile({
          name: userName
        }).then(() => {
          this.setState({loading : false});
          this.props.navigation.navigate('home');     
        });
      });
    };

    signupHandler = async () => {
      const  name = this.state.controls.name.value;
      const  email = this.state.controls.email.value;
      const  password = this.state.controls.password.value;
      this.setState({loading : true});
      await firebase
        .auth()
        .createUserWithEmailAndPassword( email, password )
        .then(() => {
          this.signupUser( name );
        })
        .catch(error => {
          if (error.message !== null) {
            this.setState({ errorMessage: error.message, loading: false});
          } else {
            this.setState({ errorMessage: null });
          }
      });
    };


    startLoginScreen = () => {
      const navActions = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: "login"})]
      });
      this.props.navigation.dispatch(navActions);
    };
      
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
              confirmPassword: {
                ...prevState.controls.confirmPassword,
                valid:
                  key === "password"
                    ? validate(
                        prevState.controls.confirmPassword.value,
                        prevState.controls.confirmPassword.validationRules,
                        connectedValue
                      )
                    : prevState.controls.confirmPassword.valid
              },
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


    render (){
        
        return (
            <KeyboardAvoidingView style={styles.Container}  behavior="padding">

                <Block padding={[0, theme.sizes.base * 2]}>

                    <Block left margin={[30 , 0]}>
                      
                      <Logo />
 
                      <Text h2 semibold black>Fingerprint Makes Life Easier</Text>
             
                    </Block>
                    
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

                      <Block center middle>

                            <Block Block row space="between" margin={[5, 0]} style={styles.inputContainer}>  
                              <DefaultInput 
                                    iconName='person'
                                    placeholder="Full Name"
                                    value={this.state.controls.name.value}
                                    onChangeText={(val) => this.updateInputState('name', val)}
                                    autoCorrect={false}
                                    valid={this.state.controls.name.valid}
                                    touched={this.state.controls.name.touch}
                                    placeholderTextColor="#5a6e65"
                                    textContentType='name'
                                /> 
                            </Block>

                            <Block Block row space="between" margin={[5, 0]} style={styles.inputContainer}>
                                
                              <DefaultInput 
                                  iconName='email'
                                  placeholder="Email"
                                  style={styles.input}
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
                                  style={styles.input}
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
                            
                            <Block row space="between" margin={[5, 0]} style={styles.inputContainer}>
                            
                              <DefaultInput 
                                  iconName='remove-red-eye'
                                  placeholder="Confirm Password"
                                  style={styles.input}
                                  value={this.state.controls.confirmPassword.value}
                                  onChangeText={val => this.updateInputState("confirmPassword", val)}
                                  valid={this.state.controls.confirmPassword.valid}
                                  touched={this.state.controls.confirmPassword.touched}
                                  autoCorrect={false}
                                  placeholderTextColor="#5a6e65"
                                  secureTextEntry={true}
                                  textContentType='password'
                              />
                            
                            </Block>
                            
                            <Block center style={styles.bottom}>
                                   
                                    <ButtonD gradient
                                        onPress={this.signupHandler} 
                                        disabled={
                                            !this.state.controls.confirmPassword.valid ||
                                            !this.state.controls.email.valid ||
                                            !this.state.controls.password.valid
                                        }
                                    >
                                      {loading ?
                                        <ActivityIndicator size="small" color="black" /> :
                                        <Text bold black center>Sign Up</Text>
                                      }
                                    
                                    </ButtonD>
                                    
                                    <Block row space="between" margin={[10 , 0]}>
                                    
                                      <Text black meduim > If you have an account ? </Text>
                  
                                      <Text meduim tintColor onPress={this.startLoginScreen}>Log In</Text>      
                                        
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
    Container: {
      flex: 1,
      backgroundColor: '#faf8fb',
    },
    inputContainer: {
      width: "80%"
    },
    input: {
      backgroundColor: "#eee",
      borderColor: "#bbb"
    },
});

export default SignupScreen;