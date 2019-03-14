import React from 'react';
import {Text, StyleSheet} from 'react-native';

const mainText = (props) => (
   <Text style={[styles.text, props.moreStyle]}>{props.children}</Text>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
    }
})

export default mainText;