import update from 'immutability-helper'

const initialProfileState = {
  sub: '',
  nickname: '',
  name: '',
  picture: '',
}

const SET_PROFILE = 'PROFILE.SET_PROFILE'
const UPDATE_PROFILE = 'PROFILE.UPDATE_PROFILE'

export const Actions = {
  SET_PROFILE,
  UPDATE_PROFILE,
}

export const createActions = {
  setProfile: ({ sub, nickname, name, picture }) => ({
    type: SET_PROFILE,
    payload: {
      sub,
      nickname,
      name,
      picture,
    },
  }),
  updateProfile: ({ sub, nickname, name, picture }) => ({
    type: UPDATE_PROFILE,
    payload: {
      sub,
      nickname,
      name,
      picture,
    },
  }),
}

const reducer = (state = initialProfileState, action) => {
  const { type } = action

  if (type === SET_PROFILE) {
    const { sub, nickname, name, picture } = action.payload
    return update(state, {
      sub: { $set: sub },
      nickname: { $set: nickname },
      name: { $set: name },
      picture: { $set: picture },
    })
  } else if (type === UPDATE_PROFILE) {
    const profile = Object.keys(action.payload)
      .filter(key => action.payload[key] !== void 0)
      .reduce((prev, key) => ({ ...prev, [key]: action.payload[key] }), {})

    return update(state, {
      $set: { ...state, ...profile },
    })
  } else {
    return state
  }
}

export default reducer
