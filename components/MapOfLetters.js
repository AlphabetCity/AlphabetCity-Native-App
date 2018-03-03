'use strict'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MapView } from 'expo'

import { computeDestinationPoint } from 'geolib'

const RADIUS_SCALE = 5
const FILL_SCALE = 0.2
const OPACITY_REDUCTION = 20

const MapOfLetters = props => {
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
        onPress={props.hideDropDown}
      >
        {/* Hidden Letters' Positions
            Center: offset a random amount in some direction so letter's
              location appears random within the circle
            Radius: equal to the point value of the letter in meters scaled
              by some constant
            Fill Opacity: Reduce opacity from 1 based on point value (lighter =
              more points, darker = fewer points), scaled by a constant
        */}
        {props.allHiddenLetters.map(letter => {
          return (
            <MapView.Circle
              key={letter.id}
              center={computeDestinationPoint(
                {
                  lat: letter.latitude,
                  lon: letter.longitude
                },
                letter.displacementDistance * RADIUS_SCALE,
                letter.displacementBearing
              )}
              radius={letter.letterCategory.points * RADIUS_SCALE}
              strokeColor={'rgba(112, 111, 211, 0)'}
              fillColor={`rgba(112, 111, 211, ${(1 -
                letter.letterCategory.points / OPACITY_REDUCTION) *
                FILL_SCALE})`}
            />
          )
        })}
      </MapView.Animated>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})

export default MapOfLetters
