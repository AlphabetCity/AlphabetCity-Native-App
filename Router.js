'use strict'
import { StackNavigator } from 'react-navigation'
import { Main, AR, Settings } from './components'

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
  Settings: {
    screen: Settings,
    navigationOptions: {
      header: null
    }
  },
}

const AppNavigator = StackNavigator(routes)

export default AppNavigator
