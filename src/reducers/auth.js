import Auth from '../libs/auth'

const initialState = {
  driver: new Auth()
}

const reducer = (state = initialState, action) => state

export default reducer
