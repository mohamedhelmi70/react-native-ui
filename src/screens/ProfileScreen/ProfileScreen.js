import React from 'react';
import { View, StyleSheet} from 'react-native'; 

import UserAvatar from '../../components/UI/UserAvatar/UserAvatar';
import Button from '../../components/UI/Button/Button';
import Icon from '../../components/TabBarIcon/TabBarIcon';
import MainText from '../../components/UI/mainText/mainText';

class ProfileScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
  };

  state = {
      name: 'Mohamed Helmy',
      controls: {
        imagePicked: {
          value: null,
          valid: true
        }
      }
  }; 
  
  changeAvatarHandler = image => {
      this.setState(prevState => {
          return {
            controls: {
              ...prevState.controls,
              imagePicked: {
                value: image,
                valid: true
              }
            }    
          };
      });
  }

  signoutHandler = async () => {
    // await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    
    return (
      
      <View style={styles.Container}>
          
          <View style={styles.viewFlexStart}>
             
            <View style={styles.header}>
              
              <View style={styles.avatarHeader}>
              
                <UserAvatar onChangeAvatar={this.changeAvatarHandler}/>    
              
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
              
                <Button size={17} marginL={15} onPress={this.signupHandler} >Logout</Button>
              
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
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 120,
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

export default ProfileScreen;