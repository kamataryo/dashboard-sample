import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Auth from '../../libs/auth'

import { Link } from 'react-router-dom'

export class Home extends React.Component {
  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { auth } = this.props
    return (
      <div>
        <h1>home</h1>
        {auth.isAuthenticated() ? (
          <div>
            <ul role={'navigation'}>
              <li>
                <Link
                  to={'/home'}
                  onClick={() => {
                    auth.logout()
                    this.forceUpdate()
                  }}
                >
                  {'logout'}
                </Link>
              </li>
              <li>
                <Link to={'/profile'}>profile</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <ul role={'navigation'}>
              <li>
                <Link to={'/'}>login</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  }
}

Home.propTypes = {
  auth: PropTypes.instanceOf(Auth).isRequired
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth.driver
  }
}
export default connect(mapStateToProps)(Home)
