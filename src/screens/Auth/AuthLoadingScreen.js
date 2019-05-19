import React from 'react';
import { ActivityIndicator, StatusBar, View} from 'react-native';
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationReady: false,
      isAuthenticated: false,
    }
    
    Firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    this.startAppHandler();
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
  }

  startAppHandler = () => {
    this.state.isAuthenticated ? this.props.navigation.navigate('Tab')  : this.props.navigation.navigate('Auth');
  };
  
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