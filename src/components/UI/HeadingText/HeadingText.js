import React from 'react';
import {Text, StyleSheet} from 'react-native';

import * as theme from '../../../constants/Theme/Theme';

const headingText = props => (
    <Text style={[styles.mainText, {fontSize: props.size}, {fontFamily: props.fontFamily}, props.moreStyle]}>{props.children}</Text>
);

const styles = StyleSheet.create({
    mainText:{
        color: theme.colors.blackColor,
        backgroundColor: 'transparent',
        fontWeight: 'bold'
    }
});

export default headingText;