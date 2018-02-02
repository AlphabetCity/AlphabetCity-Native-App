import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListView } from 'react-native-elements'
import { View, Text } from 'react-native'
import { dropItem } from '../store/satchel'

class Satchel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("I am the REAL satchel", this.props.satchel)
    return (
      <View>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            this.props.satchel.map((satchelItem, idx) => (
              <ListItem
                roundAvatar
                avatar={{ uri: 'http://dreamicus.com/data/apple/apple-04.jpg' }}
                key={satchelItem.id}
                title={(satchelItem.itemId).toString()}
                onPress={() => this.props.dropItem(this.props.user.id, satchelItem.id, { latitude: this.props.user.latitude, longitude: this.props.user.longitude })}
              />
            ))
          }
        </List>
      </View>
    )
  }
}


const mapStateToProps = ({ user, satchel, userLocation }) => ({ user, satchel, userLocation })
const mapDispatchToProps = ({ dropItem })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Satchel)
