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
import Firebase from '../../../services/Firebase';

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
                    value: '',
                    valid: false,
                    validationRules: {
                        isfullName: true
                    },
                    touched: false
                }, 
                dateOfBirth: {
                    value: '',
                    valid: false,
                    validationRules: {
                      isDate: true
                    },
                    touched: false
                },
                phone: {
                    value: '',
                    valid: false,
                    validationRules: {
                        isPhoneNumber: true
                    },
                    touched: false
                },
                address: {
                    value: '',
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
        headerRight: <LogoTitle ur={null} />,
    };
    
    static propTypes = {
        navigation: PropTypes.object,
        validate: PropTypes.func,
    };

    async componentDidMount() {
        const user = await Firebase.auth().currentUser;
          if ( user ) {
            this.setState(prevState => ({
                controls: {
                    ...prevState.controls,
                    name: {
                        ...prevState.controls.name,
                        value: user.displayName,
                    },
                    phone: {
                        ...prevState.controls.phone,
                        value: user.phoneNumber,
                    },
                }
            }));
          }
    } 

    updateInputState = (key, value) => {
        this.setState(prevState => ({
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
        }));
    };

    handleAvatar = image => {
        this.setState(prevState => ({
              controls: {
                ...prevState.controls,
                imagePicked: {
                  value: image,
                  valid: true
                }
              }
        }));
    }
    
    handleChanges = async () => {
        const  name = this.state.controls.name.value;
        const  phone = this.state.controls.phone.value;
        const user =  await Firebase.auth().currentUser;
        if ( user ) {
            user.updateProfile({ displayName : name, phoneNumber: phone }).then(() => {
                alert('Profile Updated :)')
            });
        }    
    }

    
    render() {
        return (
          
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                
                <ScrollView style={{flex: 1}}>

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    
                        <View style={styles.viewFlexStart}>

                                <View style={styles.item}>
                                      
                                   <Avatar onChangeAvatar={this.handleAvatar} />

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
                                        iconName='phone-android'
                                        placeholder='ex: +61029524141'
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
                                    onPress={this.handleChanges} 
                                    bgColor='#f6b810'
                                    moreStyle={{width: 280, height: 55, marginTop: 60}} 
                                    size={22}  
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