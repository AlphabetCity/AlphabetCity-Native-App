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
    userId: 14,
    letterCategory: {
      id: 2,
      name: 'B',
      points: 3,
      modelUrl: null,
      emoji: null,
      createdAt: '2018-02-11T05:12:03.726Z',
      updatedAt: '2018-02-11T05:12:03.726Z'
    }
  },
  {
    hidden: false,
    id: 94,
    latitude: null,
    longitude: null,
    createdAt: '2018-02-11T05:39:48.800Z',
    updatedAt: '2018-02-11T05:39:48.800Z',
    letterCategoryId: 4,
    userId: 14,
    letterCategory: {
      id: 4,
      name: 'D',
      points: 2,
      modelUrl: null,
      emoji: null,
      createdAt: '2018-02-11T05:12:03.729Z',
      updatedAt: '2018-02-11T05:12:03.729Z'
    }
  },
  {
    hidden: false,
    id: 96,
    latitude: null,
    longitude: null,
    createdAt: '2018-02-11T05:39:48.801Z',
    updatedAt: '2018-02-11T05:39:48.801Z',
    letterCategoryId: 15,
    userId: 14,
    letterCategory: {
      id: 15,
      name: 'O',
      points: 1,
      modelUrl: null,
      emoji: null,
      createdAt: '2018-02-11T05:12:03.740Z',
      updatedAt: '2018-02-11T05:12:03.740Z'
    }
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
  userId: 14,
  letterCategory: {
    id: 18,
    name: 'S',
    points: 1,
    modelUrl: null,
    emoji: null,
    createdAt: '2018-02-11T05:12:03.742Z',
    updatedAt: '2018-02-11T05:12:03.742Z'
  }
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

  test('updateSatchel updates a letter in the satchel', () => {
    testStore.dispatch({ type: 'UPDATE_LETTER', letter: testLetter })
    expect(testStore.getState()).toEqual([testLetter])
  })
})

describe('Thunks', () => {
  // prepare
  const expected = [{ type: 'SET_SATCHEL' }, { type: 'UPDATE_LETTER' }]

  // mock axios methods w/ mocked return values
  axios.get = jest.fn(() => testSatchel)
  axios.put = jest.fn(() => testLetter)

  // mock dispatch functions from redux-thunk
  const dispatch = jest.fn()

  test('getSatchel called with correct action creator', async () => {
    await getSatchel()(dispatch)
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0])
  })

  test('getSatchel called with correct action creator', async () => {
    const testUserLetterId = 1
    await updateLetter(testUserLetterId)(dispatch)
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1])
  })
})
