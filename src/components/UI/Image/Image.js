import React from 'react';
import {View , StyleSheet, Image} from 'react-native';


const image = (props) => {
    return (
      <View style={styles.ava}>
          <Image style={styles.img} source={require('../../../assets/images/Avatar.png')} />
      </View>  
    );
}

const styles = StyleSheet.create({
   ava: {
       width:100,
       height:100,
       borderRadius: 50,
   },
   img: {
       width: 100,
       height: 100,
       borderRadius: 50
   }

});

export default image;