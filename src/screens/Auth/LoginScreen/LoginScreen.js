import React from 'react';
import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import HeadingText from '../../../components/UI/HeadingText/HeadingText';
import MainText from '../../../components/UI/mainText/mainText';
import Button from '../../../components/UI/Button/Button';
import Logo from '../../../components/UI/Logo/Logo';

import validate from '../../../utility/validation';
import { login } from '../../../store/actions/index';

class SignInScreen extends React.Component {
     
    constructor(props) {
      super(props);
      this.state = {
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
      login: PropTypes.func,
      validate: PropTypes.func,
      error: PropTypes.string,
    };

    signInHandler = () => {
      //const navAction = NavigationActions.reset({
      // index: 0,
      //  actoins: [
      //    NavigationActions.navigate({routeName: 'home'})
      //  ]
      //});

      //this.props.navigation.dispatch(navAction);
      this.props.navigation.navigate('home');
      //const email = this.state.controls.email.value;
      //const password =   this.state.controls.password.value;
      //this.props.login(email, password);
    };

    startSignupScreen = () => {
      /*const navAction = NavigationActions.reset({
        index: 0,
        actoins: [
          NavigationActions.navigate({routeName: 'signup'})
        ]
      });

      this.props.navigation.dispatch(navAction);*/
      this.props.navigation.navigate('signup');
    };

    startForgetScreen = () => {
      //const navAction = NavigationActions.reset({
      //  index: 0,
      //  actoins: [
      //    NavigationActions.navigate({routeName: 'forgetpassword'})
     //   ]
     // });

     // this.props.navigation.dispatch(navAction);
      this.props.navigation.navigate('forgetpassword')
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
      
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          
              
                <View style={styles.viewflexStart}>

                  <Logo />

                  <HeadingText size={25} fontFamily='Fjalla-one'>Fingerprint Makes Life Easier</HeadingText>
                
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
                                  size={20}
                                  width={250}
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
      marginBottom: 40
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
      marginTop: 20
    },
    signupcontainer: {
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'baseline',
    },
});

const mapStateToProps = state => ({
  error: state.auth.error,
});

const mapDispatchToProps = {
  login, 
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SignInScreen));