// Action Type
const SET_HIDDEN_ITEMS = 'SET_HIDDEN_ITEMS'

// Action Creators
const setHiddenItems = (hiddenItems) => ({ type: SET_HIDDEN_ITEMS, hiddenItems })

// Thunks
export const getHiddenItems = () => { };

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
