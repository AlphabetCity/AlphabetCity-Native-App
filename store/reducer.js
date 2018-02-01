'use strict'
import { combineReducers } from 'redux'
import userLocation from './userLocation'
import item from './item'

export default function getRootReducer(nav) {
  return combineReducers({
      nav,
    userLocation,
      item
  })
}
