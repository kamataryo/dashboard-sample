import Auth from 'src/libs/auth'

const initialAuthState = {
  driver: new Auth(),
  // recover on load
  accessToken: localStorage.getItem('access_token'),
  idToken: localStorage.getItem('id_token'),
  expiresAt: localStorage.getItem('expires_at'),
}

const reducer = (state = initialAuthState, action) => state

export default reducer
