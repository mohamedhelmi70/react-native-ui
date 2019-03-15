import React from 'react';
import { Icon } from 'expo';

const icon = props => {
    return (
      <Icon.Ionicons
        name={props.name}
        size={props.size}
        style={{top: 5}}
        color={props.inValid ? '#f00' : '#5a6e65'}
      />
    );
}

export default icon;