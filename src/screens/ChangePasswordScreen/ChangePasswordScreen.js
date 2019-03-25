import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet, 
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import validate from '../../utility/validation';
import { changePassword } from '../../store/actions/index';

class ChangePasswordScreen extends Component {
    
    static navigationOptions = {
      title: "Change Password",
    };
    
    state = {
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
      this.props.onChanePassword(
        this.state.controls.oldPassword.value,
        this.state.controls.newPassword.value
      )
      if (true) { /* this.props.validOldPassword */ 
        this.props.navigation.navigate('profile');
      } //else {
        //alert('Old Password not Valid ..!');
     // }
    }

    render() {
        
        let submit = <CustomButton 
        onPress={this.changePasswordHandler} 
        bgColor='#f6b810' 
        size={20} 
        disabled={ 
          !this.state.controls.oldPassword.valid || 
          !this.state.controls.newPassword.valid || 
          !this.state.controls.confirmPassword.valid 
          }
        >Save Changes</CustomButton>;
        
        if (this.props.isLoading) {
          submit = <ActivityIndicator size="small" color="#f6b810" />
        }

        return (
            <KeyboardAvoidingView style={styles.container}  behavior="padding" enabled>
                
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
                            
                            {submit}

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

const mapStateToProps = state => {
  return {
    validOldPassword: state.auth.validOldPassword,
    isLoading: state.ui.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChanePassword: (oldPassword, newPassword) => dispatch(changePassword(oldPassword, newPassword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen);