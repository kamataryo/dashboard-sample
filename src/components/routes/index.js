/**
 * define SPA routing
 * @file
 */

import React from 'react'
import { Route, Router } from 'react-router-dom'
import history from '../../libs/history'

import CommonMenu from '../layouts/common-menu'
import Auth from './auth'
import Home from './home'
import Profile from './profile'
import Callback from './callback'

const headerTitles = {
  '/': 'Home',
  '/profile': 'Profile'
}

const routeConfig = [
  {
    path: '/',
    exact: true,
    render: () => <Home />
  },
  {
    path: '/auth',
    exact: true,
    render: () => <Auth />
  },
  {
    path: '/profile',
    exact: true,
    render: () => <Profile />
  },
  {
    path: '/callback',
    exact: true,
    render: () => <Callback />
  }
]

export const Routes = () => {
  return (
    <Router history={history}>
      <CommonMenu>
        {routeConfig.map(({ path, exact, render }) => (
          <Route
            path={`${process.env.PUBLIC_URL}${path}`}
            exact={exact}
            render={render}
          />
        ))}
      </CommonMenu>
    </Router>
  )
}

export default Routes
