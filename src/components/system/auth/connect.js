import { connect } from 'react-redux'
import { createActions as createAuthActions } from 'src/reducers/auth'

/**
 * map dispatch to props
 * @param  {function} dispatch dispatcher
 * @param  {object}   ownProps own props
 * @return {object}            dispatch props
 */
const mapDispatchToProps = dispatch => {
  return {
    setTokens: tokens => dispatch(createAuthActions.setTokens(tokens)),
  }
}

export default connect(
  void 0,
  mapDispatchToProps,
)
