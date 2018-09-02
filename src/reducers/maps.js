import update from 'immutability-helper'
import sampleMaps from 'src/../../samples/maps'

const initialMapsState = {
  data: [] && sampleMaps, // NOTE: sample
}

export const Actions = {}

export const createActions = {}

const reducer = (state = initialMapsState, action) => state

export default reducer
