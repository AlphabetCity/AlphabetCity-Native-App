import axios from 'axios'
import reducer, { getSatchel, updateLetter } from '../satchel'
import { createStore } from 'redux'

let testStore
const testSatchel = [
  {
    hidden: false,
    id: 97,
    latitude: null,
    longitude: null,
    createdAt: '2018-02-11T05:39:48.801Z',
    updatedAt: '2018-02-11T05:39:48.801Z',
    letterCategoryId: 2,
    userId: 14
  },
  {
    hidden: false,
    id: 94,
    latitude: null,
    longitude: null,
    createdAt: '2018-02-11T05:39:48.800Z',
    updatedAt: '2018-02-11T05:39:48.800Z',
    letterCategoryId: 4,
    userId: 14
  },
  {
    hidden: false,
    id: 96,
    latitude: null,
    longitude: null,
    createdAt: '2018-02-11T05:39:48.801Z',
    updatedAt: '2018-02-11T05:39:48.801Z',
    letterCategoryId: 15,
    userId: 14
  }
]
const testSatchelWithoutLetter = [
  {
    hidden: false,
    id: 97,
    latitude: null,
    longitude: null,
    createdAt: '2018-02-11T05:39:48.801Z',
    updatedAt: '2018-02-11T05:39:48.801Z',
    letterCategoryId: 2,
    userId: 14
  },
  {
    hidden: false,
    id: 94,
    latitude: null,
    longitude: null,
    createdAt: '2018-02-11T05:39:48.800Z',
    updatedAt: '2018-02-11T05:39:48.800Z',
    letterCategoryId: 4,
    userId: 14
  }
]

const testLetter = {
  hidden: false,
  id: 98,
  latitude: null,
  longitude: null,
  createdAt: '2018-02-11T05:39:48.801Z',
  updatedAt: '2018-02-11T05:39:48.801Z',
  letterCategoryId: 18,
  userId: 14
}
const testLetterInSatchel = {
  hidden: false,
  id: 96,
  latitude: null,
  longitude: null,
  createdAt: '2018-02-11T05:39:48.801Z',
  updatedAt: '2018-02-11T05:39:48.801Z',
  letterCategoryId: 15,
  userId: 14
}
const testLetterWithCoords = {
  hidden: false,
  id: 96,
  latitude: 40.1234,
  longitude: -73.1234,
  createdAt: '2018-02-11T05:39:48.801Z',
  updatedAt: '2018-02-11T05:39:48.801Z',
  letterCategoryId: 15,
  userId: 14
}

beforeEach(() => {
  testStore = createStore(reducer)
})

describe('Action creators', () => {
  test('has initial expected state', () => {
    expect(testStore.getState()).toEqual([])
  })

  test('setSatchel puts satchel onto statchel', () => {
    testStore.dispatch({ type: 'SET_SATCHEL', satchel: testSatchel })
    expect(testStore.getState()).toBe(testSatchel)
  })

  test('addLetter adss a letter to the satchel', () => {
    testStore.dispatch({ type: 'ADD_LETTER', letter: testLetter })
    expect(testStore.getState()).toEqual([testLetter])
  })

  test('removeLetter removes a letter from the satchel', () => {
    testStore.dispatch({ type: 'SET_SATCHEL', satchel: testSatchel })
    testStore.dispatch({ type: 'REMOVE_LETTER', letter: testLetterInSatchel })
    expect(testStore.getState()).toEqual(testSatchelWithoutLetter)
  })
})

describe('Thunks', () => {
  // prepare
  const expected = [
    { type: 'SET_SATCHEL', satchel: testSatchel },
    { type: 'ADD_LETTER', letter: testLetter },
    { type: 'REMOVE_LETTER', letter: testLetterWithCoords }
  ]

  // mock axios methods w/ mocked return values
  axios.get = jest.fn(() => ({ data: testSatchel }))
  axios.put = jest.fn(
    (id, changes) =>
      (changes.latitude !== null && changes.longitude !== null
        ? { data: testLetterWithCoords }
        : { data: testLetter })
  )

  // mock dispatch functions from redux-thunk
  const dispatch = jest.fn()

  test('getSatchel called with correct action creator', async () => {
    await getSatchel()(dispatch)
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0])
  })

  test('providing null to updateLetter uses addLetter action creator', async () => {
    const testUserLetterId = 1
    await updateLetter(testUserLetterId, { latitude: null, longitude: null })(
      dispatch
    )
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1])
  })

  test('providing lat/long to updateLetter uses removeLetter action creator', async () => {
    const testUserLetterId = 1
    await updateLetter(testUserLetterId, {
      latitude: 40.1234,
      longitude: -73.1234
    })(dispatch)
    expect(dispatch.mock.calls[2][0]).toEqual(expected[2])
  })
})
