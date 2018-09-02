import React from 'react'
import PropTypes from 'prop-types'
import connect from './connect'

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
    setTokens: PropTypes.func.isRequired,
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
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    return null
  }
}

export default connect(Auth)
