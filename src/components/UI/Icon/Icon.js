import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const icon = props => {
    return (
      <MaterialIcons
        name={props.name}
        size={props.size}
        style={{top: 5}}
        color={props.inValid ? '#f00' : '#5a6e65'}
      />
    );
}

export default icon;