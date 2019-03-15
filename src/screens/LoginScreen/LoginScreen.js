import React from 'react';
import { 
  View, 
  Dimensions,
  StyleSheet, 
  KeyboardAvoidingView, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/mainText/mainText';
import validate from '../../utility/validation';
import Button from '../../components/UI/Button/Button';

class SignInScreen extends React.Component {
     
    static navigationOptions = {
      header: null,
    }; 

    state = {
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
            minLength: 6
          },
          touched: false
        }
      }
    };


    signInHandler = () => {
      this.props.navigation.navigate('App');
    };

    startSignupScreen = () => {
      this.props.navigation.navigate('signup');
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
      
      <KeyboardAvoidingView style={styles.Container} behavior="padding" enabled>
        
            
              <View style={styles.viewflexStart}>
                  
                <HeadingText size={35} fontFamily='Fjalla-one'>Fingerprint Makes Life Easier</HeadingText>
              
              </View>
                  
              
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.viewCenter}>  

                      
                    <View style={styles.inputContainer}>
                            <DefaultInput 
                              iconName='md-person'
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
                              iconName='md-eye'
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

                    <View style={styles.bottom}>
                            
                            <CustomButton 
                            onPress={this.signInHandler} bgColor="#f6b810" size={20}
                            disabled={ !this.state.controls.email.valid ||!this.state.controls.password.valid }  
                            >Login</CustomButton> 
                            
                            <View style={styles.signupcontainer}>
                              
                                <MainText>Don’t have an account?</MainText> 
                                  
                                <Button onPress={this.startSignupScreen} color="#f6b810" size={16} marginL={5} >Sign up</Button>  
                            
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
    viewflexStart: {
      alignItems: 'flex-start',
      marginBottom: 40
    },
    viewCenter: {
      alignItems: 'center'
    },
    inputContainer: {
      width: "80%",
    },
    bottom: {
      alignItems: 'center',
      marginTop: 20
    },
    signupcontainer: {
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'baseline',
    },
});

export default SignInScreen ;