import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import PickImage from '../../../components/PickImage/PickImage';
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';

class CriminalRecordScreen extends Component {

    state = {
        controls: {
            image: {
                value: null,
                valid: false
            }     
        }
    };
    
    static navigationOptions = {
        title: "Criminal Record",
        headerRight: <LogoTitle ur={null} />,
    };

    static propTypes = {
        navigation: PropTypes.object,
    }

    handleimagePicked = image => {
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
   
    criminalCheckHandler = async () => {
        this.props.navigation.navigate('details');
    }

    render() {
        
        return (
            <View style={styles.container}>
                
                <PickImage h={150} w={'80%'}  onImagePicked={this.handleimagePicked} />

                <CustomButton 
                    onPress={this.criminalCheckHandler} 
                    moreStyle={{height: 55, width: 300, marginTop: 60}}
                    bgColor="#f6b810"
                    size={22} 
                >Check</CustomButton>
            </View>   
       );
    } 

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#faf8fb', 
    }, 
});

export default CriminalRecordScreen;