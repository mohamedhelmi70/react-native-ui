import React, { Component } from 'react';
import {
  StyleSheet, 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import PropTypes from 'prop-types';
import * as  theme  from '../../../constants/Theme/Theme';
import { ButtonD, Block, Text} from '../../../components/UI/index';
import Firebase from '../../../services/Firebase';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import validate from '../../../utility/validation';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';

class ChangePasswordScreen extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
          loading: false,
          errorMessage,
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

    reauthenticate = async (currPassword) => {
      const user = Firebase.auth().currentUser;
      const cred = await Firebase.auth.EmailAuthProvider.credential( user.email, currPassword);
      return user.reauthenticateWithCredential(cred);
    }
  
    changePasswordHandler = async () => {
      const currentPass = this.state.controls.currPassword.value;
      const newPass = this.state.controls.newPassword.value;
      this.setState({loading: true});
      await this.reauthenticate(currentPass).then(() => {
        const user = await Firebase.auth().currentUser;
        user.updatePassword(newPass).then(() => {
          this.setState({loading: false});
          alert("Password updated!");
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
              
              <Block padding={[0, theme.sizes.base * 2]} >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  
                  <Block center middle>

                    <Block padding={[10]}>
                      
                      <DefaultInput 
                        iconName='remove-red-eye'
                        placeholder="Current Password"
                        value={this.state.controls.oldPassword.value}
                        onChangeText={val => this.updateInputState("currPassword", val)}
                        valid={this.state.controls.oldPassword.valid}
                        touched={this.state.controls.oldPassword.touched}
                        autoCorrect={false}
                        placeholderTextColor="#5a6e65"
                        secureTextEntry={true}
                        textContentType='password'
                      />
                
                    </Block>    

                    <Block padding={[10]}>
                  
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
                    
                    </Block>
                        
                    <Block padding={[10]}>
                    
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
                    
                    </Block>
                        
                    
                    <Block margin={[20, 0]} center>
                      
                      <ButtonD gradient
                        onPress={this.changePasswordHandler} 
                        disabled={ 
                          !this.state.controls.newPassword.valid || 
                          !this.state.controls.confirmPassword.valid 
                          }
                      >
                        {loading ? <ActivityIndecator size="small" color="black" /> : <Text bold black >Save Changes</Text>}
                      
                      </ButtonD>

                    </Block>                    
                    
                  </Block>

                </TouchableWithoutFeedback>
              
              </Block> 
            
            </KeyboardAvoidingView>
        );  
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#faf8fb',
    },
    item: {
      width: '80%' 
    },
});

export default ChangePasswordScreen;