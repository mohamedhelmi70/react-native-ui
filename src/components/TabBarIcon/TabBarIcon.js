import React from 'react';
import { Icon } from 'expo';

import * as  theme  from '../../constants/Theme/Theme';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? theme.colors.tabIconSelected : theme.colors.tabIconDefault}
      />
    );
  }
}