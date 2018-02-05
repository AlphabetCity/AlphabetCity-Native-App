'use strict'
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { Location, Permissions } from 'expo'
import { Feather } from '@expo/vector-icons'
import { getAllHiddenLetters } from '../store/allHiddenLetters'
import { MapOfLetters } from './'
import { setUserLocation } from '../store/userLocation'
import { getSatchel, updateLetter } from '../store/satchel'
import { updateUser } from '../store/user'
import geolib from 'geolib'

const { height, width } = Dimensions.get('window')

const LATITUDE_DELTA = 0.002
const LONGITUDE_DELTA = 0.002
const DEFAULT_DISTANCE = Infinity

class Main extends Component {
  constructor(props) {
    super(props)
    this._getLocationAsync()
    this.props.getAllHiddenLetters()
    this.count = 0

    this.state = {
      shortestDistance: DEFAULT_DISTANCE,
      nearestLetter: null
    }
  }

  _pickUpLetter = async () => {
    this.props.updateLetter(this.state.nearestLetter.id, { userId: this.props.user.id, latitude: null, longitude: null })
    this.props.updateUser(this.props.user.id, { score: (this.props.user.score + this.state.nearestLetter.letterCategory.points) })
    await this.props.getAllHiddenLetters()
    this._getShortestDistance()
    this._routeUser('Satchel', () =>
      this.props.getSatchel(this.props.user.id)
    )
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.props.setUserLocation({})
    }

    this.watchId = Location.watchPositionAsync(
      { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 10 },
      position => {
        this.props.setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        this._getShortestDistance()
      },
      () => this.props.setUserLocation({})
    )
  }

  _getShortestDistance = () => {
    if (this.props.allHiddenLetters && this.props.userLocation.latitude) {
      let currentLocLat = this.props.userLocation.latitude
      let currentLocLng = this.props.userLocation.longitude
      let nearestLetter
      let shortestDistance = DEFAULT_DISTANCE
      this.props.allHiddenLetters.forEach(letter => {
        let compareDist = geolib.getDistance(
          { latitude: currentLocLat, longitude: currentLocLng },
          { latitude: letter.latitude, longitude: letter.longitude },
          1,
          1
        )
        if (compareDist < shortestDistance) {
          shortestDistance = compareDist
          nearestLetter = letter
        }
      })
      this.setState({ shortestDistance, nearestLetter })
    }
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
    clearInterval(this._interval)
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
          this.props.allHiddenLetters.length ? (
            <MapOfLetters
              markerPosition={region}
              initialRegion={region}
              allHiddenLetters={this.props.allHiddenLetters}
            />
          ) : null}
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
            this._routeUser('Satchel', () =>
              this.props.getSatchel(this.props.user.id)
            )
          }}
        >
          <Image
            source={require('../assets/packIcon.png')}
            fadeDuration={0}
            style={{ width: 32, height: 32 }}
          />
        </TouchableHighlight>
        {this.state.shortestDistance < 10000000000000000000000000 && (
          <TouchableHighlight
            style={styles.arButton}
            underlayColor={'#474787'}
            activeOpacity={0.9}
            onPress={() => {
              this._routeUser('AR', () => this._pickUpLetter())
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: (width - 40) / 2
              }}
            >
              <Feather
                name="eye"
                size={32}
                color={'#FFFFFF'}
                style={{ flexBasis: 1, flexGrow: 1 }}
              />
              <Text style={{ flexBasis: 1, flexGrow: 1, color: '#FFFFFF' }}>
                Pick up {this.state.nearestLetter.letterCategory.name}?
              </Text>
            </View>
          </TouchableHighlight>
        )}
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
    bottom: 24,
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

const mapState = ({ user, userLocation, allHiddenLetters }) => ({
  user,
  userLocation,
  allHiddenLetters
})

const mapDispatch = { setUserLocation, getSatchel, getAllHiddenLetters, updateLetter, updateUser }

export default connect(mapState, mapDispatch)(Main)
