'use strict'
import React from 'react'
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation'
import { Main, ARContainer, Satchel, Auth, UserHome, Highscores, UserWords, Update, SortableHand } from './components'
import { View, Button, Image } from 'react-native'

const Stack = {
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,
    }
  },
  AR: {
    screen: ARContainer,
    navigationOptions: {
      header: null,
    }
  },
  Auth: {
    screen: Auth,
    navigationOptions: {
      title: 'Login or Sign up',
      headerTintColor: '#706FD3',
    }
  }
  ,
  Satchel: {
    screen: Satchel,
    navigationOptions: {
      title: 'Satchel'
    }
  },
  Profile: {
    screen: UserHome,
    navigationOptions: ({navigation}) => ({
      title: 'Profile',
      headerTintColor: '#706FD3',
      headerLeft: (
        <Button
          title="Map"
          color="#706FD3"
          navigation={navigation}
          onPress={
            () => {navigation.navigate('Main')}
          }
        />
      )
    }),
  },
  Highscores: {
    screen: Highscores,
    navigationOptions: {
      title: 'High Scores',
      headerTintColor: '#706FD3',
    }
  },
  SortableHand: {
    screen: SortableHand,
    navigationOptions: {
      title: 'Make a Word',
      headerTintColor: '#706FD3',
    }
  },
  UserWords: {
    screen: UserWords,
    navigationOptions: {
      title: 'My Words',
      headerTintColor: '#706FD3',
    }
  },
  UpdateUser: {
    screen: Update,
    navigationOptions: {
      title: 'Update Profile',
      headerTintColor: '#706FD3',
    }
  },
}

let loggedIn = true

const DrawerUserRoutes = {
  Main: {
    screen: StackNavigator(Stack, { initialRouteName: 'Main' }),
    navigationOptions: {
      drawerLabel: 'Map',
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
      drawerLabel: 'High Scores',
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
    backgroundColor: '#2C2C54',
    height: 240,
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
  },
}

const DrawerContent = (props) => (
  <View
    style={{
      flex: 1,
    }}>
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={require('./assets/icons/app-icon-transparent.png')}
      />
    </View>
    <DrawerItems {...props}
      activeTintColor='#706fd3'
      inactiveTintColor='#40407a'
    />
  </View>
)

let DrawerRoutes = loggedIn ? DrawerUserRoutes : DrawerGuestRoutes

const RootNavigator = StackNavigator({
  Drawer: {
    name: 'Drawer',
    screen: DrawerNavigator(DrawerRoutes,
      {
        contentComponent: DrawerContent,
      }),
  },
  ...Stack
},
  {
    headerMode: 'none'
  }
)

export default RootNavigator
