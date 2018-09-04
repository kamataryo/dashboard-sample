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
const DELETE_MAP = 'MAPS.DELETE_MAP'

export const Actions = {
  ADD_MAP,
  DELETE_MAP,
}

export const createActions = {
  deleteMap: index => ({ type: DELETE_MAP, payload: { index } }),
  addMap: map => ({ type: ADD_MAP, payload: { map } }),
}

export const reducer = (state = initialMapsState, action) => {
  const { type } = action
  if (type === ADD_MAP) {
    const { map } = action.payload
    return update(state, {
      data: { $push: [map] },
      styles: { [map.id]: { $set: {} } },
    })
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
