'use strict'
import { DrawerNavigator } from 'react-navigation'
import { Main, AR } from './components'

const routes = {
  Main: {
    screen: Main,
    navigationOptions: {
      drawerLabel: 'Profiles',
      header: null
    }
  }
}

const ProfileNavigator = DrawerNavigator(routes)

export default ProfileNavigator
