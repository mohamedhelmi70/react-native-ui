import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PickImage from '../../components/PickImage/PickImage';
import { addFingerprint , addImage, checkCriminalRecrod } from '../../store/actions/identity';

class IdentityScreen extends Component {
    static navigationOptions = {
        title: "Check Identity",
    };

    state = {
        controls: {
            imagePicked: {
                value: null,
                valid: false
            },
            recordPicked: {
                value: null,
                valid: false
            },
            fingerprintPicked: {
                value: null,
                valid: false
            }
        }
    };


    pickImageHandler = image => {
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
        this.props.onAddImage(addImage(this.state.controls.imagePicked.value));
    };

    pickFingerprintHandler = fingerprint => {
        this.setState(prevState => {
            return {
               controls: {
                    ...prevState.controls,
                    fingerprintPicked: {
                        value: fingerprint,
                        valid: true
                    }
               }    
            };
        });
        this.props.onAddImage(onAddFingerprint(this.state.controls.fingerprintPicked.value));
    };
     
    checkIdentityHandler = () => {
        this.props.onCheckIdentity();
        this.props.navigation.navigate('details');
    }


    render() {
       
        let submit = <CustomButton 
                onPress={this.checkIdentityHandler} 
                bgColor="#f6b810" 
                size={20}
                disabled={
                    !this.state.controls.fingerprintPicked.valid &&
                    !this.state.controls.imagePicked.valid &&
                    !this.state.controls.recordPicked.valid 
                }
            >Check Identity</CustomButton>;

        if (this.props.isLoading) {
            submit = <ActivityIndicator size="small" color="#f6b810" />
        } 
       
        return (
            <View style={styles.container}>
                
                <PickImage onImagePicked={this.pickFingerprintHandler} />

                <PickImage onImagePicked={this.pickImageHandler} />
                 
                {submit} 
               
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

const mapStateToProps = state => {
    return {
       isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
       onAddFingerprint : fingerprint => dispatch(addFingerprint(fingerprint)),
       onAddImage: image => dispatch(addImage(image)),
       onCheckIdentity: () => dispatch(checkCriminalRecrod()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdentityScreen);