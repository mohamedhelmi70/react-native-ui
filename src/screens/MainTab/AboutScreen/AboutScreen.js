import React, { Component } from 'react';
import {
    StyleSheet, 
    View, 
    ScrollView, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    Keyboard 
} from 'react-native';
import PropTypes from 'prop-types';

import Avatar from '../../../components/UI/UserAvatar/UserAvatar';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import validate from '../../../utility/validation';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle'; 

class AboutScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                imagePicked: {
                    value: null,
                    valid: true
                },
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
        }
    };

    static navigationOptions = {
        title: "About",
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

    changeAvatarHandler = image => {
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
    }
    
    SaveChangesHndler = () => {
        this.props.navigation.navigate('profile');
    }
    
    render() {
        return (
          
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                
                <ScrollView style={{flex: 1}}>

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    
                        <View style={styles.viewFlexStart}>

                                <View style={styles.item}>
                                      
                                   <Avatar onChangeAvatar={this.changeAvatarHandler} />

                                </View>
                                
                                <View style={styles.item}>
                                      
                                    <DefaultInput 
                                        iconName='person'
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
                                        iconName='today'
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
                                        iconName='email'
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
                                        iconName='phone-android'
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
                                        iconName='my-location'
                                        placeholder='ex: st 15 cairo egypt'
                                        value={this.state.controls.address.value}
                                        onChangeText={(val) => this.updateInputState('address', val)}
                                        autoCorrect={false}
                                        valid={this.state.controls.address.valid}
                                        touched={this.state.controls.address.touch}
                                        placeholderTextColor="#5a6e65"
                                    />

                                </View>
                        
                            <View style={{marginTop: 10}}>

                                <CustomButton 
                                    onPress={this.SaveChangesHndler} 
                                    bgColor='#f6b810' 
                                    size={20} 
                                    width={250}
                                    disabled={ 
                                        !this.state.controls.email.valid &&
                                        !this.state.controls.name.valid &&
                                        !this.state.controls.phone.valid &&
                                        !this.state.controls.dateOfBirth.valid &&
                                        !this.state.controls.address.valid 
                                     
                                    }  
                                >
                                    Save Changes
                                </CustomButton>

                            </View>        
                    
                        </View>
                    
                    </TouchableWithoutFeedback>    
                
                </ScrollView>
            
            </KeyboardAvoidingView>   
        ); 
    }

}

const styles = StyleSheet.create({
    container: {
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
    },
});


export default AboutScreen;