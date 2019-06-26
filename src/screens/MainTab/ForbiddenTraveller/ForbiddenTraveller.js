import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import PickImage from '../../../components/PickImage/PickImage';
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';


class IdentityScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                fingerprintPicked: {
                    value: null,
                    valid: false
                },
            },
        };
    };

    static navigationOptions = {
        title: "Forbidden Traveller",
        headerRight: <LogoTitle ur={null} />,
    };

    static propTypes = {
        navigation: PropTypes.object,
    };

    handleFingerprint = fingerprint => {
        this.setState(prevState => {
            return {
                ...prevState.controls,
                fingerprintPicked: {
                    value: fingerprint,
                    valid: true
                }
            };
        });
    };

    checkTravellerHandler = async () => {
        this.props.navigation.navigate('details');
    }
     
    render() {
       
        return (

            <View style={styles.container}>
                
                <HeadingText size={25}> Pick Fingrprint </HeadingText>

                <mainText>We use your fingerprint to check your identity and verify </mainText>
                
                <PickImage h={150} w={'80%'} onImagePicked={this.handleFingerprint} />

                <CustomButton
                    moreStyle={{width: 290, height: 55, marginTop: 50}}
                    bgColor="#f6b810"  
                    size={22} 
                    onPress={this.checkTravellerHandler} 
                    disabled={ !this.state.controls.fingerprintPicked.valid }
                >
                Check
                </CustomButton>      

            </View>
       );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#faf8fb', 
    },
});

export default IdentityScreen;