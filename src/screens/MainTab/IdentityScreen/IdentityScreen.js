import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';
import PickImage from '../../../components/PickImage/PickImage';
import mainText from '../../../components/UI/mainText/mainText';
import HeadingText from '../../../components/UI/HeadingText/HeadingText';

class IdentityScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                fingerprint: {
                    value: null,
                    valid: false
                },
                image: {
                    value: null,
                    valid: false
                }
            }
        };
    };

    static navigationOptions = {
        title: "Identity",
        headerRight: <LogoTitle ur={null} />,
    };

    static propTypes = {
        navigation: PropTypes.object,
    };

    handleFace = image => {
        this.setState(prevState => {
            return {
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
     
    checkIdentityHandler = async () => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        const info = {
            name: 'Mohamed Helmy Abdel Aziz',
            status: 'valid',
            birthDate: '25-05-1997',
            time: time,
        }

        this.props.navigation.navigate('details' , info);
    }

    render() {

        return (
            
            <View style={styles.container}>

                <ScrollView showsVerticalScrollIndicator={false}>
                   
                    <View style={styles.block}>                
                        
                        <View style={styles.box}>

                             <HeadingText size={25}> Pick Fingrprint </HeadingText>

                             <mainText>We use your selfie to check your identity</mainText> 
                            
                             <PickImage text={'Fingerprint'} h={150} w={'80%'} onImagePicked={this.handleFingerprint} />
 
                        </View> 
                        
                        <View style={styles.box}>

                            <HeadingText size={25} > Take Selfie </HeadingText>
                            
                            <mainText>We use your selfie to check your identity</mainText>  
                            
                            <mainText>Good Lighting</mainText>

                            <mainText>Look straight</mainText> 

                            <PickImage text={'Face'} h={200} w={'55%'}  onImagePicked={this.handleFace} />
                        
                        </View>
                        
                        <CustomButton
                            moreStyle={{width:280, height: 55, marginTop: 60, marginBottom: 30}}
                            bgColor="#f6b810" 
                            size={22}
                            onPress={this.checkIdentityHandler} 
                            disabled={
                                !this.state.controls.fingerprint.valid &&
                                !this.state.controls.image.valid 
                            }
                        >
                            Check Identity
                        </CustomButton>     
                            
                    </View>   
                
                </ScrollView>

            </View>
       );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf8fb',
    },
    block: {
        flex:1,
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
    },
    box: {
        alignItems: 'center',
        marginTop: 10
    }
});

export default IdentityScreen;