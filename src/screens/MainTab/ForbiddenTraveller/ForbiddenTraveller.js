import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import * as  theme  from '../../../constants/Theme/Theme';
import { ButtonD, Block } from '../../../components/UI/Index';

import PickImage from '../../../components/PickImage/PickImage';
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
            loading: false
        };
    };

    static navigationOptions = {
        title: "Forbidden Traveller",
        headerRight: <LogoTitle />,
    };

    static propTypes = {
        navigation: PropTypes.object,
    };

    fingerprintPickedHandler = fingerprint => {
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

            <Block>

                <Block margin={[0, theme.sizes.base * 2, 40]} middle center shadow>
                    <PickImage text="Capture your fingerprint By Camera" wth={'80%'} hht={150} onImagePicked={this.pickFingerprintHandler} />
                </Block>
                
                <ButtonD gradient
                    onPress={this.checkTravellerHandler} 
                    disabled={
                        !this.state.controls.fingerprintPicked.valid 
                    }
                >
                    {loading ?
                        <ActivityIndicator size="small" color="white" /> :
                        <Text bold black center> Check </Text>
                    }
                </ButtonD>      

            </Block>
       );
    }

}

export default IdentityScreen;