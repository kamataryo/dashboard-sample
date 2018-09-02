import update from 'immutability-helper'

const initialMenuState = {
  isDrawerOpen: false,
}

const OPEN_DRAWER = 'MENU.OPEN_DRAWER'

export const Actions = {
  OPEN_DRAWER,
}

export const createActions = {
  openDrawer: isOpen => ({ type: OPEN_DRAWER, payload: { isOpen } }),
}

const reducer = (state = initialMenuState, action) => {
  const { type } = action
  if (type === OPEN_DRAWER) {
    const { isOpen } = action.payload
    return update(state, {
      isDrawerOpen: { $set: isOpen },
    })
  } else {
    return state
  }
}

export default reducer
