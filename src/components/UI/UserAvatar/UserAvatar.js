import React from 'react';
import {View , StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import { ImagePicker, Permissions } from 'expo';

class UserAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    } 

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };
    
    handleAvatar = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          base64: true,
        });
        this.setState({image: result.uri });
        this.props.onChangeAvatar({uri: result.uri, base64: result.data});
    };

    render() {

        return (
          
            <TouchableWithoutFeedback onPress={this.handleAvatar}>  
                <View style={styles.ava}>
                    <Image style={styles.img} source={this.state.image === null ? require('../../../assets/images/Avatar.png') : {uri:this.state.image}} />
                </View>  
            </TouchableWithoutFeedback>
        
        );
    }
    
}

const styles = StyleSheet.create({
    ava: {
       width:60,
       height:60,
       borderRadius: 30,
    },
    img: {
       width: 60,
       height: 60,
       borderRadius: 30
    }

});

export default UserAvatar;