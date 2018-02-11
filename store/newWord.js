
import axios from 'axios'

// Action Type
const GET_NEW_WORD = 'GET_NEW_WORD'
const RESET_NEW_WORD = 'RESET_NEW_WORD'

// Action Creators
const getNewWord = word => ({ type: GET_NEW_WORD, word })
export const resetNewWord = () => ({type: RESET_NEW_WORD})

//thunk

export const createNewWord = (wordDataObj) => async dispatch => {
  try {
    const res = await axios.post('https://alphabetcity.herokuapp.com/api/words', wordDataObj)
    const wordObj = res.data
    dispatch(getNewWord(wordObj))
  } catch (error) {
    alert('That word is not in the dictionary')
  }
}


// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NEW_WORD:
      return action.word
    case RESET_NEW_WORD:
      return {}
    default:
      return state
  }
}

export default reducer
