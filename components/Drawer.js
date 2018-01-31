'use strict'
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Button, StatusBar, View, TouchableHighlight, Image, Text, StyleSheet, AppRegistry, ScrollView } from 'react-native';
import { DrawerNavigator, SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux';
import Main from './'

const Drawer = ({ navigation, banner }) => (
  <ScrollView>
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Button
        onPress={() => navigation.navigate('DrawerOpen')}
        title="Open drawer"
      />
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </SafeAreaView>
    <StatusBar barStyle="default" />
  </ScrollView>
);


const MainScreen = ({ navigation }) => (
  <Drawer banner={'Main Screen'} navigation={navigation} />
);

MainScreen.navigationOptions = {
  drawerLabel: 'Main',
  drawerIcon: () => (
    <Feather name="user" size={32} color={'#FFFFFF'} />
  )
};

const DrawerExample = DrawerNavigator(
  {
    Main: {
      path: '/',
      screen: MainScreen,
    },
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    initialRouteName: 'Main',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

export default DrawerExample;
