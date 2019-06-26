import React from 'react';
import { Image } from 'react-native';

const LogoTitle = (props) => {
    return (
            <Image 
                style={{width: 35, height: 35, borderRadius: 15, marginRight: 10}}
                source={ props.ur === null ? require('../../../assets/images/Avatar.png') : {uri: props.ur} } 
            />
    );
}

export default LogoTitle;