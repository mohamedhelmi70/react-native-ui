import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';

import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import HeadingText from '../../../components/UI/HeadingText/HeadingText';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';

class HomeScreen extends Component {
 
  static navigationOptions = {
    headerTitle: "Home",
    headerRight: <LogoTitle ur={null} />,
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

  handleAddPerson = () => {
    this.props.navigation.navigate('Add');
  }

  handleUsers = () => {
    this.props.navigation.navigate('users');
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.buttonsContainer}>
        
          <CustomButton 
            onPress={this.startCriminalRecord} 
            moreStyle={{width: 320, height: 53, marginTop: 13}} 
            bgColor="#f6b810" 
            size={22} 
            raduis={20}
          >
            Validate Criminal Record
          </CustomButton>
        
          <CustomButton 
            onPress={this.startIdentity} 
            moreStyle={{width: 320, height: 53, marginTop: 13}} 
            bgColor="#f6b810" 
            size={22} 
            raduis={20}
          >
            Check Identity
          </CustomButton>
            
          <CustomButton 
            onPress={this.startForbiddenTraveller} 
            moreStyle={{width: 320, height: 53, marginTop: 13}} 
            bgColor="#f6b810" 
            size={22} 
            raduis={20} 
          >
            Check Forbidden traveller
          </CustomButton>

          <CustomButton 
            onPress={this.handleAddPerson} 
            moreStyle={{width: 320, height: 53, marginTop: 13}} 
            bgColor="#f6b810" 
            size={22} 
            raduis={20} 
          >
            Add Person
          </CustomButton>

          <CustomButton 
            onPress={this.handleUsers} 
            moreStyle={{width: 320, height: 53, marginTop: 13}} 
            bgColor="#f6b810" 
            size={22} 
            raduis={20} 
          >
            My Users
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
  buttonsContainer: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
  }
});

export default HomeScreen;