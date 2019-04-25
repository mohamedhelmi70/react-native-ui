import React, {Component} from 'react';
import { 
    View, 
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView, 
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../../components/UI/HeadingText/HeadingText'
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import MainText from '../../../components/UI/mainText/mainText';
import Button from '../../../components/UI/Button/Button';
import Logo from '../../../components/UI/Logo/Logo';

import validate from '../../../utility/validation';
import { signUp } from '../../../store/actions/index';

class SignupScreen extends Component {
    
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
                },
                confirmPassword: {
                    value: "",
                    valid: false,
                    validationRules: {
                        equalTo: "password"
                    },
                    touched: false
                }
            }
        };
    }

    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        navigation: PropTypes.object,
        signUp: PropTypes.func,
        validate: PropTypes.func,
        error: PropTypes.string,
    };

    signupHandler = async () => {
        const  email = this.state.controls.email.value;
        const  password = this.state.controls.password.value;
        await this.props.signUp(email, password);
    };

    startLoginScreen = () => {
       /* const navAction = NavigationActions.reset({
            index: 0,
            actoins: [
              NavigationActions.navigate({routeName: 'login'})
            ]
          });
    
        this.props.navigation.dispatch(navAction); */
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
                                        size={20}
                                        width={250}
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
       padding: 8 
    },
    viewCenter: {
       alignItems: 'center'
    },
    viewflexStart: {
       alignItems: 'flex-start',
       marginBottom: 40
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
        marginTop: 20
    },
    logincontainer: {
       flexDirection: 'row',
       alignItems: 'baseline',
       justifyContent: 'center'
    }
});

const mapStateToProps = state => ({
    error: state.auth.error,
});

const mapDispatchToProps = {
    signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SignupScreen));