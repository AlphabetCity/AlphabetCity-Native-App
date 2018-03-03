import axios from 'axios'
import reducer, { loadUserWords } from '../words'
import { createStore } from 'redux'

let testStore
const testUserId = 1
const testWords = [
  {
    id: 1,
    latitude: 40.7047786,
    longitude: -74.0091574,
    word: 'giraffe',
    score: 0,
    createdAt: '2018-02-22T19:56:46.855Z',
    updatedAt: '2018-02-22T19:56:46.855Z',
    userId: 1
  },
  {
    id: 5,
    latitude: 40.7047786,
    longitude: -74.0091574,
    word: 'happy',
    score: 0,
    createdAt: '2018-02-22T19:56:46.856Z',
    updatedAt: '2018-02-22T19:56:46.856Z',
    userId: 1
  }
]

beforeEach(() => {
  testStore = createStore(reducer)
})

describe('Action creators', () => {
  test('has initial expected state', () => {
    expect(testStore.getState()).toEqual([])
  })

  test('getUserWords puts words onto store', () => {
    testStore.dispatch({type: 'GET_USER_WORDS', words: testWords })
    expect(testStore.getState()).toBe(testWords)
  })
})

describe('Thunks', () => {
  // prepare
  const expected = [{ type: 'GET_USER_WORDS', words: testWords }]

  // mock axios methods w/ mocked return values
  axios.get = jest.fn(() => ({ data: testWords }))

  // mock dispatch functions from redux-thunk
  const dispatch = jest.fn()

  test('getSatchel called with correct action creator', async () => {
    await loadUserWords(testUserId)(dispatch)
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0])
  })
})
