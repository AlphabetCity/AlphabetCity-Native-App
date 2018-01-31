'use strict'
import { combineReducers } from 'redux'
import userLocation from './userLocation'

export default function getRootReducer(nav) {
  return combineReducers({
      nav,
      userLocation
  })
}
