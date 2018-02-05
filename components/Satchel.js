'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListView } from 'react-native-elements'
import { View, Text } from 'react-native'
import { updateLetter } from '../store/satchel'

class Satchel extends Component {
  constructor(props) {
    super(props)

    this.dropItem.bind(this)
  }

  dropItem = (satchelLetter) => {
    this.props.updateLetter(satchelLetter.id, { latitude: this.props.userLocation.latitude, longitude: this.props.userLocation.longitude })
    this.props.navigation.goBack()
  }


  render() {
    return (
      <View>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            this.props.satchel.map((satchelLetter, idx) => (
              <ListItem
                roundAvatar
                avatar={{ uri: 'http://dreamicus.com/data/apple/apple-04.jpg' }}
                key={satchelLetter.id}
                title={(satchelLetter.letterCategory.name).toString()}
                onPress={() => {
                  this.dropItem(satchelLetter)
                }
                }
              />
            ))
          }
        </List>
      </View>
    )
  }
}


const mapStateToProps = ({ user, satchel, userLocation }) => ({ user, satchel, userLocation })
const mapDispatchToProps = ({ updateLetter })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Satchel)
