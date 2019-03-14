import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';

import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PickImage from '../../components/PickImage/PickImage';

class IdentityScreen extends Component {
    static navigationOptions = {
        title: "Forbidden Traveller",
    };

    state = {
        controls: {
            imagePicked: {
                value: null,
                valid: false
            },
        }
    };

    pickImageHandler = image => {
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
    }
     
    render() {
       return (
            <View style={styles.container}>
                
                <View>
                    <PickImage onImagePicked={this.pickImageHandler} />
                </View>
               
                <View>                
                    <CustomButton onPress={() => alert('Check Forbidden travelller')} bgColor="#f6b810"  size={20} >Check</CustomButton>
                </View>

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