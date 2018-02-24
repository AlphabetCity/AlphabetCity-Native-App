import axios from 'axios'
import reducer, { setUserLocation } from '../userLocation'
import { createStore } from 'redux'

let testStore
const testUserLocation = {
  latitude: 40.1234,
  longitude: -73.1234
}

beforeEach(() => {
  testStore = createStore(reducer)
})

describe('Action creators', () => {
  test('has initial expected state', () => {
    expect(testStore.getState()).toEqual({})
  })

  test('setUserLocation puts satchel onto statchel', () => {
    testStore.dispatch(setUserLocation(testUserLocation))
    expect(testStore.getState()).toBe(testUserLocation)
  })
})
