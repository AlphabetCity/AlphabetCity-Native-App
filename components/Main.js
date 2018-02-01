'use strict'
import React, { Component } from 'react'
import { View, TouchableHighlight, StyleSheet, Dimensions} from 'react-native'
import { connect } from 'react-redux'
import { Location, Permissions } from 'expo'
import { Feather } from '@expo/vector-icons'

import { MapOfItems } from './'
import { setUserLocation } from '../store/userLocation'

const { height, width } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.150
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Main extends Component {
  componentWillMount() {
    this._getLocationAsync()
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.props.setUserLocation({})
    }

    this.watchId = Location.watchPositionAsync(
      { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1 },
      position => {
        this.props.setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      () => this.props.setUserLocation({})
    )
  }

  _routeUser = (screen) => {
    if (Object.keys(this.props.user).length) {
      this.props.navigation.navigate(screen)
    } else {
      this.props.navigation.navigate('Auth')
    }
  }

  componentWillUnmount() {
    delete this.watchId
  }

  render() {
    let region = {
      latitude: this.props.userLocation.latitude,
      longitude: this.props.userLocation.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }

    return (
      <View style={styles.container}>
        {this.props.userLocation.latitude &&
         this.props.userLocation.longitude && (
          <MapOfItems
            markerPosition={region}
            initialRegion={region}
          />

        )}
        <TouchableHighlight
          style={styles.profileButton}
          underlayColor={'#474787'}
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate('AR')}
        >
          <Feather name="user" size={32} color={'#FFFFFF'} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.satchelButton}
          underlayColor={'#474787'}
          activeOpacity={0.9}
          onPress={() => {}}
        >
          <Feather name="box" size={32} color={'#FFFFFF'} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.arButton}
          underlayColor={'#474787'}
          activeOpacity={0.9}
          onPress={() => this._routeUser('AR')}
        >
          <Feather name="eye" size={32} color={'#FFFFFF'} />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B3B98',
    textAlign: 'center'
  },
  arButton: {
    backgroundColor: '#706fd3',
    height: 60,
    width: width - 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.4
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
    top: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.4
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
    top: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.4
  }
})

const mapState = ({ user, userLocation }) => ({ user, userLocation })
const mapDispatch = ({ setUserLocation })

export default connect(mapState, mapDispatch)(Main)
