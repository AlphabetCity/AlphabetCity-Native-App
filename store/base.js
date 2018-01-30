// ACTION TYPES
const GET_BASE = 'GET_BASE'

// ACTION CREATORS
export const getBase = base => ({type: GET_BASE, base})

// REDUCER
const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BASE:
      return action.base
    default:
      return state
  }
}

export default reducer
