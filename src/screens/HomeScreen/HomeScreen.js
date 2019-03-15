import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';

import CustomButton from '../../components/UI/CustomButton/CustomButton';
import HeadingText from '../../components/UI/HeadingText/HeadingText';


class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
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
            size={30} 
            moreStyle={{marginTop: 20, marginLeft: 5}} 
            fontFamily='Fjalla-one'
          >
            Check Criminal Record & Identity By Your Fingerprints
          </HeadingText>
       
        </View>

        <View style={styles.buttonsContainer}>
        
          <CustomButton onPress={this.startCriminalRecord} moreStyle={{width: 300, height: 55}} bgColor="#f6b810" size={20} raduis={20}>
            Validate Criminal Record
          </CustomButton>
        
          <CustomButton onPress={this.startIdentity} moreStyle={{width: 300, height: 55}} bgColor="#f6b810" size={20} raduis={20}>
            Check Identity
          </CustomButton>
            
          <CustomButton onPress={this.startForbiddenTraveller} moreStyle={{width: 300, height: 55}} bgColor="#f6b810" size={20} raduis={20} >
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
    backgroundColor: '#faf8fb',
    padding: 10
  },
  viewflexStart: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 2
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10
  }
});

export default HomeScreen;