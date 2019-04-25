import React from './node_modules/react';
import { Image } from 'react-native';

const LogoTitle = (props) => {
    return (
        <Image 
            style={{width: 35, height: 35, borderRadius: 15, marginRight: 5}}
            source={ props.ur === null ? require('../../../assets/images/Avatar.png') : {uri: props.ur} } 
        />
    );
}

export default LogoTitle;