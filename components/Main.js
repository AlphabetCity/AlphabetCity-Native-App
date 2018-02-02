'use strict'
import React, { Component } from 'react'
import { View, Image, TouchableHighlight, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Location, Permissions } from 'expo'
import { Feather } from '@expo/vector-icons'
import { getAllHiddenItems } from '../store/allHiddenItems'

import { MapOfItems } from './'
import { setUserLocation } from '../store/userLocation'
import { getSatchel } from '../store/satchel'

const { height, width } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.002
const LONGITUDE_DELTA = 0.002

class Main extends Component {
  constructor(props) {
    super(props)
    this._getLocationAsync()
    this.props.getAllHiddenItems()
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.props.setUserLocation({})
    }

    this.watchId = Location.watchPositionAsync(
      { enableHighAccuracy: true, timeInterval: 30000, distanceInterval: 10 },
      position => {
        this.props.setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      () => this.props.setUserLocation({})
    )
  }

  _routeUser = (screen, cb) => {
    if (this.props.user && this.props.user.id) {
      if (cb) cb()
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
          this.props.userLocation.longitude &&
          this.props.allHiddenItems.length ? (
            <MapOfItems
              markerPosition={region}
              initialRegion={region}
              allHiddenItems={this.props.allHiddenItems}
            />
          ) :
          null
        }
        <TouchableHighlight
          style={styles.profileButton}
          underlayColor={'#474787'}
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        >
          <Feather name="user" size={32} color={'#FFFFFF'} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.satchelButton}
          underlayColor={'#474787'}
          activeOpacity={0.9}
          onPress={() => {
            this._routeUser('Satchel', () => this.props.getSatchel(this.props.user.id))
          }}
        >
          <Image
            source={require('../assets/packIcon.png')}
            fadeDuration={0}
            style={{width: 32, height: 32}}
          />
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
    width: width - 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 50,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'black',
    shadowOpacity: 0.4,
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
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'black',
    shadowOpacity: 0.4,
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
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'black',
    shadowOpacity: 0.4,
  }
})

const mapState = ({ user, userLocation, allHiddenItems }) => ({ user, userLocation, allHiddenItems })

const mapDispatch = ({ setUserLocation, getSatchel, getAllHiddenItems })

export default connect(mapState, mapDispatch)(Main)
