import React, { Component } from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import * as  theme  from '../../../constants/Theme/Theme';
import { ButtonD, Block } from '../../../components/UI/Index';

import PickImage from '../../../components/PickImage/PickImage';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';

class CriminalRecordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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
            <Block>     
                <Block margin={[0, theme.sizes.base * 2 , 40]} middle center shadow>
                        <PickImage text="Capture your fingerprint By Camera" wth={'80%'} hht={150} onImagePicked={this.criminalRecordPickedHandler} />
                </Block>
                
                <ButtonD gradient 
                    onPress={this.criminalCheckHandler}  
                    disabled={
                        !this.state.controls.criminalRecordImage.valid 
                    }
                >
                    {loading ?
                        <ActivityIndicator size="small" color="white" /> :
                        <Text bold black center> Check </Text>
                    }                 
                </ButtonD>
           </Block>

               
       );
    } 

}

export default CriminalRecordScreen;