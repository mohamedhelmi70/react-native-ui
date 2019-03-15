import React from 'react';
import {Text, StyleSheet} from 'react-native';

import Colors from '../../../constants/Colors/Colors';

const headingText = props => (
    <Text style={[styles.mainText, {fontSize: props.size}, {fontFamily: props.fontFamily}, props.moreStyle]}>{props.children}</Text>
);

const styles = StyleSheet.create({
    mainText:{
        color: Colors.blackColor,
        backgroundColor: 'transparent',
        fontWeight: 'bold'
    }
});

export default headingText;