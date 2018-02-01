import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { MapView } from 'expo'
import blurryPin from '../assets/blurryPin.png'

const MapOfItems = (props) => {

    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={props.initialRegion}
        >
        {/* current user's position */}
          <MapView.Marker
            coordinate={props.markerPosition}
          />
        {/* hidden items' positions */}
          {
            props.allHiddenItems.map(item => {
              console.log(item)
              return (
                <MapView.Marker
                  key={item.id}
                  coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                  image={blurryPin}
                />
              )
            })
          }
        </MapView>
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

