import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';

import CustomButton from '../../components/UI/CustomButton/CustomButton';
import HeadingText from '../../components/UI/HeadingText/HeadingText';


class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  startCriminalRecord = () => {
    this.props.navigation.navigate('criminalRecord');
  };

  startIdentity = () => {
    this.props.navigation.navigate('identity');
  };

  startForbiddenTraveller = () => {
    this.props.navigation.navigate('forbiddenTraveller');
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.viewflexStart}>

          <HeadingText 
            size={40} 
            moreStyle={{marginTop: 50, marginLeft: 10 ,fontWeight: 'bold'}} 
            fontFamily='Fjalla-one'
          >
            Welcome.,
          </HeadingText>
       
        </View>

        <View style={styles.buttonContainer}>
        
          <CustomButton onPress={this.startCriminalRecord} bgColor="#f6b810" size={20} raduis={20}>
            Validate Criminal Record
          </CustomButton>
        
          <CustomButton onPress={this.startIdentity} bgColor="#f6b810" size={20} raduis={20}>
            Check Identity
          </CustomButton>
            
          <CustomButton onPress={this.startForbiddenTraveller} bgColor="#f6b810" size={20} raduis={20} >
            Check Forbidden traveller
          </CustomButton>
        
        </View> 
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf1f3',
    padding: 10
  },
  viewflexStart: {
    alignItems: 'flex-start'
  },
  buttonContainer: {
    marginTop: 70,
    alignItems: 'center'
  }
});

export default HomeScreen;