import React from 'react';
import { View, StyleSheet} from 'react-native'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import Image from '../../../components/UI/Image/Image';
import Button from '../../../components/UI/Button/Button';
import Icon from '../../../components/TabBarIcon/TabBarIcon';
import MainText from '../../../components/UI/mainText/mainText';
import { logout } from '../../../store/actions/auth';
import { height } from '../../../constants/Layout/Layout';

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
    logout: PropTypes.func
  };
  
  signoutHandler = async () => {
    await this.props.logout();
  }

  render() {
    
    return (
      
      <View style={styles.Container}>
          
          <View style={styles.viewFlexStart}>
             
            <View style={styles.header}>
              
              <View style={styles.avatarHeader}>
              
                <Image image={null} />
              
              </View>  
                  
              <View style={styles.headerSubItem}>
                
                <MainText moreStyle={{fontSize: 19, fontFamily: 'Fjalla-one', color: '#2e3131'}}> {this.state.name} </MainText>
               
              </View>
                
            </View>
            
            <View style={styles.bodyContainer}>
              
              <View style={styles.item}>

                <Icon name='md-home' size={17} focused={true} /> 
              
                <Button size={17} marginL={15} onPress={() => this.props.navigation.navigate('home')} >Home</Button>
              
              </View>

              <View style={styles.item}>
                 
                <Icon name='md-settings' size={17} focused={true} />
              
                <Button size={17} marginL={15} onPress={() => this.props.navigation.navigate('about')} >About</Button>
              
              </View>

              <View style={styles.item}>
                 
                <Icon name='md-lock' size={17} focused={true} /> 
               
                <Button size={17} marginL={15} onPress={() => this.props.navigation.navigate('changePass')} >Change Password</Button>
               
              </View>

              <View style={styles.item}>
                 
                <Icon name='md-help-circle' size={17} focused={true} />
              
                <Button size={17} marginL={15} onPress={() => alert('Help')} >Help</Button>
               
              </View>

              <View style={styles.item}>
              
                <Icon name='md-log-out' size={17} focused={true} /> 
              
                <Button size={17} marginL={15} onPress={this.signoutHandler} >Logout</Button>
              
              </View>
            
            </View>
          
          </View>
      
      </View>
    );
  }
}

const styles =StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#faf8fb',
    padding: 10,
  },
  header:{
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 150,
    width: '100%',
    borderRadius: 10
  },
  avatarHeader: {
    borderColor: '#000',
    borderStyle: 'dashed',
    borderWidth: .5,
    borderRadius: 30,
    padding: 2, 
    marginLeft: 5,
  },
  headerSubItem: {
    marginLeft: 15
  },
  bodyContainer: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 20,
    height: height - 150,
    width: '100%',
  },
  item: {
    borderBottomColor: '#000',
    borderStyle: 'solid',
    borderBottomWidth: .3,
    padding: 10,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '95%',
    marginTop: 10,
    marginLeft: 5

  }
});

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(withNavigation(ProfileScreen));