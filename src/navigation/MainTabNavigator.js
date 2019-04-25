import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import * as  theme  from '../constants/Theme/Theme';

import TabBarIcon from '../components/TabBarIcon/TabBarIcon';
import HomeScreen from '../screens/MainTab/HomeScreen/HomeScreen';
import AddScreen from '../screens/MainTab/AddScreen/AddScreen';
import ProfileScreen from '../screens/MainTab/ProfileScreen/ProfileScreen';
import IdentityScreen from '../screens/MainTab/IdentityScreen/IdentityScreen';
import CriminalRecordScreen from '../screens/MainTab/CriminalRecordScreen/CriminalRecordScreen';
import ForbiddenTravellerScreen from '../screens/MainTab/ForbiddenTraveller/ForbiddenTraveller';
import Details from '../screens/MainTab/DetailsScreen/DetailsScreen';
import ChangePasswordScreen from '../screens/MainTab/ChangePasswordScreen/ChangePasswordScreen';
import AboutScreen from '../screens/MainTab/AboutScreen/AboutScreen';

const HomeStack = createStackNavigator({
  home: HomeScreen,
  criminalRecord: CriminalRecordScreen,
  identity: IdentityScreen,
  forbiddenTraveller: ForbiddenTravellerScreen,
  details: Details
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ Platform.OS === 'ios' ? 'ios-home' : 'md-home' }
    />
  ),
  headerTitleStyle: {
    fontFamily: 'Fjalla-one',
  }
};

const AddStack = createStackNavigator({
  Add : AddScreen,
});

AddStack.navigationOptions = {
  tabBarLabel: 'Add Person',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'md-person' : 'md-person'}
    />
  ),
  headerTitleStyle: {
    fontFamily: 'Fjalla-one',
    textAlignVertical: 'center'
  }
};

const IdentityStack = createStackNavigator({
  identity: IdentityScreen,
  details: Details,
});

IdentityStack.navigationOptions = {
  tabBarLabel: 'Check',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ), 
  headerTitleStyle: {
    fontFamily: 'Fjalla-one',
  }
};

const ProfileStack = createStackNavigator(
  {  
    profile: ProfileScreen,
    about: AboutScreen,
    changePass: ChangePasswordScreen,
  }
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
  headerTitleStyle: {
    fontFamily: 'Fjalla-one',
  }
};

export default createBottomTabNavigator(
  {
    HomeStack,
    AddStack,
    IdentityStack,
    ProfileStack
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.tintColor,
    },
  }
);
