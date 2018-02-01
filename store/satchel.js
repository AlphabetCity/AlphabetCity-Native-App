import axios from 'axios'

// Action Type
const SET_SATCHEL = 'SET_SATCHEL'
const DROP_ITEM = 'DROP_ITEM'

// Action Creators
const setSatchel = satchel => ({ type: SET_SATCHEL, satchel })
const updateItem = item => ({ type: DROP_ITEM, item })

// Thunks
export const getSatchel = () => async dispatch => {
  try {
    const res = await axios.get('https://notseek.herokuapp.com/api/users/2/items', {
      params: {
        hidden: 'false'
      }
    })
    const satchel = res.data
    dispatch(setSatchel(satchel))
  } catch (error) {
    console.error(error)
  }
}

export const dropItem = (userId, itemId) => async dispatch => {
  try {
    const res = await axios.put(`https://notseek.herokuapp.com/api/${userID}/items/${itemId}`, {
    })
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
