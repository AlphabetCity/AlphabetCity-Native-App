'use strict'
import { combineReducers } from 'redux'
import userLocation from './userLocation'
import item from './item'
import satchel from './satchel'

export default function getRootReducer(nav) {
  return combineReducers({
    nav,
    userLocation,
    item,
    satchel
  })
}
