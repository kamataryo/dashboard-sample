import update from 'immutability-helper'
import sampleMaps from 'src/samples/maps'
import style from 'src/samples/style.json'

const initialMapsState = {
  data: [] && sampleMaps, // NOTE: sample
  styles:
    {} &&
    sampleMaps
      .map(map => map.id)
      .reduce((prev, id) => ({ ...prev, [id]: style }), {}), // key is map id
}

export const Actions = {}

export const createActions = {}

const reducer = (state = initialMapsState, action) => state

export default reducer
