import React, {Component} from 'react';
import { 
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView, 
} from 'react-native';
import PropTypes from 'prop-types';
import Firebase from '../../../services/Firebase';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../../components/UI/HeadingText/HeadingText'
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import MainText from '../../../components/UI/mainText/mainText';
import Button from '../../../components/UI/Button/Button';
import Logo from '../../../components/UI/Logo/Logo';
import validate from '../../../utility/validation';

class SignupScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
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
      const user=  await Firebase.auth().currentUser;
      user.updateProfile({ displayName: userName }).then(() => this.props.navigation.navigate('home'));
    };

    signupHandler = async () => {
      const  name = this.state.controls.name.value;
      const  email = this.state.controls.email.value;
      const  password = this.state.controls.password.value;
      await Firebase
        .auth()
        .createUserWithEmailAndPassword( email, password )
        .then(() => {
          this.signupUser( name );
        })
        .catch(error => {
          if (error.message !== null) {
            alert(error.message);
          }
      });
    };


    startLoginScreen = () => {
      this.props.navigation.navigate('login');
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
            <KeyboardAvoidingView style={styles.Container}  behavior="padding" enabled>
                
                    <View style={styles.viewflexStart}>
                      
                      <Logo />

                      <HeadingText size={35} fontFamily='Fjalla-one'>Fingerprint Makes Life Easier</HeadingText>
             
                    </View>
                    
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

 
                        <View style={styles.viewCenter}>

                            <View style={styles.inputContainer}>
                                <DefaultInput 
                                    iconName='person'
                                    placeholder="Name"
                                    value={this.state.controls.name.value}
                                    onChangeText={(val) => this.updateInputState('name', val)}
                                    autoCorrect={false}
                                    valid={this.state.controls.name.valid}
                                    touched={this.state.controls.name.touch}
                                    placeholderTextColor="#5a6e65"
                                    textContentType='name'
                                />
                            </View>  

                            <View style={styles.inputContainer}>
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
                            </View>
                            
                            <View style={styles.inputContainer}>
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
                            </View>
                            <View style={styles.inputContainer}>
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
                            </View>
                            
                            <View style={styles.bottom}>
                                   
                                    <CustomButton 
                                        onPress={this.signupHandler} 
                                        bgColor="#f6b810" 
                                        size={22}
                                        width={320}
                                        disabled={
                                            !this.state.controls.confirmPassword.valid ||
                                            !this.state.controls.email.valid ||
                                            !this.state.controls.password.valid
                                        }
                                    >Sign up</CustomButton>
                                    
                                    <View style={styles.logincontainer}>
                                    
                                        <MainText>If you have an account ?</MainText>
                    
                                        <Button onPress={this.startLoginScreen} color="#f6b810" marginL={5} size={16}>Login</Button>      
                                        
                                    </View>                    
                            
                            </View>
                        
                        </View>

                    </TouchableWithoutFeedback>   
                                
            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: '#faf8fb',
      justifyContent: 'center',
      padding: 8, 
    },
    viewCenter: {
      alignItems: 'center'
    },
    viewflexStart: {
      alignItems: 'flex-start',
      marginBottom: 60,
      marginLeft: 20
    },
    inputContainer: {
      width: "80%"
    },
    input: {
      backgroundColor: "#eee",
      borderColor: "#bbb"
    },
    bottom: {
      alignItems: 'center',
      marginTop: 40
    },
    logincontainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center'
    }
});

export default SignupScreen;