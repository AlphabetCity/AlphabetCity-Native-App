import axios from 'axios'

// Action Type
const SET_SATCHEL = 'SET_SATCHEL'

// Action Creators
const setSatchel = satchel => ({ type: SET_SATCHEL, satchel })

// Thunks
export const getSatchel = () => async dispatch => {
  try {
    const res = await axios.get('https://notseek.herokuapp.com/api/users/2/items')
    const satchel = await res.data
    dispatch(setSatchel(satchel))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_SATCHEL:
      return action.satchel
    default:
      return state
  }
}

export default reducer
