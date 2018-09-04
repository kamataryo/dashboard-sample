import update from 'immutability-helper'
import sampleGroups from 'src/samples/groups'

const initialGroupsState = {
  data: [] && sampleGroups, // NOTE: sample
}

const ADD_GROUP = 'GROUPS.ADD_GROUP'
const DELETE_GROUP = 'GROUPS.DELETE_GROUP'

export const Actions = {
  ADD_GROUP,
  DELETE_GROUP,
}

export const createActions = {
  addGroup: group => ({ type: ADD_GROUP, payload: { group } }),
  deleteGroup: index => ({ type: DELETE_GROUP, payload: { index } }),
}

export const reducer = (state = initialGroupsState, action) => {
  const { type } = action
  if (type === ADD_GROUP) {
    const { group } = action.payload
    return update(state, {
      data: { $push: [group] },
    })
  } else if (type === DELETE_GROUP) {
    const { index } = action.payload
    return update(state, {
      data: { $splice: [[index, 1]] },
    })
  } else {
    return state
  }
}

export default reducer
