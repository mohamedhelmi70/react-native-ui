import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Text, Switch } from '../../../components/UI/index';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';

import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import PickImage from '../../../components/PickImage/PickImage';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import validate from '../../../utility/validation';
import mainText from '../../../components/UI/mainText/mainText';
import HeadingText from '../../../components/UI/HeadingText/HeadingText';

class PersonDetailScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                image: {
                  value: null,
                  valid: false
                },
                fingerprint: {
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
            },
            diabates : false,
            cancer : false,
            heartDisease : false,
            hepatitosC : false,
            hepatitosB : false,
            AIDS : false,
            statusValueHolder: '',
            genderValueHolder: ''
        }
    };

    static navigationOptions = {
      title: "Add Person",
      headerRight: <LogoTitle ur={null} />,
    };
    
    static propTypes = {
      navigation: PropTypes.object,
      validate: PropTypes.func,
    };

    updateInputState = (key, value) => {
        this.setState(prevState => {
          return {
            ...prevState,
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

    handleImage = image => {
      this.setState(prevState => {
          return {
             ...prevState,
             controls: {
                  ...prevState.controls,
                  image: {
                    value: image,
                    valid: true
                  }
             }    
          };
      });
    };

    handleFingerprint = fingerprint => {
      this.setState(prevState => {
        return {
          ...prevState,
          controls: {
            ...prevState.controls,
            fingerprint: {
              value: fingerprint,
              valid: true
            }
          }    
        };
      });
    };

    updatePersonHandler = async () => {
      this.props.navigation.navigate('PersonsScreen');            
    }
    
    render() {
      
        return (

          <KeyboardAvoidingView style={styles.container} behavior="padding">
                
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.top}>

                      <View style={styles.box}>

                        <HeadingText size={25}> Pick Fingrprint </HeadingText>
                      
                        <PickImage h={150} w={'80%'}  text={'Fingerprint'} onImagePicked={this.handleFingerprint} />

                      </View>

                      <View style={styles.box}>

                        <HeadingText size={25} > Take Selfie </HeadingText>
                                  
                        <mainText>Good Lighting</mainText>

                        <mainText>Look straight</mainText> 
                      
                        <PickImage h={200} w={'55%'}  text={'Face'} onImagePicked={this.handleImage} />

                      </View>

                    </View>

                    <Divider />
                    
                    <View style={styles.info}>
                      
                      <View style={styles.item}>

                        <Text medium black title>Name</Text>  

                        <View style={{width: '70%'}}>
                      
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

                        </View>

                      </View>

                      <View style={styles.item}>

                          <Text medium black title>Address</Text>  
                                
                          <View style={{width: '70%'}}>
                          
                            <DefaultInput 
                              iconName='my-location'
                              placeholder='ex: st 15 cairo, egypt'
                              value={this.state.controls.address.value}
                              onChangeText={(val) => this.updateInputState('address', val)}
                              autoCorrect={false}
                              valid={this.state.controls.address.valid}
                              touched={this.state.controls.address.touch}
                              placeholderTextColor="#5a6e65"
                            />
                          
                          </View>

                      </View>

                      <View style={styles.item}>

                          <Text medium black title>Phone</Text>  
                          
                          <View style={{width: '70%'}}>
                          
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

                      </View>

                      <View style={styles.item}>

                          <Text medium black title>Birth Date</Text>      
                         
                          <View style={{width: '70%'}}>

                            <DefaultInput 
                                iconName='today'
                                placeholder="ex: 25-05-1997"
                                value={this.state.controls.birthDate.value}
                                onChangeText={(val) => this.updateInputState('birthDate', val)}
                                autoCorrect={false}
                                valid={this.state.controls.birthDate.valid}
                                touched={this.state.controls.birthDate.touch}
                                placeholderTextColor="#5a6e65"                                
                            />

                          </View>
                                
                      </View>

                      <View style={styles.item}>

                        <Text medium black title>Gender</Text>      
                         
                        <View style={{width: '70%'}}>
                            
                            <Picker selectedValue={this.state.genderValueHolder} 
                                    onValueChange={
                                      (itemValue) => this.setState(prevState => {
                                        return {
                                          ...prevState,
                                          genderValueHolder: itemValue
                                        }
                                      })
                                    } 
                            >
                              <Picker.Item label="Male" value="Male"/>
                              <Picker.Item label="Female" value="Female"/>
                            </Picker>
                       </View>   
                     
                      </View> 

                      <View style={styles.item}>
                        
                         <Text medium black title>Status</Text>      
                         
                         <View style={{width: '70%'}}>
                          <Picker selectedValue={this.state.statusValueHolder} 
                                  onValueChange={(itemValue) => this.setState( prevState => {
                                    return {
                                        ...prevState,
                                        statusValueHolder: itemValue  
                                    }
                                    })
                                  } 
                          >
                            <Picker.Item label="Single" value="Single"/>
                            <Picker.Item label="Relationship" value="Relationship"/>
                            <Picker.Item label="Engaged" value="Engaged"/>
                            <Picker.Item label="Married" value="Married"/>
                            <Picker.Item label="Separated" value="Separated"/>
                          
                          </Picker>
                      
                        </View>
                      
                      </View> 
                      
                    </View>

                    <Divider />

                    <View style={styles.toggels}>
                      
                      <View style={styles.box}>
                        
                        <Text medium black title>Dibates</Text>
                        
                        <View style={{alignSelf: 'flex-end'}}>
                          <Switch
                            value={this.state.diabates}
                            onValueChange={value => this.setState(prevState =>  {  
                                return {
                                  ...prevState, 
                                  diabates : value
                                }  
                              })
                            }
                          /> 
                        </View>
                     
                      </View>
                      
                      <View style={styles.box}>
                        
                        <Text medium black title>Cancer</Text>
                        
                        <Switch
                          value={this.state.cancer}
                          onValueChange={ value => this.setState(prevState =>  {  
                              return {
                                ...prevState, 
                                cancer : value
                              }  
                            })
                          }
                        />

                      </View>

                      <View style={styles.box}>
                        
                        <Text medium black title>Heart Disease</Text>
                        
                        <Switch
                          value={this.state.heartDisease}
                          onValueChange={value => this.setState( prevState =>  {  
                              return {
                                ...prevState, 
                                heartDisease : value
                              }  
                            })
                          }
                        />

                      </View>

                      <View  style={styles.box}>
                        
                        <Text medium black title>Hepatitos C</Text>
                        
                        <Switch
                          value={this.state.hepatitosC}
                          onValueChange={ value => this.setState( prevState =>  {  
                              return {
                                ...prevState, 
                                hepatitosC : value
                              }  
                            })
                          }
                        />

                      </View>

                      <View  style={styles.box}>
                        
                        <Text medium black title>Hepatitos B</Text>
                        
                        <Switch
                          value={this.state.hepatitosB}
                          onValueChange={ value => this.setState( prevState =>  {  
                              return {
                                ...prevState, 
                                hepatitosB : value
                              }  
                            })
                          }
                        />

                      </View>

                      <View  style={styles.box}>
                        
                        <Text medium black title>AIDS</Text>
                        
                        <Switch
                          value={this.state.AIDS}
                          onValueChange={ value => this.setState( prevState =>  {  
                              return {
                                ...prevState, 
                                AIDS : value
                              }  
                            })
                          }
                        />

                      </View>

                    </View> 
                          
                    
                    <View style={styles.bottom}>

                        <CustomButton 
                            onPress={this.addPersonHandler} 
                            moreStyle={{width: 280, height: 55}} 
                            bgColor="#f6b810" 
                            size={22} 
                            disabled={ 
                              !this.state.controls.name.valid ||
                              !this.state.controls.phone.valid ||
                              !this.state.controls.birthDate.valid ||
                              !this.state.controls.address.valid ||
                              !this.state.controls.image.valid &&
                              !this.state.controls.fingerprint.valid &&
                              !this.state.controls.record.valid
                            }
                        >
                          Save changes
                        </CustomButton>
                
                    </View>        
                
                </ScrollView>  
          
          </KeyboardAvoidingView>
        ); 
    }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#faf8fb',
  },       
  top: {
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 20,
  },
  box: {
    alignItems: 'center',
  },
  info: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  toggels: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  bottom: {
    width: '100%',
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  }
});

export default PersonDetailScreen;