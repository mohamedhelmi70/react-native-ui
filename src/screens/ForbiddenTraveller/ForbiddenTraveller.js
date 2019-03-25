import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PickImage from '../../components/PickImage/PickImage';
import { addFingerprint, checkForbiddenTraveller } from '../../store/actions/identity';

class IdentityScreen extends Component {
    static navigationOptions = {
        title: "Forbidden Traveller",
    };

    state = {
        controls: {
            fingerprintPicked: {
                value: null,
                valid: false
            },
        }
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
       this.props.onAddFingerprint(this.state.controls.fingerprintPicked.value);
    };

    checkTravellerHandler = () => {
        this.props.onCheckForbidden();
        this.props.navigation.navigate('details');
    }
     
    render() {
       
        let submit = <CustomButton 
            onPress={this.checkTravellerHandler} 
            bgColor="#f6b810"  
            size={20} 
            disabled={
                !this.state.controls.fingerprintPicked.valid 
            }
            >Check</CustomButton>;
    
        if (this.props.isLoading) {
            submit = <ActivityIndicator size="small" color="#f6b810" />
        }

        return (
            <View style={styles.container}>
                
              
                <PickImage onImagePicked={this.fingerprintPickedHandler} />
                    
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
       onCheckForbidden: () => dispatch(checkForbiddenTraveller()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps )(IdentityScreen);