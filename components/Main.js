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
import { MapOfLetters, ProfileButton } from './'
import { setUserLocation } from '../store/userLocation'
import { getSatchel, updateLetter } from '../store/satchel'
import { updateUser } from '../store/user'
import geolib from 'geolib'

// Screen dimensions for responsive styling
const { height, width } = Dimensions.get('window')

// Constants
// How much of the map to display
const LATITUDE_DELTA = 0.002
const LONGITUDE_DELTA = 0.002

// How often to update location
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
    const { id } = this.props.user
    if (id) this.props.getSatchel(id)
  }

  _getInitialLocationAsync = async () => {
    try {
      // Get iOS permissions to track Location
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        this.props.setUserLocation({})
      }

      // Get the user's location upon opening the app
      // and set initial state and props
      const position = await Location.getCurrentPositionAsync()
      this.props.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
      this.props.getAllHiddenLetters()
      await this.props.getWords()

      // Find nearest letters and words to track
      await this._getShortestDistance()

      // Begin watching location
      await this._watchLocationAsync()
    } catch (error) {
      console.error(error)
    }
  }

  _watchLocationAsync = async () => {
    this.watchId = Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: TIME_INTERVAL,
        distanceInterval: DISTANCE_INTERVAL
      },
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

      // Find nearest letter and its distance from user
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

      // Find five closest words
      if (this.props.allWords && this.props.allWords.length) {
        let nearestWords = await this.props.allWords.map(word => {
          let distance = geolib.getDistance(
            { latitude: currentLocLat, longitude: currentLocLng },
            { latitude: word.latitude, longitude: word.longitude },
            1,
            1
          )
          word.distance = distance
          return word
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
            hideDropDown={() => this.setState({ dropDownVisible: false })}
          />
        ) : null}
        <ProfileButton />
        <TouchableHighlight
          style={styles.satchelButton}
          underlayColor={'#474787'}
          activeOpacity={0.9}
          onPress={() => {
            if (this.props.user && this.props.user.id) {
              this.setState({ dropDownVisible: !this.state.dropDownVisible })
            } else {
              this.props.navigation.navigate('Auth')
            }
          }}
        >
          <Image
            source={require('../assets/icons/packIcon.png')}
            fadeDuration={0}
            style={{ width: 32, height: 32 }}
          />
        </TouchableHighlight>
        {this.state.dropDownVisible &&
          this.props.satchel && (
            <View
              style={[
                styles.satchelDropDown,
                {
                  height: this.props.satchel.length
                    ? Math.ceil(this.props.satchel.length / 2) * 58.7 + 166.8
                    : 215
                }
              ]}
            >
              <View style={{ flex: 1, marginTop: 30 }}>
                {Boolean(this.props.satchel.length) && (
                  <Text style={styles.dropHeader}>Drop a Letter</Text>
                )}
                <View style={styles.letters}>
                  {this.props.satchel.length ? (
                    this.props.satchel.map(letter => (
                      <TouchableHighlight
                        key={letter.id}
                        style={{
                          flexBasis: 60,
                          flexGrow: 0,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        underlayColor={'#FFFFFF'}
                        onPress={async () => {
                          await this.props.updateLetter(letter.id, {
                            latitude: this.props.userLocation.latitude,
                            longitude: this.props.userLocation.longitude
                          })
                          await this.props.getSatchel(this.props.user.id)
                        }}
                      >
                        <View
                          style={{
                            width: 50,
                            marginLeft: 25,
                            flexDirection: 'row'
                          }}
                        >
                          <Text style={styles.letterTile}>
                            {letter.letterCategory.name}
                          </Text>
                          <Text style={styles.letterSub}>
                            {letter.letterCategory.points}
                          </Text>
                        </View>
                      </TouchableHighlight>
                    ))
                  ) : (
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#706FD3',
                          textAlign: 'center',
                          marginRight: 20
                        }}
                      >
                        You're out of letters! Walk around the world to find
                        more.
                      </Text>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    borderBottomColor: '#706FD3',
                    opacity: 0.5,
                    borderBottomWidth: 1
                  }}
                />
                <TouchableHighlight
                  style={styles.makeAWordLink}
                  underlayColor={'#474787'}
                  activeOpacity={0.9}
                  onPress={() => {
                    this._routeUser('SortableHand')
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 18,
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
                    Make a Word
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          )}
        <TouchableHighlight
          style={[
            styles.wordsButton,
            [
              (!this.state.nearestWords || !this.state.nearestWords.length) && {
                backgroundColor: '#747d8c'
              }
            ]
          ]}
          underlayColor={'#474787'}
          activeOpacity={0.9}
          onPress={() => {
            if (this.state.nearestWords && this.state.nearestWords.length) {
              this.props.navigation.navigate('AR', {
                nearestWords: this.state.nearestWords
              })
            }
          }}
        >
          <Image
            source={require('../assets/icons/book-open.png')}
            fadeDuration={0}
            style={{ width: 32, height: 32 }}
          />
        </TouchableHighlight>
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
                alert(
                  'Your satchel is currently full. You must drop a letter before picking up another.'
                )
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
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.4
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
    width: width / 2,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    top: 130,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.1
  },
  dropHeader: {
    color: '#706FD3',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 20
  },
  makeAWordLink: {
    backgroundColor: '#706FD3',
    borderRadius: 20,
    width: width / 2 - 40,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  letters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginBottom: 20
  },
  letterTile: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#706FD3',
    paddingLeft: 10
  },
  letterSub: {
    fontSize: 15,
    color: '#706FD3',
    alignSelf: 'flex-end',
    marginRight: 10
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
