import React from 'react';
import {View , StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import { ImagePicker } from 'expo';

class UserAvatar extends React.Component {

    state = {
        image: null
    };

    
    changeAvatarHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync(
            {allowsEditing: true,
             aspect: [4,3]   
            });
        if(!result.cancelled) {
            this.setState({
                image: result.uri
            });
            this.props.onChangeAvatar({uri: result.uri, base64: result.data});
        }    
    };

    render() {

        return (
          
            <TouchableWithoutFeedback onPress={this.changeAvatarHandler}>  
                <View style={styles.ava}>
                    <Image style={styles.img} source={this.state.image=== null ? require('../../../assets/images/Avatar.png') : {uri:this.state.image}} />
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