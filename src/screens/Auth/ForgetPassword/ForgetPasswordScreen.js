import React, { Component } from 'react';
import { 
  View , 
  StyleSheet, 
  KeyboardAvoidingView, 
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import Logo from '../../../components/UI/Logo/Logo';
import HeadingText from '../../../components/UI/HeadingText/HeadingText';
import validate from '../../../utility/validation';
import { resetPassword } from '../../../store/actions/index';

class ForgetPassword extends Component {
     
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
      resetPassword: PropTypes.func,
    };

    resetPasswordHandler = async () => {
      //const navAction = NavigationActions.reset({
      //  index: 0,
      //  actoins: [
      //    NavigationActions.navigate({routeName: 'confirmCode'})
      //  ]
     // });

     // this.props.navigation.dispatch(navAction);
     // const email = this.state.controls.email.value;
     // await this.props.resetPassword(email);
      this.props.navigation.navigate('confirmCode');
    }

    backButtonHandler = () => {
      /*const navAction = NavigationActions.reset({
        index: 0,
        actoins: [
          NavigationActions.navigate({routeName: 'login'})
        ]
      });

      this.props.navigation.dispatch(navAction);**/
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
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

              <View style={styles.viewflexStart}>

                <Logo />

                <HeadingText size={25} fontFamily='Fjalla-one'>Fingerprint Makes Life Easier</HeadingText>

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
                              size={16}
                              width={145}
                              disabled={ 
                                !this.state.controls.email.valid
                              }  
                          >Reset Password</CustomButton>

                          <CustomButton 
                              onPress={this.backButtonHandler} 
                              bgColor="#f6b810"
                              width={75} 
                              size={16}
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
      marginBottom: 40
    },
    viewCenter: {
      alignItems: 'center',
    },
    inputContainer: {
      width: "80%",
    },
    bottom: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'baseline',
    }
});

const mapDispatchToProps = {
  resetPassword,
};

export default connect(null, mapDispatchToProps)(withNavigation(ForgetPassword));