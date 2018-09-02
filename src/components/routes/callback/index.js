import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createActions as createAuthActions } from 'src/reducers/auth'

export class Callback extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    handleAuthentication: PropTypes.func.isRequired,
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    this.props.handleAuthentication()
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
 * map dispatch to props
 * @param  {function} dispatch dispatcher
 * @param  {object}   ownProps own props
 * @return {object}            dispatch props
 */
const mapDispatchToProps = dispatch => {
  return {
    handleAuthentication: () =>
      dispatch(createAuthActions.handleAuthentication()),
  }
}

export default connect(
  void 0,
  mapDispatchToProps,
)(Callback)
