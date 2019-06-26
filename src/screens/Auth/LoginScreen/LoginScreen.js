import React from 'react';
import { 
  View,
  StyleSheet,
  KeyboardAvoidingView, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';
import PropTypes from 'prop-types';
import Firebase from '../../../services/Firebase';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import HeadingText from '../../../components/UI/HeadingText/HeadingText';
import MainText from '../../../components/UI/mainText/mainText';
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
      this.props.navigation.navigate('signup');
    };

    startForgetScreen = () => {
      this.props.navigation.navigate('forgetpassword');
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
          
              
          <View style={styles.viewflexStart}>

            <Logo />

            <HeadingText size={35} fontFamily='Fjalla-one'>Fingerprint Makes Life Easier</HeadingText>
          
          </View>
              
          
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.viewCenter}>  

                  
                <View style={styles.inputContainer}>
                        
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

                </View>
                    
                <View style={styles.inputContainer}>
                        
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

                </View>

                <View style={styles.forgetView}>

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
                
                </View>

                <View style={styles.bottom}>
                        
                        <CustomButton 
                            onPress={this.signInHandler} bgColor="#f6b810" 
                            size={22}
                            width={320}
                            disabled={ 
                              !this.state.controls.email.valid ||
                              !this.state.controls.password.valid 
                            }  
                        >Login</CustomButton> 
                        
                        <View style={styles.signupcontainer}>
                          
                            <MainText>Don’t have an account?</MainText> 
                              
                            <Button onPress={this.startSignupScreen} color="#f6b810" size={16} fWeight='bold' marginL={5} >Sign up</Button>  
                        
                        </View> 
                  
                  </View> 

              </View>
          
          </TouchableWithoutFeedback>                                
        
         </KeyboardAvoidingView>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8fb',
    justifyContent: 'center',     
    padding: 8,
  },
  viewflexStart: {
    alignItems: 'flex-start',
    marginBottom: 80,
    marginLeft: 20,
  },
  viewCenter: {
    alignItems: 'center'
  },
  inputContainer: {
    width: "80%",
  },
  forgetView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '80%',
  },
  bottom: {
    alignItems: 'center',
    marginTop: 40
  },
  signupcontainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'baseline',
  },
});

export default SignInScreen;