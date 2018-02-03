'use strict'
import React from 'react'
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation'
import { Main, AR, Satchel, Auth, UserHome, Highscores } from './components'
import { View } from 'react-native'

const Stack = {
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,
    }
  },
  AR: {
    screen: AR,
    navigationOptions: {
      header: null,
    }
  },
  Auth: {
    screen: Auth,
    navigationOptions: {
      title: 'Login or Sign up'
    }
  }
  ,
  Satchel: {
    screen: Satchel,
    navigationOptions: {
      header: 'Satchel',
    }
  },
  Profile: {
    screen: UserHome,
    navigationOptions: {
      title: 'Profile',
    }
  },
  Highscores: {
    screen: Highscores,
    navigationOptions: {
      title: 'Highscores',
    }
  },
}

let loggedIn = true

const DrawerUserRoutes = {
  Main: {
    screen: StackNavigator(Stack, { initialRouteName: 'Main' }),
    navigationOptions: {
      drawerLabel: 'Main',
      header: null,
    }
  },
  Profile: {
    screen: StackNavigator(Stack, { initialRouteName: 'Profile' }),
    navigationOptions: {
      drawerLabel: 'Profile',
      header: null,
    }
  },
  Highscores: {
    screen: StackNavigator(Stack, { initialRouteName: 'Highscores' }),
    navigationOptions: {
      drawerLabel: 'Highscores',
      header: null,
    }
  },
}

const DrawerGuestRoutes = {
  Login: {
    screen: StackNavigator(Stack, { initialRouteName: 'Main' }),
    navigationOptions: {
      drawerLabel: 'Login',
      header: null
    }
  },
  Signup: {
    screen: StackNavigator(Stack, { initialRouteName: 'Main' }),
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

let DrawerRoutes = loggedIn ? DrawerUserRoutes : DrawerGuestRoutes

const RootNavigator = StackNavigator({
  Drawer: {
    name: 'Drawer',
    screen: DrawerNavigator(DrawerRoutes, { contentComponent: DrawerContent }),
  },
  ...Stack
},
  {
    headerMode: 'none'
  }
)

export default RootNavigator
