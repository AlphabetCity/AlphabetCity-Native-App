'use strict'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MapView } from 'expo'

const MapOfItems = (props) => {

    return (
      <View style={styles.container}>
        <MapView.Animated
          style={{ flex: 1 }}
          initialRegion={props.initialRegion}
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
        {/* hidden items' positions */}
          {
            props.allHiddenItems.map(item => {
              return (
                <MapView.Circle
                  key={item.id}
                  center={{ latitude: item.latitude, longitude: item.longitude }}
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

export default MapOfItems

