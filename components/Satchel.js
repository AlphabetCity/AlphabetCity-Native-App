import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListView } from 'react-native-elements'
import { View, Text } from 'react-native'
import { dropItem } from '../store/satchel'

class Satchel extends Component {
  constructor(props) {
    super(props)

    this.dropItem = this.dropItem.bind(this)
  }

  render() {
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
                onPress={() => this.dropItem()}
              />
            ))
          }
        </List>
      </View>
    )
  }
}


const mapStateToProps = ({ satchel, userLocation }) => ({ satchel, userLocation })
const mapDispatchToProps = ({ dropItem })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Satchel)
