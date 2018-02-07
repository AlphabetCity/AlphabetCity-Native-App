'use strict'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MapView } from 'expo'

const MapOfLetters = (props) => {

  return (
    <View style={styles.container}>
      <MapView.Animated
        style={{ flex: 1 }}
        initialRegion={new MapView.AnimatedRegion(props.initialRegion)}
        showsUserLocation
        pitchEnabled={false}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsTraffic={false}
        legalLabelInsets={{
          top: 50,
          left: -50,
          bottom: 50,
          right: 50
        }}
      >
        {/* hidden letters' positions */}
        {
          props.allHiddenLetters.map(letter => {
            return (
              <MapView.Circle
                key={letter.id}
                center={{ latitude: letter.latitude, longitude: letter.longitude }}
                radius={10 * Math.random() * 3}
                strokeWidth={0.5}
                strokeColor={'rgba(112, 111, 211, 0.0)'}
                fillColor={'rgba(112, 111, 211, 0.1)'}

              />
            )
          })
        }
      </MapView.Animated>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  }
})

export default MapOfLetters

