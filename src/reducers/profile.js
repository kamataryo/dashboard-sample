import update from 'immutability-helper'

const initialProfileState = {
  sub: '',
  nickname: '',
  name: '',
  picture: '',
}

const SET_PROFILE = 'PROFILE.SET_PROFILE'

export const Actions = {
  SET_PROFILE,
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
  } else {
    return state
  }
}

export default reducer
