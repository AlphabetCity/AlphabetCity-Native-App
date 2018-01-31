'use strict'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Main, AR, Drawer } from './components'

const routes = {
  Main: {
    screen: Main,
    navigationOptions: {
      header: null
    }
  },
  AR: {
    screen: AR,
    navigationOptions: {
      header: null
    }
  },
  Drawer: {
    screen: Drawer,
    navigationOptions: {
      header: null
    }
  },
}

const AppNavigator = StackNavigator(routes)

export default AppNavigator
