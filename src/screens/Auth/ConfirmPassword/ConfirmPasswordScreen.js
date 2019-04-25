import React, { Component } from 'react';
import {
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import validate from '../../../utility/validation';
import { confirmPassword } from '../../../store/actions/index';

class ConfirmPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                code: {
                  value: "",
                  valid: false,
                  validationRules: {
                    menLength: 6
                  },
                  touched: false
                },
                newPassword: {
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
                      equalTo: "newPassword"
                    },
                    touched: false
                }
            }
        };
    };

    static navigationOptions = {
      title: "Confirm Password",
    };

    static propTypes = {
      navigation: PropTypes.object,
      validate: PropTypes.func,
      confirmPassword: PropTypes.func
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
        if (key === "newPassword") {
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
                    key === "newPassword"
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

    cofirmPasswordHandler = async () => {
      const code = this.state.controls.code.value;
      const password = this.state.controls.newPassword.value;
      await this.props.confirmPassword(code, password);
    };

    render () {
        
        return (
            
            <KeyboardAvoidingView style={styles.container}  behavior="padding">
                
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  
                  <View>
                    <Text>Enter verification code below:</Text>  
                  </View>  

                  <View style={styles.center}>
                          
                            <View style={styles.item}>
                                
                                <DefaultInput 
                                    placeholder="Confirm Code"
                                    value={this.state.controls.code.value}
                                    onChangeText={val => this.updateInputState("code", val)}
                                    valid={this.state.controls.newPassword.valid}
                                    touched={this.state.controls.newPassword.touched}
                                    autoCorrect={false}
                                    placeholderTextColor="#5a6e65"
                                />
                            
                            </View>
                                
                          <View style={styles.item}>
                        
                            <DefaultInput 
                                  iconName='remove-red-eye'
                                  placeholder="New Password"
                                  value={this.state.controls.newPassword.value}
                                  onChangeText={val => this.updateInputState("newPassword", val)}
                                  valid={this.state.controls.newPassword.valid}
                                  touched={this.state.controls.newPassword.touched}
                                  autoCorrect={false}
                                  placeholderTextColor="#5a6e65"
                                  secureTextEntry={true}
                                  textContentType='password'
                            />
                          
                          </View>
                        
                          <View style={styles.item}>
                          
                            <DefaultInput 
                                  iconName='remove-red-eye'
                                  placeholder="Confirm Password"
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
                            onPress={this.cofirmPasswordHandler} 
                            bgColor='#f6b810'
                            width={250} 
                            size={20} 
                            disabled={ 
                              !this.state.controls.newPassword.valid || 
                              !this.state.controls.confirmPassword.valid ||
                              !this.state.controls.code.valid  
                              }
                          >Confirm</CustomButton>

                          </View>                    
                    
                  </View>

                </TouchableWithoutFeedback>
               
            </KeyboardAvoidingView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#faf8fb',
      padding: 10,
    },
    center: {
      alignItems: 'center',
      marginTop: 40,
      width: '100%' 
    },
    item: {
      padding: 10,
      width: '80%' 
    },
    bottom: {
      marginTop: 30
    }
});

const mapDispatchToProps = {
  confirmPassword,
};

export default connect(null, mapDispatchToProps)(withNavigation(ConfirmPassword));