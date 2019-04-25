import React, { Component } from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import { ImagePicker } from 'expo';

import CustomButton from '../UI/CustomButton/CustomButton';

class PickImage extends Component {
    
    state = {
        pickedImage: null
    }
     
    takeImageHandler = async () => {
      const result = await ImagePicker.launchCameraAsync(
          {allowsEditing: true,
            quality: 1, 
            aspect: [4,3]   
          });
      if(!result.cancelled) {
          this.setState({
            pickedImage: result.uri
          });
          this.props.onImagePicked({uri: result.uri, base64: result.data});
      }    
    };

    render () {

        
        const image = (<Image source={{uri: this.state.pickedImage}} style={styles.previewImage}/>);
        const text = (<Text style={styles.txt}> { this.props.text } </Text>); 
        
        return (
            <View style={styles.container}>

                <View style={[styles.placeholder, {width: this.props.wth , hight: this.props.hht} ]}>
                    
                    {this.state.pickedImage === null ?  text : image }  
                    
                </View>
            
                <View style={styles.button}>
            
                    <CustomButton onPress={this.takeImageHandler} color="#f6b810">capture Image</CustomButton>
            
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
       borderStyle: 'dashed',
    },
    previewImage: {
       width: "100%",
       height: "100%"   
    },
    button: {
        margin: 8
    },
    txt: {
        justifyContent: 'center',
        fontSize: 16, 
    }
});

export default PickImage;