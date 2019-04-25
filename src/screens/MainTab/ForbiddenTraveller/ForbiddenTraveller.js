import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import CustomButton from '../../../components/UI/CustomButton/CustomButton';
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
            }
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
            <View style={styles.container}>
                
              
                <PickImage text="Capture your fingerprint By Camera" wth={'80%'} hht={150} onImagePicked={this.pickFingerprintHandler} />
                    
                <CustomButton 
                    onPress={this.checkTravellerHandler} 
                    bgColor="#f6b810"  
                    size={20} 
                    width={250}
                    disabled={
                        !this.state.controls.fingerprintPicked.valid 
                    }
                >Check</CustomButton>

            </View>
       );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#faf8fb' 
    },
});

export default IdentityScreen;