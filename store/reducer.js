'use strict'
import { combineReducers } from 'redux'
import base from './base'

export default function getRootReducer(nav) {
    return combineReducers({
        nav,
        base
    })
}
