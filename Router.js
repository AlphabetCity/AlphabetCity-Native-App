'use strict'
import React from 'react'
import { Text, View} from 'react-native'
import { DrawerNavigator, DrawerItems, StyleSheet } from 'react-navigation'
import { Main } from './components'

let loggedIn = true;

const UserRoutes = {
  Main: {
    screen: Main,
    navigationOptions: {
      drawerLabel: 'Main',
      header: null
    }
  },
  Profile: {
    screen: Main,
    navigationOptions: {
      drawerLabel: 'Profile',
      header: null
    }
  },
  HighScores: {
    screen: Main,
    navigationOptions: {
      drawerLabel: 'HighScores',
      header: null
    }
  },
}

const GuestRoutes = {
  Login: {
    screen: Main,
    navigationOptions: {
      drawerLabel: 'Login',
      header: null
    }
  },
  Signup: {
    screen: Main,
    navigationOptions: {
      drawerLabel: 'Signup',
      header: null
    }
  },
}

const styles = {
  header: {
    justifyContent: 'center',
    backgroundColor: '#706FD3',
    height: 240,
    alignItems: 'center',
  },
  picture: {
    backgroundColor: '#2C2C54',
    textAlign: 'center',
    height: 150,
    width: 150,
    borderRadius: 100
  },
}

const DrawerContent = (props) => (
  <View>
    <View style={styles.header}>
      <View style={styles.picture}>
      </View>
    </View>
    <DrawerItems {...props} />
  </View>
)

let routes = loggedIn ? UserRoutes : GuestRoutes;

const ProfileNavigator = DrawerNavigator(routes, {contentComponent: DrawerContent})

export default ProfileNavigator
