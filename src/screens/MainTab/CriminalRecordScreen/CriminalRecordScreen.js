import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import PickImage from '../../../components/PickImage/PickImage';
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';

class CriminalRecordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            controls: {
                criminalRecordImage: {
                    value: null,
                    valid: false 
                }     
            }
        };
    };
    
    static navigationOptions = {
        title: "Criminal Record",
        headerRight: <LogoTitle />,
    };

    static propTypes = {
        navigation: PropTypes.object,
    }

    criminalRecordPickedHandler = criminalrecord => {
        this.setState(prevState => {
            return {
              controls: {
                ...prevState.controls,
                criminalRecordImage: {
                  value: criminalrecord,
                  valid: true
                }   
              }               
            };
        });
    }
   
    criminalCheckHandler = async () => {
        this.props.navigation.navigate('details');
    }

    render() {
        
        return (
           <View style={styles.container}>
               
               <PickImage onImagePicked={this.criminalRecordPickedHandler} />
               
               <CustomButton 
                    onPress={this.criminalCheckHandler} 
                    bgColor="#f6b810"
                    width={250}  
                    size={20} 
                    disabled={
                        !this.state.controls.criminalRecordImage.valid 
                    }
                >Check</CustomButton>

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