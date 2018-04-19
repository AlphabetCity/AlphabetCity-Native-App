import axios from 'axios'

// Action Type
const SET_HIDDEN_LETTERS = 'SET_HIDDEN_LETTERS'

// Action Creators
const setHiddenLetters = allHiddenLetters => ({ type: SET_HIDDEN_LETTERS, allHiddenLetters })

// Thunks
export const getAllHiddenLetters = () => async dispatch => {
  try {
    const res = await axios.get('http://192.168.0.183:8080/api/letters', {
      params: {
        hidden: 'true'
      }
    })
    const hiddenLetters = await res.data
    dispatch(setHiddenLetters(hiddenLetters))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_HIDDEN_LETTERS:
      return action.allHiddenLetters
    default:
      return state
  }
}

export default reducer
