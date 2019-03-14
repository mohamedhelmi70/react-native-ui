import React from 'react';
import { Text } from 'react-native';

export const monoText = (props) => (
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
