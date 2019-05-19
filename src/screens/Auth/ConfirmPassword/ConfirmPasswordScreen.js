import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator, 
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

class ConfirmPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errorMessage: null,
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
            }
        };
    };

    static navigationOptions = {
      title: "Confirm Password",
    };

    static propTypes = {
      navigation: PropTypes.object,
      validate: PropTypes.func,
    };
  
    updateInputState = (key, value) => {
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

    cofirmPasswordHandler = async () => {
      const code = this.state.controls.code.value;
      const password = this.state.controls.newPassword.value;
    };

    render () {
        
        return (
            
            <KeyboardAvoidingView style={styles.container}  behavior="padding">
              
              <Block padding={[0, theme.sizes.base * 2]}>  
              
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  
                  <Block left>
                    <Text normal meduim>Enter verification code below:</Text>  
                  </Block>  

                  <Block center margin={[10 ,0]}>
                          
                    <Block style={styles.item}>
                        
                      <DefaultInput 
                          placeholder="Confirm Code"
                          value={this.state.controls.code.value}
                          onChangeText={val => this.updateInputState("code", val)}
                          valid={this.state.controls.newPassword.valid}
                          touched={this.state.controls.newPassword.touched}
                          autoCorrect={false}
                          placeholderTextColor="#5a6e65"
                      />
                  
                    </Block>
                                
                    <Block  style={styles.item}>
                  
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
                        
                    
                    <Block center margin={[20 , 0]}>
                        
                      <ButtonD 
                        onPress={this.cofirmPasswordHandler} 
                        disabled={ 
                          !this.state.controls.newPassword.valid ||
                          !this.state.controls.code.valid  
                          }
                      >
                        {loading ? <ActivityIndicator color="back" size="small"/>: <Text black bold> Confirm </Text>} 
                      </ButtonD>

                    </Block>                    
                    
                  </Block>

                </TouchableWithoutFeedback>
              
              </Block>            
            
            </KeyboardAvoidingView>
        );
    };
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

export default ConfirmPassword;