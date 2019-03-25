import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import PickImage from '../../components/PickImage/PickImage';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import { addCriminalRecord, checkCriminalRecrod } from '../../store/actions/identity';

class CriminalRecordScreen extends Component {
    
    static navigationOptions = {
        title: "Criminal Record",
    };

    state = {
        controls: {
            criminalRecordImage: {
                value: null,
                valid: false 
            }     
        } 
        
    };

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
       
      this.props.onAddCriminalRecord(this.state.controls.criminalRecordImage.value);
    }
   
    criminalCheckHandler = () => {
        this.props.onCheckCriminalRecord();
    }

    render() {
        
        let submit = <CustomButton 
            onPress={this.criminalCheckHandler} 
            bgColor="#f6b810"  
            size={20} 
            disabled={
                !this.state.controls.criminalRecordImage.valid 
            }
        >Check</CustomButton>;
        
        if (this.props.isLoading) {
          submit = <ActivityIndicator size="small" color="#f6b810" />
        }

        return (
           <View style={styles.container}>
               
               <PickImage onImagePicked={this.criminalRecordPickedHandler} />
               
               {submit}
       
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

const mapStateToProps = state => {
    return {
       isLoading: state.ui.isLoading 
    };
};

const mapDispatchToProps = dispatch => {
    return {
       onAddCriminalRecord : criminalrecord => dispatch(addCriminalRecord(criminalrecord)),
       onCheckCriminalRecord: () => dispatch(checkCriminalRecrod()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps )(CriminalRecordScreen);