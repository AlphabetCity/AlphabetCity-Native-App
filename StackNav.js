import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Feather, Entypo } from '@expo/vector-icons'
import { Main, AR } from './components'

const RootNavigator = StackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: null
    },
  AR: {
    screen: AR,
    navigationOptions: {
      header: null
    }
  }
  }
})

export default RootNavigator
