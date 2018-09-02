/**
 * define SPA routing
 * @file
 */

import React from 'react'
import { Route, Router } from 'react-router-dom'
import history from 'src/libs/history'

import CommonMenu from 'src/components/layouts/common-menu'
import Login from './login'
import Logout from './logout'
import Home from './home'
import Profile from './profile'
import Callback from './callback'
import Information from './information'

const routeConfig = [
  { path: '/', exact: true, Content: Home },
  { path: '/login', exact: true, Content: Login },
  { path: '/callback', exact: true, Content: Callback },
  { path: '/logout', exact: true, Content: Logout },
  { path: '/profile', exact: true, Content: Profile },
  { path: '/information', exact: true, Content: Information },
]

export const Routes = () => {
  return (
    <Router history={ history }>
      <CommonMenu>
        {routeConfig.map(({ path, exact, Content }) => (
          <Route
            key={ `routing-${path}` }
            path={ `${process.env.PUBLIC_URL}${path}` }
            exact={ exact }
            render={ () => <Content /> }
          />
        ))}
      </CommonMenu>
    </Router>
  )
}

export default Routes
