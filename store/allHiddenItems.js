import axios from 'axios'

// Action Type
const SET_HIDDEN_ITEMS = 'SET_HIDDEN_ITEMS'

// Action Creators
const setHiddenItems = allHiddenItems => ({ type: SET_HIDDEN_ITEMS, allHiddenItems })

// Thunks
export const getAllHiddenItems = () => async dispatch => {
  try {
    const res = await axios.get('https://notseek.herokuapp.com/api/items', {
      params: {
        hidden: 'true'
      }
    })
    const hiddenItems = await res.data
    dispatch(setHiddenItems(hiddenItems))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_HIDDEN_ITEMS:
      return action.allHiddenItems
    default:
      return state
  }
}

export default reducer
