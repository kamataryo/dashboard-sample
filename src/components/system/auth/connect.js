import { connect } from 'react-redux'
import { createActions as createAuthActions } from 'src/reducers/auth'
import { createActions as createProfileActions } from 'src/reducers/profile'

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
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
    setTokens: tokens => dispatch(createAuthActions.setTokens(tokens)),
    setProfile: profile => dispatch(createProfileActions.setProfile(profile)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
