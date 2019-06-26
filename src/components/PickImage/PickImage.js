import React, { Component } from 'react';
import { StyleSheet, View , Image} from 'react-native';
import { Permissions, ImagePicker } from 'expo';

import Icon from '../TabBarIcon/TabBarIcon';
import CustomButton from '../UI/CustomButton/CustomButton';
class PickImage extends Component {
    constructor (props) {
        super(props);
        this.state = {
        pickedImaged: null
       }
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };
    
    useLibraryHandler = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          base64: true,
        });
        this.setState({pickedImaged: result.uri });
        this.props.onImagePicked({uri: result.uri, base64: result.data});
    };
    
    useCameraHandler = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });
        this.setState({ pickedImaged: result.uri });
        this.props.onImagePicked({uri: result.uri, base64: result.data});
    };
    
    
    
    
    render () { 
        
        return (
            <View style={styles.container}>

                <View style={[styles.placeholder, {height: this.props.h, width: this.props.w}]}>
                    
                    <Image source={{uri: this.state.pickedImaged}} style={styles.previewImage}/>
                    
                </View>
            
                <View style={styles.button}>
            
                    <CustomButton onPress={this.useCameraHandler} color="#070606"> 
                        <Icon name='md-camera' size={18} />
                    </CustomButton>
                    <View style={{marginRight: 20}} />  
                    <CustomButton onPress={this.useLibraryHandler} color="#070606">
                        <Icon name='md-cloud-upload' size={18} />
                    </CustomButton>
            
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
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'stretch',

    }
});

export default PickImage;