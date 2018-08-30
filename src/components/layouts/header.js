import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth from '../../libs/auth'

export class Header extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { auth } = this.props
    return auth.isAuthenticated() ? (
      <div>
        <ul role={'navigation'}>
          <li>
            <Link
              to={`${process.env.PUBLIC_URL}/home`}
              onClick={() => {
                auth.logout()
                this.forceUpdate()
              }}
            >
              {'logout'}
            </Link>
          </li>
          <li>
            <Link to={`${process.env.PUBLIC_URL}/profile`}>profile</Link>
          </li>
        </ul>
      </div>
    ) : (
      <div>
        <ul role={'navigation'}>
          <li>
            <Link to={`${process.env.PUBLIC_URL}/`}>login</Link>
          </li>
        </ul>
      </div>
    )
  }
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

export default connect(mapStateToProps)(Header)
