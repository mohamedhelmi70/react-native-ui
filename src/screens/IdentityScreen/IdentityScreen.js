import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';


import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PickImage from '../../components/PickImage/PickImage';
import PickRecord from '../../components/PickRecord/PickRecord';

class IdentityScreen extends Component {
    static navigationOptions = {
        header: null,
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
    }
     
    checkIdentityHandler = () => {
        //this.props.onCheckImage(
        //    this.state.controls.imagePicked.value
        //);
        this.props.navigation.navigate('details');
    }


    render() {
       return (
            <View style={styles.container}>
                
                <PickImage onImagePicked={this.pickImageHandler} />
                
                <PickRecord />

                <CustomButton onPress={this.checkIdentityHandler} bgColor="#f6b810" size={20}>Check Identity</CustomButton>
            
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