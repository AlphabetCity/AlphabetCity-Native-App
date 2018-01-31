import React, { Component } from 'react'
import { View, TouchableHighlight, StyleSheet } from 'react-native'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { getHiddenItems } from '../store/item'


//we'd get the real data from doing an axios call to heroku via the redux store (once server is deployed to heroku)
// const dummyItemsData = [
//   {
//     id: 1,
//     latitude: 40.704761,
//     longitude: -74.009133,
//   },
//   {
//     id: 2,
//     latitude: 40.704966,
//     longitude: -74.009491
//   },
//   {
//     id: 3,
//     latitude: 40.705976,
//     longitude: -74.004421
//   },
//   {
//     id: 4,
//     latitude: 40.708976,
//     longitude: -74.001421
//   },
//   {
//     id: 5,
//     latitude: 40.708086,
//     longitude: -74.001521
//   },
//   {
//     id: 6,
//     latitude: 40.708086,
//     longitude: -73.900521
//   },
//   {
//     id: 7,
//     latitude: 40.708986,
//     longitude: -73.921928
//   }
// ]


class MapOfItems extends Component {

  componentDidMount() {
    this.props.getHiddenItems()
  }

  render() {
    console.log('PROPS', this.props)
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.props.initialRegion}
        >
        {/* current user's position */}
          <MapView.Marker
            coordinate={this.props.markerPosition}
          />
        {/* hidden items' positions */}
          {
            this.props.hiddenItems.map(item => {
              return (
                <MapView.Marker
                  key={item.id}
                  coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                  image={require('../assets/blurryPin.png')}
                />
              )
            })
          }
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hiddenItems: state.item
  }
}

const mapDispatchToProps = { getHiddenItems };


export default connect(mapStateToProps, mapDispatchToProps)(MapOfItems);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  }
})
