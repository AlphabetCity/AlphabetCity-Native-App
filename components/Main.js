'use strict'
import React from 'react'
import { View, TouchableHighlight, StyleSheet} from 'react-native'
import { StackNavigator, DrawerNavigator  } from 'react-navigation'
import { connect } from 'react-redux'
import { MapView } from 'expo'

// import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { Feather, EvilIcons } from '@expo/vector-icons';

const Main = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TouchableHighlight
        style={styles.profileButton}
        underlayColor={'#474787'}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Drawer')}
        >
        <Feather name="user" size={32} color={'#FFFFFF'} />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.satchelButton}
        underlayColor={'#474787'}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('AR')}>
        <Feather name="box" size={32} color={'#FFFFFF'} />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.arButton}
        underlayColor={'#474787'}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('AR')}>
        <Feather name="eye" size={32} color={'#FFFFFF'} />
      </TouchableHighlight>
    </View>
  )
}

// Main.navigationOptions = {
//   drawerLabel: 'Main',
//   drawerIcon: () => (
//     <Feather name="user" size={32} color={'#FFFFFF'} />
//   ),
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B3B98',
    textAlign: 'center',
  },
  arButton: {
    backgroundColor: '#706fd3',
    height: 60,
    width: 140,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 50
  },
  profileButton: {
    backgroundColor: '#706fd3',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    top: 50
  },
  satchelButton: {
    backgroundColor: '#706fd3',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 50
  }
})

// const layerStyles = MapboxGL.StyleSheet.create({
//   buildings: {
//     fillColor: MapboxGL.StyleSheet.camera({ 10: 'blue', 20: 'green' }),
//     fillOpacity: 0.84
//   }
// });

export default connect()(Main)

