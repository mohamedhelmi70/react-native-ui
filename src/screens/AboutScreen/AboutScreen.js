import React, { Component } from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import MainText from '../../components/UI/mainText/mainText';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import validate from '../../utility/validation';

class AboutScreen extends Component {

    static navigationOptions = {
        header: null
    };
    
    state = {
        controls: {
            name: {
                value: "Mohamed Helmy",
                valid: false,
                validationRules: {
                  minLength: 10
                },
                touched: false
            }, 
            email: {
                value: "mavhxva@gmail.com",
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
                isEmail: true
                },
                touched: false
            },
            phone: {
                value: '01029524141',
                valid: false,
                validationRules: {
                    length: 10
                },
                touched: false
            },
            address: {
                value: 'Faqus',
                valid: false,
                validationRules: {
                  length: 10
                },
                touched: false
            },
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
            <KeyboardAvoidingView style={styles.Container}>
                
                <ScrollView>
                    
                    <View style={styles.viewFlexStart}>
                    
                        <View style={styles.bodyContainer}>

                            <View style={styles.item}>
                                
                                <MainText>Name</MainText>  
                                <DefaultInput 
                                    placeholder="Name"
                                    value={this.state.controls.name.value}
                                    onChangeTextHandler={(val) => this.updateInputState('name', val)}
                                    valid={this.state.controls.name.valid}
                                    touched={this.state.controls.name.touch}
                                    autoCorrect={false}
                                />  
                            </View>
                            
                            <View style={styles.item}>
                                
                                <MainText>Date Of Birth</MainText>  
                                <DefaultInput 
                                    placeholder="Date OF Birth"
                                    value={this.state.controls.dateOfBirth.value}
                                    onChangeTextHandler={(val) => this.updateInputState('dateOfBirth', val)}
                                    valid={this.state.controls.dateOfBirth.valid}
                                    touched={this.state.controls.dateOfBirth.touch}
                                    autoCorrect={false}                                
                                />
                            
                            </View>
                            
                            <View style={styles.item}>
                            
                            <MainText>Email</MainText>  
                                <DefaultInput 
                                    placeholder="Name"
                                    value={this.state.controls.email.value}
                                    onChangeTextHandler={(val) => this.updateInputState('email', val)}
                                    valid={this.state.controls.email.valid}
                                    touched={this.state.controls.email.touch}
                                    autoCorrect={false}
                                />

                            </View>

                            <View style={styles.item}>
                            
                            <MainText>Phone</MainText>  
                                <DefaultInput 
                                    placeholder='Phone'
                                    value={this.state.controls.phone.value}
                                    onChangeTextHandler={(val) => this.updateInputState('phone', val)}
                                    valid={this.state.controls.phone.valid}
                                    touched={this.state.controls.phone.touch}
                                    autoCorrect={false}
                                />

                            </View>

                            <View style={styles.item}>
                            
                                <MainText>Address</MainText>  
                                <DefaultInput 
                                    placeholder='Address'
                                    value={this.state.controls.address.value}
                                    onChangeTextHandler={(val) => this.updateInputState('address', val)}
                                    valid={this.state.controls.address.valid}
                                    touched={this.state.controls.address.touch}
                                    autoCorrect={false}
                                />

                            </View>
                            
                        </View>
                    
                        <View>
                            
                            <CustomButton onPress={() => ('Save Changes')} bgColor='#f6b810' size={20} >Save Changes</CustomButton>

                        </View>        
                
                    </View>
                
                </ScrollView>
            
            </KeyboardAvoidingView>   
        ); 
    }

}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#faf8fb',
    },
    viewFlexStart: {
        alignItems: 'center'
    },
    bodyContainer: {
       width: '100%'
    },
    item: {
        margin: 10,
        width: "80%"
    }
});

export default AboutScreen;