import React from 'react';
import { ActivityIndicator, StatusBar, View} from 'react-native';
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.startAppHandler();
  }

  startAppHandler = () => {
    this.props.navigation.navigate('Auth');
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