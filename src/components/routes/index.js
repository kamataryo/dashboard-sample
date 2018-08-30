import React from 'react'
import { Route, Router } from 'react-router-dom'
import history from '../../libs/history'
import Auth from './auth'
import Home from './home'
import Profile from './profile'
import Callback from './callback'

export const Routes = () => {
  const publicUrl = process.env.PUBLIC_URL || ''
  return (
    <Router history={history}>
      <div>
        <Route path={`${publicUrl}/`} render={() => <Auth />} exact />
        <Route path={`${publicUrl}/home`} render={() => <Home />} exact />
        <Route path={`${publicUrl}/profile`} render={() => <Profile />} exact />
        <Route
          path={`${publicUrl}/callback`}
          render={() => <Callback />}
          exact
        />
      </div>
    </Router>
  )
}

export default Routes
