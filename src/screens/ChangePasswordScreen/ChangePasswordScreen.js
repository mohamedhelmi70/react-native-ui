import React, { Component } from 'react';
import {
  StyleSheet, 
  View,
  KeyboardAvoidingView 
} from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import MainText from '../../components/UI/mainText/mainText';
import validate from '../../utility/validation';

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
                  minLength: 6
                },
                touched: false
            },
            newPassword: {
                value: "",
                valid: false,
                validationRules: {
                  minLength: 6
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
    
    saveChangesHandler = () => {
      this.props.navigation.navigate('profile');
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.Container}>
                
                <View style={styles.Center}>

                        <View style={styles.item}>
                           
                           <MainText>Old Password</MainText>
                           
                           <DefaultInput 
                                iconName='md-home'
                                placeholder='Old Password'
                                value={this.state.controls.oldPassword.value}
                                onChangeText={(val) => this.updateInputState('oldPassword', val)}
                                valid={this.state.controls.oldPassword.valid}
                                touched={this.state.controls.oldPassword.touch}
                                secureTextType
                            />
                        
                        </View>
                      
                        <View style={styles.item}>
                        
                           <MainText>New Password</MainText> 
                           <DefaultInput 
                                iconName='md-home' 
                                placeholder='New Password'
                                value={this.state.controls.newPassword.value}
                                onChangeText={(val) => this.updateInputState('namePassword', val)}
                                valid={this.state.controls.newPassword.valid}
                                touched={this.state.controls.newPassword.touch}
                                secureTextType
                            />
                        
                        </View>
                      
                        <View style={styles.item}>
                        
                           <MainText>Confirm Password</MainText> 
                           <DefaultInput 
                                placeholder='Confirm Password'
                                value={this.state.controls.confirmPassword.value}
                                onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                                valid={this.state.controls.confirmPassword.valid}
                                touched={this.state.controls.confirmPassword.touch} 
                                secureTextType
                                iconName='md-home'
                           />
                        
                        </View>
                      
                  
                        <View>
                          
                          <CustomButton onPress={this.saveChangesHandler} bgColor='#f6b810' size={20} >Save Changes</CustomButton>

                        </View>                    
                  
                </View>
               
            </KeyboardAvoidingView>
        );  
    }

}

const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: '#faf8fb',
      padding: 10,
    },
    Center: {
      alignItems: 'center',
      marginTop: 40,
      width: '100%' 
    },
    item: {
      padding: 10,
      width: '80%' 
    }
});

export default ChangePasswordScreen;