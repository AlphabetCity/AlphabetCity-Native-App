import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { getAllHiddenItems } from '../store/allHiddenItems'


class MapOfItems extends Component {

  componentDidMount() {
    this.props.getAllHiddenItems()
  }

  render() {
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
            this.props.allHiddenItems.map(item => {
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
    )
  }
}

const mapStateToProps = state => ({ allHiddenItems: state.allHiddenItems })

const mapDispatchToProps = { getAllHiddenItems }


export default connect(mapStateToProps, mapDispatchToProps)(MapOfItems)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  }
})
