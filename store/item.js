import axios from 'axios'

// Action Type
const SET_HIDDEN_ITEMS = 'SET_HIDDEN_ITEMS'

// Action Creators
const setHiddenItems = hiddenItems => ({ type: SET_HIDDEN_ITEMS, hiddenItems })

// Thunks
export const getHiddenItems = () => async dispatch => {
  try {
    const res = await axios.get('https://notseek.herokuapp.com/api/items?hidden=true')
    const hiddenItems = res.data
    dispatch(setHiddenItems(hiddenItems))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_HIDDEN_ITEMS:
      return action.hiddenItems
    default:
      return state
  }
}

export default reducer
