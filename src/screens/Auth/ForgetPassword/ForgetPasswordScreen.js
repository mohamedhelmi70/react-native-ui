import React, { Component } from 'react';
import { 
  StyleSheet, 
  KeyboardAvoidingView,
  ActivityIndicator 
} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import * as  theme  from '../../../constants/Theme/Theme';
import { ButtonD, Block, Text} from '../../../components/UI/index';
import Firebase from '../../../services/Firebase';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import Logo from '../../../components/UI/Logo/Logo';
import validate from '../../../utility/validation';
import { ButtonD, Text,  } from '../../../components/UI/index';

class ForgetPassword extends Component {
     
    constructor(props) {
      super(props);
      this.state = {
          loading,
          controls: {
            email: {
              value: "",
              valid: false,
              validationRules: {
                isEmail: true
              },
              touched: false
            }
          }
      };
    }; 
    
    static navigationOptions = {
      header: null,
    };

    static propTypes = {
      navigation: PropTypes.object,
      validate: PropTypes.func,
    };

    resetPasswordHandler = async () => {
      const email = this.state.controls.email.value;
      this.setState({loading : true});
      await Firebase.auth().sendPasswordResetEmail(email)
          .then( () =>  {
            this.setState({loading : false});
            alert('Please check your email...');
            this.props.navigation.navigate('confirmPass');
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

    backButtonHandler = () => {
      const navActions = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: "login"})]
      });
      this.props.navigation.dispatch(navActions);
      //this.props.navigation.navigate('login');
    }

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
                  prevState.controls[key].validationRules
                ),
                touched: true
              }
            }
          };
        });
    };
  
    render() {

        return (
          <KeyboardAvoidingView style={styles.container} behavior="padding">
       
            <Block padding={[0, theme.sizes.base * 2]}>

              <Block left margin={[25, 0]}>

                <Logo />

                <Text gray normal>Fingerprint Makes Life Easier</Text>

              </Block>
            
              <Block center middle>        
               
                <Block style={styles.inputContainer}>
                    
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

                </Block>
                    
                <Block row space="between" margin={[20, 0]}>

                    <ButtonD gradient
                      onPress={this.resetPasswordHandler} 
                      disabled={ 
                        !this.state.controls.email.valid
                      }  
                    >
                      {loading ? <ActivityIndicator size="small" color="black" /> : <Text bold black center>Reset Password</Text> }
                    </ButtonD>

                    <ButtonD gradient onPress={this.backButtonHandler} > Cancel </ButtonD>

                </Block>               
              </Block>
            </Block>          
          </KeyboardAvoidingView>
        );
    };

}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8fb',
  },
  inputContainer: {
    width: "80%",
  },
});

export default ForgetPassword;