'use strict'
import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { Location, Permissions } from 'expo'
import { getAllHiddenLetters } from '../store/allHiddenLetters'
import { getWords } from '../store/allWords'
import {
  MapOfLetters,
  ProfileButton,
  SatchelButton,
  Satchel,
  WordsButton,
  LetterButton
} from './'
import { updateUser } from '../store/user'
import { setUserLocation } from '../store/userLocation'
import { getSatchel, updateLetter } from '../store/satchel'
import geolib from 'geolib'

// Constants
// How often to update user location
const TIME_INTERVAL = 1000
const DISTANCE_INTERVAL = 10

const DEFAULT_DISTANCE = Infinity // Comparator for shortestDistance
const AR_RADIUS = 40 // Meter proximity to letter to render AR button

class Main extends Component {
  constructor(props) {
    super(props)

    this._getInitialLocationAsync()

    this.state = {
      shortestDistance: DEFAULT_DISTANCE,
      dropDownVisible: false,
      nearestLetter: null,
      nearestWords: []
    }
  }

  componentDidMount() {
    const { user, getSatchel } = this.props
    if (user.id) getSatchel(user.id)
  }

  _getInitialLocationAsync = async () => {
    const { setUserLocation, getAllHiddenLetters, getWords } = this.props
    try {
      // Get iOS permissions to track Location
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') setUserLocation({})

      // Get the user's location upon opening the app
      // and set initial state and props
      const position = await Location.getCurrentPositionAsync()
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
      getAllHiddenLetters()
      await getWords()

      // Find nearest letters and words to track
      await this._getShortestDistance()

      // Begin watching location
      await this._watchLocationAsync()
    } catch (error) {
      console.error(error)
    }
  }

  _watchLocationAsync = async () => {
    const { setUserLocation } = this.props
    this.watchId = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: TIME_INTERVAL,
        distanceInterval: DISTANCE_INTERVAL
      },
      position => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        this._getShortestDistance()
      },
      () => setUserLocation({})
    )
  }

  _getShortestDistance = async () => {
    const { userLocation, allHiddenLetters, allWords } = this.props
    if (userLocation.latitude && userLocation.longitude) {
      let currentLocLat = userLocation.latitude
      let currentLocLng = userLocation.longitude
      let shortestDistance = DEFAULT_DISTANCE

      // Find nearest letter and its distance from user
      if (allHiddenLetters) {
        let nearestLetter
        allHiddenLetters.forEach(letter => {
          if (letter.latitude && letter.longitude) {
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
          }
        })
        this.setState({ shortestDistance, nearestLetter })
      }

      // Find five closest words
      if (allWords && allWords.length) {
        let nearestWords = await allWords.map(word => {
          if (word.latitude && word.longitude) {
            let distance = geolib.getDistance(
              { latitude: currentLocLat, longitude: currentLocLng },
              { latitude: word.latitude, longitude: word.longitude },
              1,
              1
            )
            word.distance = distance
            return word
          } else {
            return Infinity
          }
        })
        nearestWords = nearestWords
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5)
          .map(word => word.word)
        this.setState({ nearestWords })
      }
    }
  }

  _pickUpLetter = async () => {
    const { user, updateLetter, getAllHiddenLetters } = this.props
    await updateLetter(this.state.nearestLetter.id, {
      userId: user.id,
      latitude: null,
      longitude: null
    })
    await getAllHiddenLetters()
    this._getShortestDistance()
  }

  _routeUser = (screen, cb, props) => {
    const { user, navigation } = this.props
    if (user && user.id) {
      if (cb) cb()
      navigation.navigate(screen, props)
    } else {
      navigation.navigate('Auth')
    }
  }

  _toggleDropdown = (user, navigation) => {
    if (user && user.id) {
      this.setState({ dropDownVisible: !this.state.dropDownVisible })
    } else {
      navigation.navigate('Auth')
    }
  }

  componentWillUnmount() {
    delete this.watchId
  }

  render() {
    const { user, userLocation, satchel, navigation } = this.props
    return (
      <View style={styles.container}>
        {/* Map View */}
        {userLocation.latitude && userLocation.longitude ? (
          <MapOfLetters
            hideDropDown={() => this.setState({ dropDownVisible: false })}
          />
        ) : (
          <Image source={require('../assets/icons/loading-icon.png')} />
        )}
        {/* Profile Drawer View Button */}
        <ProfileButton navigation={navigation} />
        {/* Satchel Button and Dropdown */}
        <SatchelButton onPress={() => this._toggleDropdown(user, navigation)} />
        {this.state.dropDownVisible &&
          satchel && (
            <Satchel
              makeAWord={() => {
                this._routeUser('SortableHand')
              }}
            />
          )}
        {/* AR Words Button */}
        <WordsButton
          navigation={navigation}
          nearestWords={this.state.nearestWords}
        />
        {/* AR Pick Up Letter Button */}
        {this.state.shortestDistance < AR_RADIUS &&
          user.id && (
            <LetterButton
              onPress={() => {
                satchel.length < 7
                  ? this._routeUser('AR', this._pickUpLetter, {
                      nearestLetter: this.state.nearestLetter
                    })
                  : alert(
                      'Your satchel is currently full. You must drop a ' +
                        'letter before picking up another.'
                    )
              }}
            />
          )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})

const mapState = ({
  user,
  userLocation,
  allHiddenLetters,
  allWords,
  satchel
}) => ({
  user,
  userLocation,
  allHiddenLetters,
  allWords,
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
