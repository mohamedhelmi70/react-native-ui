import React from 'react';
import { StyleSheet } from 'react-native'; 
import PropTypes from 'prop-types';
import * as  theme  from '../../../constants/Theme/Theme';
import { Block, Text } from '../../../components/UI/index';

import Image from '../../../components/UI/Image/Image';
import Icon from '../../../components/TabBarIcon/TabBarIcon';
import Firebase from '../../../config/Firebase';

class ProfileScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: 'Mo Helmi',
    };
  }

  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
  };
  
  signoutHandler = async () => {
    await Firebase.auth().signOut().then(() => { this.props.navigation.navigate('login') } );
  }

  render() {
    
    return (
      
      <Block>
          
        <Block flex={false} row center space="between" style={styles.header}>
          
          <Text h2 bold> { this.state.name } </Text>
          
          <Image image={null} style={styles.avatar} />
        
        </Block>
            
          <Block style={styles.bodyContainer}>
              
            <Block row space="between" margin={[10, 0]} style={styles.item}>

              <Icon name='md-home' size={17} focused={true} /> 
                
              <Text medium secondary onPress={() => this.props.navigation.navigate('home')} > Home </Text>
            
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.item}>
                 
              <Icon name='md-settings' size={17} focused={true} />
              
              <Text medium secondary onPress={() => this.props.navigation.navigate('about')} > About </Text>
              
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.item}>
                
              <Icon name='md-lock' size={17} focused={true} /> 
              
              <Text medium secondary onPress={() => this.props.navigation.navigate('changePass')} >Change Password</Text>
              
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.item}>
                
              <Icon name='md-help-circle' size={17} focused={true} />
            
              <Text medium secondary onPress={() => alert('Help')} > Help </Text>
              
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.item}>
            
              <Icon name='md-log-out' size={17} focused={true} /> 
            
              <Text medium secondary onPress={this.signoutHandler} > Log Out </Text>
            
            </Block>
            
          </Block>
      
      </Block>
    );
  }
}

const styles =StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  bodyContainer: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  item: {
    alignItems: 'flex-end'
  }
});

export default ProfileScreen;