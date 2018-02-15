'use strict'
// Action Type
const SET_LOCATION = 'CREATE_LOCATION'

// Action Creators
export const setUserLocation = location => ({type: SET_LOCATION, location})

// Thunks

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return action.location
    default:
      return state
  }
}

export default reducer
