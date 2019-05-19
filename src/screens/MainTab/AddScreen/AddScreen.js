import React, { Component } from 'react';
import {
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import * as  theme  from '../../../constants/Theme/Theme';
import { Divider, ButtonD, Block, Text, Switch } from '../../../components/UI/index';

import PickImage from '../../../components/PickImage/PickImage';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import validate from '../../../utility/validation';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';
import PickRecord from '../../../components/PickRecord/PickRecord';

class AddScreen extends Component {
    
    constructor(props) {
        
        super(props);

        this.state = {
            controls: {
                imagePicked: {
                  value: null,
                  valid: false
                },
                recordPicked: {
                  value: null,
                  valid: false
                },
                fingerprintPicked: {
                  value: null,
                  valid: false
                },
                name: {
                  value: '',
                  valid: false,
                  validationRules: {
                    isfullName: true
                  },
                  touched: false
                }, 
                birthDate: {
                    value: "25-5-1997",
                    valid: false,
                    validationRules: {
                      isDate: true
                    },
                    touched: false
                },
                phone: {
                    value: "",
                    valid: false,
                    validationRules: {
                      isPhoneNumber: true
                    },
                    touched: false
                },
                address: {
                    value: "",
                    valid: false,
                    validationRules: {
                        isAddress: true
                    },
                    touched: false
                },
                A : false,
                B : false,
                C : false,
                D : false,
            },
            loading: false,
        }
    };

    static navigationOptions = {
      title: "Add Person",
      headerRight: <LogoTitle />,
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
                ),
                touched: true
              }
            }
          };
        });
    };

    pickImageHandler = image => {
      this.setState(prevState => {
          return {
             controls: {
                  ...prevState.controls,
                  imagePicked: {
                    value: image,
                    valid: true
                  }
             }    
          };
      });
    };

    pickFingerprintHandler = fingerprint => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            fingerprintPicked: {
              value: fingerprint,
              valid: true
            }
          }    
        };
      });
    };
    
    addPersonHandler = async () => {
      this.props.navigation.navigate('home');            
    }
    
    render() {
        return (

          <KeyboardAvoidingView style={styles.addPerson} behavior="padding">
            
            <Block padding={[0, theme.sizes.base * 2]}> 
                
                <ScrollView showsVerticalScrollIndicator={false}>

                    <PickImage text="Capture image of your fingerprint" wth={'80%'} hht={150} onImagePicked={this.pickFingerprintHandler} />

                    <PickImage text="Take Selfie" wth={'60%'} hht={160} onImagePicked={this.pickImageHandler} />
                    
                    <PickRecord />

                    <Divider />
                    
                    <Block style={styles.inputs}>
                      
                      <Block row space="between" margin={[10, 0]} style={styles.inputRow}>

                          <Block>
                            <Text gray2 style={{ marginBottom: 10 }}>Person</Text>
                          </Block>
                        
                          <DefaultInput 
                              iconName='person'
                              placeholder="ex: Mo Helmi"
                              value={this.state.controls.name.value}
                              onChangeText={(val) => this.updateInputState('name', val)}
                              autoCorrect={false}
                              valid={this.state.controls.name.valid}
                              touched={this.state.controls.name.touch}
                              placeholderTextColor="#5a6e65"
                              textContentType='name'
                          />
                      </Block>

                      <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                          <Block>
                            <Text gray2 style={{ marginBottom: 10 }}>Phone</Text>
                          </Block>
                        
                          <DefaultInput 
                              iconName='phone-android'
                              placeholder='ex: +1029524141'
                              value={this.state.controls.phone.value}
                              onChangeText={(val) => this.updateInputState('phone', val)}
                              autoCorrect={false}
                              valid={this.state.controls.phone.valid}
                              touched={this.state.controls.phone.touch}
                              placeholderTextColor="#5a6e65"
                          />
                      </Block>

                      <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                          <Block>
                            <Text gray2 style={{ marginBottom: 10 }}>Address</Text>
                          </Block>
                        
                          <DefaultInput 
                              iconName='my-location'
                              placeholder='ex: st 15 cairo egypt'
                              value={this.state.controls.address.value}
                              onChangeText={(val) => this.updateInputState('address', val)}
                              autoCorrect={false}
                              valid={this.state.controls.address.valid}
                              touched={this.state.controls.address.touch}
                              placeholderTextColor="#5a6e65"
                          />

                      </Block>

                      <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                          <Block>
                            <Text gray2 style={{ marginBottom: 10 }}>Person</Text>
                          </Block>
                        
                          <DefaultInput 
                              iconName='person'
                              placeholder="ex: Mo Helmi"
                              value={this.state.controls.name.value}
                              onChangeText={(val) => this.updateInputState('name', val)}
                              autoCorrect={false}
                              valid={this.state.controls.name.valid}
                              touched={this.state.controls.name.touch}
                              placeholderTextColor="#5a6e65"
                              textContentType='name'
                          />
                      </Block>

                      <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                          <Block>
                            <Text gray2 style={{ marginBottom: 10 }}>Person</Text>
                          </Block>
                        
                          <DefaultInput 
                              iconName='person'
                              placeholder="ex: Mo Helmi"
                              value={this.state.controls.name.value}
                              onChangeText={(val) => this.updateInputState('name', val)}
                              autoCorrect={false}
                              valid={this.state.controls.name.valid}
                              touched={this.state.controls.name.touch}
                              placeholderTextColor="#5a6e65"
                              textContentType='name'
                          />
                      </Block> 
                     
                    </Block>

                    <Divider />

                    <Block style={styles.toggles}>
                      
                      <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
                        <Text gray2>A</Text>
                        <Switch
                          value={this.state.notifications}
                          onValueChange={value => this.setState({ A : value })}
                        />
                      </Block>
                      
                      <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
                        <Text gray2>B</Text>
                        <Switch
                          value={this.state.newsletter}
                          onValueChange={value => this.setState({ B : value })}
                        />
                      </Block>

                      <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
                        <Text gray2>C</Text>
                        <Switch
                          value={this.state.newsletter}
                          onValueChange={value => this.setState({ C : value })}
                        />
                      </Block>

                      <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
                        <Text gray2>D</Text>
                        <Switch
                          value={this.state.newsletter}
                          onValueChange={value => this.setState({ D : value })}
                        />
                      </Block>

                    </Block> 
                          
                    <ButtonD gradient
                            onPress={this.addPersonHandler} 
                            
                            disabled={ 
                              !this.state.controls.email.valid &&
                              !this.state.controls.name.valid &&
                              !this.state.controls.phone.valid &&
                              !this.state.controls.birthDate.valid &&
                              !this.state.controls.address.valid &&
                              !this.state.controls.imagePicked.valid &&
                              !this.state.controls.fingerprintPicked
                            }
                        >
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold black center>Add Person</Text>
                            }
                    </ButtonD>        
                
                </ScrollView>
          
            </Block>   
          
          </KeyboardAvoidingView>
        ); 
    }

}

const styles = StyleSheet.create({
    addPerson: {
      flex: 1,
      justifyContent: 'center',
    },
    inputs: {
      marginTop: theme.sizes.base * 0.7,
      paddingHorizontal: theme.sizes.base * 2,
    },
    inputRow: {
      alignItems: 'flex-end'
    },
    toggles: {
      paddingHorizontal: theme.sizes.base * 2,
    },
});

export default AddScreen;