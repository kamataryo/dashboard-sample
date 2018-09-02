import auth0 from 'auth0-js'
import history from 'src/libs/history'

const base =
  window.location.protocol +
  '//' +
  window.location.host +
  (process.env.PUBLIC_URL || '')

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'kamataryo-sandbox.auth0.com',
    clientID: 'FFVTXMqwdwHlVwwAJijY2tHIMieYv0qO',
    redirectUri: `${base}/callback`,
    audience: 'https://kamataryo-sandbox.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email',
  })

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    console.log(window.location.hash)
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        history.replace(`${process.env.PUBLIC_URL}/`)
      } else if (err) {
        history.replace(`${process.env.PUBLIC_URL}/`)
        console.error(err)
      }
    })
  }

  setSession(authResult) {
    const expiresAt =
      JSON.stringify(authResult.expiresIn * 1000) + new Date().getTime()
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    // navigate to the home route
    history.replace(`${process.env.PUBLIC_URL}/`)
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')

    // External Auth0's login webpage keeps session. This clean it.
    this.auth0.logout({
      clientID: 'FFVTXMqwdwHlVwwAJijY2tHIMieYv0qO',
      returnTo: `${base}/`,
    })
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('No Access Token found')
    }
    return accessToken
  }

  getProfile() {
    const accessToken = this.getAccessToken()
    return new Promise((resolve, reject) => {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          this.userProfile = profile
          resolve(profile)
        } else {
          reject(err)
        }
      })
    })
  }
}
