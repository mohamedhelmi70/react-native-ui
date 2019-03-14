import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const defaultInput = props => (
    <TextInput  
      underlineColorAndroid="transparent"   
      {...props} 
      style={[styles.input, !props.valid && props.touched ? styles.inValid : null ]}
    />
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderStyle: 'solid',
    borderBottomWidth: .4,
    borderBottomColor: '#333366'
  },
  inValid: {
    borderBottomColor: 'red'
  }
});

export default defaultInput;