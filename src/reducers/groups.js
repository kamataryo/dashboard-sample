import update from 'immutability-helper'
import sampleGroups from 'src/samples/groups'

const initialGroupsState = {
  data: [] && sampleGroups, // NOTE: sample
}

const DELETE_GROUP = 'GROUPS.DELETE_GROUP'

export const Actions = {
  DELETE_GROUP,
}

export const createActions = {
  deleteGroup: index => ({ type: DELETE_GROUP, payload: { index } }),
}

export const reducer = (state = initialGroupsState, action) => {
  const { type } = action
  if (type === DELETE_GROUP) {
    const { index } = action.payload
    return update(state, {
      data: { $splice: [[index, 1]] },
    })
  } else {
    return state
  }
}

export default reducer
