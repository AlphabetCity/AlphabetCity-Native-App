import React, { Component } from 'react'
import { View, TouchableHighlight, StyleSheet } from 'react-native'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { fetchItemsInWorld } from '../store/items'


//we'd get the real data from doing an axios call to heroku via the redux store (once server is deployed to heroku)
const dummyItemsData = [
  {
    id: 1,
    latitude: 40.704761,
    longitude: -74.009133,
  },
  {
    id: 2,
    latitude: 40.704966,
    longitude: -74.009491
  },
  {
    id: 3,
    latitude: 40.705976,
    longitude: -74.004421
  },
  {
    id: 4,
    latitude: 40.708976,
    longitude: -74.001421
  },
  {
    id: 5,
    latitude: 40.708086,
    longitude: -74.001521
  },
  {
    id: 6,
    latitude: 40.708086,
    longitude: -73.900521
  },
  {
    id: 7,
    latitude: 40.708986,
    longitude: -73.921928
  }
]


class MapOfItems extends Component {
  constructor(props) {
    super(props);

    //this would change based on users location... but we'd probably be getting that from the reduz store...?
    this.state = {
      latitude: 40.704761,
      longitude: -74.009133,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  }

  componentDidMount() {
    this.props.fetchItemsInWorld()
  }

  render() {

    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
          }}
        >
        {
            dummyItemsData.map(item => {
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

const mapDispatchToProps = { fetchItemsInWorld };

const mapStateToProps = state => ({
  itemsInWorld: state.itemsInWorld,
});


export default connect(mapStateToProps, mapDispatchToProps)(MapOfItems);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  }
})
