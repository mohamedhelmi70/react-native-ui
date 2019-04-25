import React, { Component } from 'react';
import {
  StyleSheet, 
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import PropTypes from 'prop-types';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import validate from '../../../utility/validation';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';

class ChangePasswordScreen extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
          controls: {
            oldPassword: {
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
      }
    };
   
    static navigationOptions = {
      title: "Change Password",
      headerRight: <LogoTitle />,
    };

    static propTypes = {
      navigation: PropTypes.object,
      validate: PropTypes.func,
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
    
    changePasswordHandler = () => {
      this.props.navigation.navigate('profile');
    }

    render() {
        
        return (
            <KeyboardAvoidingView style={styles.container}  behavior="padding">
                
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  
                  <View style={styles.center}>

                          <View style={styles.item}>
                           
                            <DefaultInput 
                                iconName='remove-red-eye'
                                placeholder="Old Password"
                                value={this.state.controls.oldPassword.value}
                                onChangeText={val => this.updateInputState("oldPassword", val)}
                                valid={this.state.controls.oldPassword.valid}
                                touched={this.state.controls.oldPassword.touched}
                                autoCorrect={false}
                                placeholderTextColor="#5a6e65"
                                secureTextEntry={true}
                                textContentType='password'
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
                            onPress={this.changePasswordHandler} 
                            bgColor='#f6b810'
                            width={250} 
                            size={20} 
                            disabled={ 
                              !this.state.controls.newPassword.valid || 
                              !this.state.controls.confirmPassword.valid 
                              }
                          >Save Changes</CustomButton>

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


export default ChangePasswordScreen;