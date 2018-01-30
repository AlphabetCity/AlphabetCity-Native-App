'use strict'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import getRootReducer from './reducer'
import AppNavigator from '../Router'

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state)
  return newState || state
}

const store = createStore(
  getRootReducer(navReducer),
  undefined,
  applyMiddleware(thunk)
)

export default store
export * from './base'
