import { connect } from 'react-redux'
import { createActions as createAuthActions } from 'src/reducers/auth'
import { createActions as createProfileActions } from 'src/reducers/profile'
import { createActions as createUserActions } from 'src/reducers/user'

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    idToken: state.auth.idToken,
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
    setUser: user => dispatch(createUserActions.set(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
