import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from '../Icon/Icon';

const defaultInput = props => (
    <View style={[styles.inputView, !props.valid && props.touched ? styles.inValid : null ]}>
      <TextInput  
      underlineColorAndroid="transparent"   
      {...props} 
      style={styles.input}
      />
      <Icon name={props.iconName} inValid={!props.valid && props.touched} size={20} />
    </View>
);

const styles = StyleSheet.create({
  inputView: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderStyle: 'solid',
    borderBottomWidth: .4,
    borderBottomColor: '#333366',
    flexDirection: 'row'
  },
  input: {
    width: '90%',
    marginRight: 8
  },
  inValid: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  }
});

export default defaultInput;