import React from 'react';
import { ActivityIndicator, StatusBar, View} from 'react-native';
import { authAutoSignIn } from '../../store/actions/index';
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.startAppHandler();
  }
  
  componentDidMount() {
    this.props.onAutoSignIn();
  }

  startAppHandler = async () => {
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

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(authAutoSignIn)
  };
};

export default connect(null, mapDispatchToProps)(AuthLoadingScreen);