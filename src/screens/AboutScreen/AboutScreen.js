import React, { Component } from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import MainText from '../../components/UI/mainText/mainText';
import CustomButton from '../../components/UI/CustomButton/CustomButton';

class AboutScreen extends Component {

    static navigationOptions = {
        title: 'About'
    };
    
    state = {
        controls: {
            name: {
                value: "Mohamed Helmy",
            }, 
            email: {
                value: "mavhxva@gmail.com",
            },
            dateOfBirth: {
                value: "25-5-1997",
            },
            phone: {
                value: '01029524141',
            },
            address: {
                value: 'Faqus',
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
                                    
                                    <MainText>Name</MainText>  
                                    <DefaultInput 
                                        iconName='md-user'
                                        placeholder="Name"
                                        value={this.state.controls.name.value}
                                        onChangeText={(val) => this.updateInputState('name', val)}
                                        autoCorrect={false}
                                    />  
                                </View>
                                
                                <View style={styles.item}>
                                    
                                    <MainText>Date Of Birth</MainText>  
                                    <DefaultInput 
                                        iconName='md-date'
                                        placeholder="Date OF Birth"
                                        value={this.state.controls.dateOfBirth.value}
                                        onChangeText={(val) => this.updateInputState('dateOfBirth', val)}
                                        autoCorrect={false}                                
                                    />
                                
                                </View>
                                
                                <View style={styles.item}>
                                
                                <MainText>Email</MainText>  
                                    <DefaultInput 
                                        iconName='md-email'
                                        placeholder="Name"
                                        value={this.state.controls.email.value}
                                        onChangeText={(val) => this.updateInputState('email', val)}
                                        autoCorrect={false}
                                    />

                                </View>

                                <View style={styles.item}>
                                
                                <MainText>Phone</MainText>  
                                    <DefaultInput 
                                        iconName='md-phone'
                                        placeholder='Phone'
                                        value={this.state.controls.phone.value}
                                        onChangeText={(val) => this.updateInputState('phone', val)}
                                        autoCorrect={false}
                                    />

                                </View>

                                <View style={styles.item}>
                                
                                    <MainText>Address</MainText>  
                                    <DefaultInput 
                                        iconName='md-address'
                                        placeholder='Address'
                                        value={this.state.controls.address.value}
                                        onChangeText={(val) => this.updateInputState('address', val)}
                                        autoCorrect={false}
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