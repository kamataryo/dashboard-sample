import React from 'react'
import PropTypes from 'prop-types'
import Link from 'src/components/commons/refined-link'
import { connect } from 'react-redux'

export class Home extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { isLoggedIn } = this.props

    return (
      <div>
        <h1>home</h1>
        {isLoggedIn && <p>{'You have successfully logged in!'}</p>}
        {isLoggedIn ? (
          <Link to={ '/logout' }>{'Logout'}</Link>
        ) : (
          <Link to={ '/login' }>{'Login'}</Link>
        )}
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
const mapStateToProps = state => {
  const { expiresAt } = state.auth
  return {
    isLoggedIn: new Date().getTime() < expiresAt,
  }
}

export default connect(mapStateToProps)(Home)
