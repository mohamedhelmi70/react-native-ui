import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from "react-native";

import PersonList from "../../../components/PersonList/PersonList";

class PersonsScreen extends Component {
  
  static navigationOptions = {
    headerTitle: "My Persons",
    headerRight: <LogoTitle ur={null} />,
  };

  state = {
    personsLoaded: false,
    removeAnim: new Animated.Value(1),
    personsAnim: new Animated.Value(0)
  };

  personsLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  personsSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        personsLoaded: true
      });
      this.personsLoadedHandler();
    });
  };

  itemSelectedHandler = key => {
    const selPerson = this.props.persons.find(person => {
      return person.key === key;
    });
    this.props.navigator.push({
      screen: "PersonDetailScreen",
      title: selPerson.name,
      passProps: {
        selectedPerson: selPerson
      }
    });
  };

  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.personsSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Person</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.personsAnim
          }}
        >
          <PersonList
            places={this.props.persons}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.personsLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 26
  }
});

export default PersonsScreen;