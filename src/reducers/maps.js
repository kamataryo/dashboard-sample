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

const ADD_MAP = 'MAPS.ADD_MAP'
const UPDATE_MAP = 'MAPS.UPDATE_MAP'
const DELETE_MAP = 'MAPS.DELETE_MAP'

export const Actions = {
  ADD_MAP,
  UPDATE_MAP,
  DELETE_MAP,
}

export const createActions = {
  addMap: map => ({ type: ADD_MAP, payload: { map } }),
  updateMap: (index, { map, style } = {}) => {
    if ((map || {}).id) {
      throw 'ID should not be altered.'
    } else {
      return {
        type: UPDATE_MAP,
        payload: { index, map, style },
      }
    }
  },
  deleteMap: index => ({ type: DELETE_MAP, payload: { index } }),
}

export const reducer = (state = initialMapsState, action) => {
  const { type } = action
  if (type === ADD_MAP) {
    const { map } = action.payload
    return update(state, {
      data: { $push: [map] },
      styles: { [map.id]: { $set: {} } },
    })
  } else if (type === UPDATE_MAP) {
    const {
      payload: { index, map, style },
    } = action
    const { id } = state.data[index]

    const $updator = {}
    map && ($updator.data = { [index]: { $merge: map } })
    style && ($updator.styles = { [id]: { $set: style } })

    return update(state, $updator)
  } else if (type === DELETE_MAP) {
    const { index } = action.payload
    const { id } = state.data[index]
    return update(state, {
      data: { $splice: [[index, 1]] },
      styles: { [id]: { $set: void 0 } },
    })
  } else {
    return state
  }
}

export default reducer
