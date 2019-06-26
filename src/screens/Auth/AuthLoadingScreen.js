import React from 'react';
import { ActivityIndicator, StatusBar, View} from 'react-native';
import Firebase from '../../services/Firebase';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationReady: false,
      isAuthenticated: false,
    }
  }
  
  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Tab' : 'Auth')
    })
  }
  
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

} 

export default AuthLoadingScreen;