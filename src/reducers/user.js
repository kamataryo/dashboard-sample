import update from 'immutability-helper'

const initialState = {
  id: '', // sub
  name: '',
}

const SET = 'USER.SET'

export const Actions = {
  SET,
}

export const createActions = {
  set: user => ({ type: SET, payload: { user } }),
}

export const reducer = (state = initialState, action) => {
  const { type } = action
  if (type === SET) {
    return update(state, { $set: action.payload.user })
  } else {
    return state
  }
}

export default reducer
