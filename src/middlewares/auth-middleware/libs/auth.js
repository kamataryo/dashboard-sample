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

  handleAuthentication(callbacks) {
    this.auth0.parseHash((err, authResult) => {
      console.log(authResult)
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, callbacks)
        history.refinedReplace('/')
      } else if (err) {
        console.error(err)
        history.refinedReplace('/')
      }
    })
  }

  setSession(authResult, callbacks) {
    const expiresAt =
      JSON.stringify(authResult.expiresIn * 1000) + new Date().getTime()
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)

    callbacks.dispatchSetTokens({
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      expiresAt: expiresAt,
    })
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

  getProfile(accessToken) {
    return new Promise((resolve, reject) => {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          resolve(profile)
        } else {
          reject(err)
        }
      })
    })
  }
}
