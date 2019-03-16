import React, { Component } from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import validate from '../../utility/validation';

class AboutScreen extends Component {

    static navigationOptions = {
        title: 'About'
    };
    
    state = {
        controls: {
            name: {
                value: "",
                valid: false,
                validationRules: {
                    isfullName: true
                },
                touched: false
            }, 
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            dateOfBirth: {
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
            }
        }
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

    
    render() {
        return (
            <KeyboardAvoidingView style={styles.Container} behavior="padding" enabled>
                
                <ScrollView>

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    
                        <View style={styles.viewFlexStart}>

                                <View style={styles.item}>
                                      
                                    <DefaultInput 
                                        iconName='md-user'
                                        placeholder="ex: mohamed helmy"
                                        value={this.state.controls.name.value}
                                        onChangeText={(val) => this.updateInputState('name', val)}
                                        autoCorrect={false}
                                        valid={this.state.controls.name.valid}
                                        touched={this.state.controls.name.touch}
                                        placeholderTextColor="#5a6e65"
                                        textContentType='name'
                                    />  
                                </View>
                                
                                <View style={styles.item}>
                              
                                    <DefaultInput 
                                        iconName='md-date'
                                        placeholder="ex: 25-05-1997"
                                        value={this.state.controls.dateOfBirth.value}
                                        onChangeText={(val) => this.updateInputState('dateOfBirth', val)}
                                        autoCorrect={false}
                                        valid={this.state.controls.dateOfBirth.valid}
                                        touched={this.state.controls.dateOfBirth.touch}
                                        placeholderTextColor="#5a6e65"                                
                                    />
                                
                                </View>
                                
                                <View style={styles.item}>
                                
 
                                    <DefaultInput 
                                        iconName='md-email'
                                        placeholder="ex: moh1253@examle.com"
                                        value={this.state.controls.email.value}
                                        onChangeText={(val) => this.updateInputState('email', val)}
                                        autoCorrect={false}
                                        valid={this.state.controls.email.valid}
                                        touched={this.state.controls.email.touch}
                                        placeholderTextColor="#5a6e65"
                                    />

                                </View>

                                <View style={styles.item}>
                                 
                                    <DefaultInput 
                                        iconName='md-phone'
                                        placeholder='ex: +1029524141'
                                        value={this.state.controls.phone.value}
                                        onChangeText={(val) => this.updateInputState('phone', val)}
                                        autoCorrect={false}
                                        valid={this.state.controls.phone.valid}
                                        touched={this.state.controls.phone.touch}
                                        placeholderTextColor="#5a6e65"
                                    />

                                </View>

                                <View style={styles.item}>
                                
                                    <DefaultInput 
                                        iconName='md-address'
                                        placeholder='ex: st 15 cairo egypt'
                                        value={this.state.controls.address.value}
                                        onChangeText={(val) => this.updateInputState('address', val)}
                                        autoCorrect={false}
                                        valid={this.state.controls.address.valid}
                                        touched={this.state.controls.address.touch}
                                        placeholderTextColor="#5a6e65"
                                    />

                                </View>
                        
                            <View>
                                <CustomButton onPress={() => ('Save Changes')} bgColor='#f6b810' size={20} >Save Changes</CustomButton>

                            </View>        
                    
                        </View>
                    
                    </TouchableWithoutFeedback>    
                
                </ScrollView>
            
            </KeyboardAvoidingView>   
        ); 
    }

}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#faf8fb',
        padding: 10
    },
    viewFlexStart: {
        alignItems: 'center',
        width: '100%'
    },
    item: {
        margin: 10,
        width: "80%"
    }
});

export default AboutScreen;