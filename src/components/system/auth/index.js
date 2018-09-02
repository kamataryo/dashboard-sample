import React from 'react'
import PropTypes from 'prop-types'
import connect from './connect'
import { auth } from 'src/middlewares/auth-middleware'

/**
 * provide authorization
 * @type {Object}
 */
export class Auth extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    // stateProps
    accessToken: PropTypes.string.isRequired,
    // dispatchProps
    setTokens: PropTypes.func.isRequired,
    setProfile: PropTypes.func.isRequired,
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    const tokens = {
      accessToken: localStorage.getItem('access_token') || '',
      idToken: localStorage.getItem('id_token') || '',
      expiresAt: localStorage.getItem('expires_at') || 0,
    }
    this.props.setTokens(tokens)
  }

  /**
   * UNSAFE_componentWillReceiveProps
   * @param  {object} nextProps React props.
   * @return {void}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.props.accessToken !== nextProps.accessToken &&
      this.requestGetUserProfile(nextProps.accessToken)
  }

  requestGetUserProfile = accessToken => {
    accessToken &&
      auth
        .getProfile(accessToken)
        .then(profile => this.props.setProfile(profile))
        .catch(console.error)
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    return null
  }
}

export default connect(Auth)
