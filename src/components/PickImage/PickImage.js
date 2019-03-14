import React, { Component } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { ImagePicker } from 'expo';

import CustomButton from '../UI/CustomButton/CustomButton';

class PickImage extends Component {
    
    state = {
        image: null
    }
    
    pickImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync(
            {allowsEditing: true,
             aspect: [4,3]   
            });
        if(!result.cancelled) {
            this.setState({
                image: result.uri
            });
            this.props.onImagePicked({uri: result.uri, base64: result.data});
        }    
    };

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={{uri:this.state.image}} style={styles.previewImage}/>
                </View>
                <View style={styles.button}>
                    <CustomButton onPress={this.pickImageHandler} color="#f6b810">Pick Image</CustomButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       width: "100%",
       alignItems: 'center'
    },
    placeholder: {
       borderWidth: 1,
       borderColor: '#000',
       backgroundColor: '#fff',
       width: "80%",
       height: 150 
    },
    previewImage: {
       width: "100%",
       height: "100%"   
    },
    button: {
        margin: 8
    }
});

export default PickImage;