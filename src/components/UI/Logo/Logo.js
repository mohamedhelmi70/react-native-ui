import React from 'react';
import {View , StyleSheet, Image } from 'react-native';

const Logo = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../../assets/images/fingerprint.jpg')} />
        </View>    
    );
};

const styles = StyleSheet.create({
   container: {
       width: 150,
       height: 80,
   },
   logo: {
       width: '100%',
       height: '100%',
   }    
});

export default Logo;