import React, { Component } from 'react';
import { 
  StyleSheet, 
  KeyboardAvoidingView,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import Firebase from '../../../services/Firebase';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import Logo from '../../../components/UI/Logo/Logo';
import HeadingText from '../../../components/UI/HeadingText/HeadingText';
import validate from '../../../utility/validation';

class ForgetPassword extends Component {
     
    constructor(props) {
      super(props);
      this.state = {
          loading: false,
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
          .then( () => {
            alert('Please check your email...')
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
      this.props.navigation.navigate('login');
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

            <View style={styles.viewflexStart}>

              <Logo />

              <HeadingText size={30} fontFamily='Fjalla-one'>Fingerprint Makes Life Easier</HeadingText>

            </View>
          
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
                  
                    <View style={styles.bottom}>

                        <CustomButton 
                            onPress={this.resetPasswordHandler} 
                            bgColor="#f6b810" 
                            size={20}
                            width={210}
                            disabled={ !this.state.controls.email.valid }  
                        >Reset Password</CustomButton>
                        <View style={{padding: 2}}/> 
                        <CustomButton 
                            onPress={this.backButtonHandler} 
                            bgColor="#f6b810"
                            width={100} 
                            size={20}
                        >Cancel</CustomButton>

                    </View>               
          </View>  
       
        </KeyboardAvoidingView>
      );
  };

}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8fb',
    justifyContent: 'center',     
    padding: 8,
  },
  viewflexStart: {
    alignItems: 'flex-start',
    marginBottom: 80,
    marginLeft: 20,
  },
  viewCenter: {
    alignItems: 'center',
  },
  inputContainer: {
    width: "80%",
  },
  bottom: {
    marginTop: 30,
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  }
});

export default ForgetPassword;