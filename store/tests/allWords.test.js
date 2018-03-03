import axios from 'axios'
import reducer, { getWords, addWord } from '../allWords'
import { createStore } from 'redux'

let testStore
const testWords = [
  {
    id: 4,
    latitude: 40.7047786,
    longitude: -74.0091574,
    word: 'coding',
    score: 0,
    createdAt: '2018-02-11T05:12:04.385Z',
    updatedAt: '2018-02-11T05:12:04.385Z',
    userId: 2
  },
  {
    id: 7,
    latitude: 40.7047786,
    longitude: -74.0091574,
    word: 'summer',
    score: 0,
    createdAt: '2018-02-11T05:12:04.387Z',
    updatedAt: '2018-02-11T05:12:04.387Z',
    userId: 4
  }
]
const testWord = {
  id: 12,
  latitude: 40.704551,
  longitude: -74.013451,
  word: 'dazzle',
  score: 0,
  createdAt: '2018-02-11T16:11:37.363Z',
  updatedAt: '2018-02-11T16:11:37.363Z',
  userId: 1
}

beforeEach(() => {
  testStore = createStore(reducer)
})

describe('Action creators', () => {
  test('has initial expected state', () => {
    expect(testStore.getState()).toEqual([])
  })

  test('setWords puts words on the store', () => {
    testStore.dispatch({ type: 'SET_WORDS', words: testWords })
    expect(testStore.getState()).toBe(testWords)
  })

  test('addWord puts a single word on the store', () => {
    testStore.dispatch({ type: 'ADD_WORD', word: testWord })
    expect(testStore.getState()).toEqual([testWord])
  })

  test('adding a word word after setting words puts all words on store', () => {
    testStore.dispatch({ type: 'SET_WORDS', words: testWords })
    testStore.dispatch({ type: 'ADD_WORD', word: testWord })

    const testAllWords = testWords
    testAllWords.push(testWord)
    expect(testStore.getState()).toEqual(testAllWords)
  })
})

describe('Thunks', () => {
  // prepare
  const expected = [
    { type: 'SET_WORDS', words: testWords },
    { type: 'ADD_WORD', word: testWord }
  ]

  // mock axios methods w/ mocked return values
  axios.get = jest.fn(() => ({ data: testWords }))
  axios.post = jest.fn(word => ({ data: testWord }))

  // mock dispatch functions from redux-thunk
  const dispatch = jest.fn()

  test('getWords called with correct action creator', async () => {
    await getWords()(dispatch)
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0])
  })

  test('addWord called with correct action creator', async () => {
    await addWord()(dispatch)
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1])
  })
})
