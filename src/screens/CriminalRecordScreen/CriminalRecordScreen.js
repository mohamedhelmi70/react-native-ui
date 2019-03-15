import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';


import PickImage from '../../components/PickImage/PickImage';
import CustomButton from '../../components/UI/CustomButton/CustomButton';

class CriminalRecordScreen extends Component {
    static navigationOptions = {
        title: "Criminal Record",
    };

   state = {
        controls: {
            image: {
                value: null,
                valid: false 
            }     
        } 
    };

   imagePickedHandler = image => {
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
   
    criminalCheckHandler = () => {
       // this.props.onCheckCriminal(
       //     this.state.controls.image.value
       // )
    }

   render() {
       return (
           <View style={styles.container}>
               <PickImage onImagePicked={this.imagePickedHandler} />
               <CustomButton onPress={this.criminalCheckHandler} bgColor="#f6b810"  size={20} >Check Criminal Record</CustomButton>
           </View>
       );
   } 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#edf1f3' 
    }, 
});

export default CriminalRecordScreen;