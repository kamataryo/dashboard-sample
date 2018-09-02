import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Auth from 'src/libs/auth'

export class Callback extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    this.props.auth.handleAuthentication()
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    return 'loading...'
  }
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = state => {
  return {
    auth: state.auth.driver,
  }
}
export default connect(mapStateToProps)(Callback)
