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
import { getAllHiddenLetters } from '../store/allHiddenLetters'
import { getWords } from '../store/allWords'
import { MapOfLetters } from './'
import { setUserLocation } from '../store/userLocation'
import { getSatchel, updateLetter } from '../store/satchel'
import { updateUser } from '../store/user'
import geolib from 'geolib'

const { height, width } = Dimensions.get('window')

const LATITUDE_DELTA = 0.002
const LONGITUDE_DELTA = 0.002
const DEFAULT_DISTANCE = Infinity
const AR_RADIUS = 40
const NEARBY_RADIUS = 100

class Main extends Component {
  constructor(props) {
    super(props)

    this.location = Location.getCurrentPositionAsync()
      .then(position => {
        this.props.setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
      .then(() => {
        this.props.getAllHiddenLetters()
        this.props.getWords()
      })
      .then(this._getShortestDistance)
      .then(this._getLocationAsync)
      .catch(console.error)

    this.state = {
      hiddenLettersFetched: false,
      shortestDistance: DEFAULT_DISTANCE,
<<<<<<< HEAD
      dropDownVisible: false,
      nearestLetter: null
=======
      nearestLetter: null,
      nearestWordsMaxDistance: NEARBY_RADIUS,
      nearestWords: []
>>>>>>> 43d2e2d5c8d89e29d7369d7b50044ba660fd4724
    }
  }

  componentDidMount() {
    if (this.props.user.id) this.props.getSatchel(this.props.user.id)
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

  _getShortestDistance = async () => {
    if (this.props.userLocation.latitude && this.props.userLocation.longitude) {
      let currentLocLat = this.props.userLocation.latitude
      let currentLocLng = this.props.userLocation.longitude
      let shortestDistance = DEFAULT_DISTANCE

      if (this.props.allHiddenLetters) {
        let nearestLetter
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

      if (this.props.allWords && this.props.allWords.length) {
        let nearestWords = await this.props.allWords.map(word => {
          let distance =
          geolib.getDistance(
            { latitude: currentLocLat, longitude: currentLocLng },
            { latitude: word.latitude, longitude: word.longitude },
            1,
            1
          )
          word.distance = distance
          return word
          }
        )
        nearestWords = nearestWords.sort((a, b ) => a.distance - b.distance).slice(0, 5).map(word => word.word)
        this.setState({ nearestWords })
      }

    }
  }

  _pickUpLetter = async () => {
    this.props.updateLetter(this.state.nearestLetter.id, {
      userId: this.props.user.id,
      latitude: null,
      longitude: null
    })
    await this.props.getAllHiddenLetters()
    this._getShortestDistance()
    this.props.getSatchel(this.props.user.id)
  }

  _routeUser = (screen, cb, props) => {
    if (this.props.user && this.props.user.id) {
      if (cb) cb()
      this.props.navigation.navigate(screen, props)
    } else {
      this.props.navigation.navigate('Auth')
    }
  }

  componentDidMount() {
    if (this.props.user && this.props.user.id) {
      this.props.getSatchel(this.props.user.id)
    }
    console.log('user', this.props.user.id)
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
          <Image
            source={require('../assets/icons/user.png')}
            fadeDuration={0}
            style={{ width: 32, height: 32 }}
          />
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
            source={require('../assets/icons/packIcon.png')}
            fadeDuration={0}
            style={{ width: 32, height: 32 }}
          />
        </TouchableHighlight>
<<<<<<< HEAD
        <View style={styles.satchelDropDown}>
          <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={{ color: '#706FD3', fontSize: 18 }}>
              Select an Item to Drop
            </Text>
            {this.props.satchel &&
              this.props.satchel.map(letter => (
                <Text key={letter.id}>{letter.letterCategory.name}</Text>
              ))}
          </View>
        </View>
=======
        <TouchableHighlight
          style={[styles.wordsButton, [
            (!this.state.nearestWords || !this.state.nearestWords.length) &&
            {backgroundColor: '#84817a'}
          ]]}
          underlayColor={'#474787'}
          activeOpacity={0.9}
          onPress={() => {
            if (this.state.nearestWords && this.state.nearestWords.length) {
              this.props.navigation.navigate('AR', {
              nearestWords: this.state.nearestWords
              }
            )}
          }}
        >
          <Image
            source={require('../assets/icons/book-open.png')}
            fadeDuration={0}
            style={{ width: 32, height: 32 }}
          />
        </TouchableHighlight>
>>>>>>> 43d2e2d5c8d89e29d7369d7b50044ba660fd4724
        {this.state.shortestDistance < AR_RADIUS && (
          <TouchableHighlight
            style={styles.arButton}
            underlayColor={'#474787'}
            activeOpacity={0.9}
            onPress={async () => {
              await this.props.getSatchel(this.props.user.id)
              if (this.props.satchel.length < 7) {
                this._routeUser('AR', this._pickUpLetter, {
                  nearestLetter: this.state.nearestLetter
                })
              } else {
                alert('Your satchel is currently full. You must drop a letter before picking up another.')
              }
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
              <Image
                source={require('../assets/icons/eye.png')}
                fadeDuration={0}
                style={{ height: 32, width: 32 }}
              />
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
    textAlign: 'center'
  },
  arButton: {
    backgroundColor: '#706FD3',
    height: 60,
    width: width - 40 - 80,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  wordsButton: {
    backgroundColor: '#706fd3',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 24,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  profileButton: {
    backgroundColor: '#706FD3',
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
    shadowOpacity: 0.2
  },
  satchelButton: {
    backgroundColor: '#706FD3',
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
    shadowOpacity: 0.2
  },
  satchelDropDown: {
    backgroundColor: '#FFFFFF',
    height: 300,
    width: width / 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 130,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.1
  }
})

<<<<<<< HEAD
const mapState = ({ user, userLocation, allHiddenLetters, satchel }) => ({
  user,
  userLocation,
  allHiddenLetters,
=======
const mapState = ({ user, userLocation, allHiddenLetters, allWords, satchel }) => ({
  user,
  userLocation,
  allHiddenLetters,
  allWords,
>>>>>>> 43d2e2d5c8d89e29d7369d7b50044ba660fd4724
  satchel
})

const mapDispatch = {
  setUserLocation,
  getSatchel,
  getAllHiddenLetters,
  getWords,
  updateLetter,
  updateUser
}

export default connect(mapState, mapDispatch)(Main)
