import React, { Component } from 'react';
import {
  StyleSheet, 
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import Firebase from '../../../services/Firebase';

import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import validate from '../../../utility/validation';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';

class ChangePasswordScreen extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
          errorMessage: null,
          controls: {
              currPassword: {
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
      headerRight: <LogoTitle ur={null} />,
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

    reauthenticate = async (currPassword) => {
      const user = await Firebase.auth().currentUser;
      const cred = await Firebase.auth.EmailAuthProvider.credential( user.email, currPassword);
      return user.reauthenticateAndRetrieveDataWithCredential(cred);
    }
  
    changePasswordHandler = async () => {
      const currentPass = this.state.controls.currPassword.value;
      const newPass = this.state.controls.newPassword.value;
      this.setState({loading: true});
      await this.reauthenticate(currentPass).then(() => {
        const user = Firebase.auth().currentUser;
        user.updatePassword(newPass).then(() => {
          alert("Password updated!");
          setTimeout(() => this.props.navigation.navigate('profile'), 5000);
        })
        .catch(error => {
          if (error.message !== null) {
            this.setState({ errorMessage: error.message });
            alert(error.message);
          } else {
            this.setState({ errorMessage: null });
          }
        });
      })
      .catch(error => {
        if (error.message !== null) {
          this.setState({ errorMessage: error.message });
          alert(error.message);
        } else {
          this.setState({ errorMessage: null });
        }
      });
    }

    render() {
        
        return (
            <KeyboardAvoidingView style={styles.container}  behavior="padding">

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  
                  <View style={styles.body}>

                    <View style={styles.item}>
                      
                      <DefaultInput 
                        iconName='remove-red-eye'
                        placeholder="Current Password"
                        value={this.state.controls.currPassword.value}
                        onChangeText={val => this.updateInputState("currPassword", val)}
                        valid={this.state.controls.currPassword.valid}
                        touched={this.state.controls.currPassword.touched}
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
                        moreStyle={{width: 320, height: 55, marginTop: 60}}
                        bgColor="#f6b810"  
                        size={22} 
                        onPress={this.changePasswordHandler} 
                        disabled={ 
                          !this.state.controls.newPassword.valid || 
                          !this.state.controls.confirmPassword.valid 
                          }
                      >
                        Save Changes
                      </CustomButton>

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
    padding: 10,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },   
  item: {
    width: '80%', 
    marginTop: 10,
  },
  bottom: {
    marginTop: 20
  }
});

export default ChangePasswordScreen;