import { connect } from 'react-redux'
import { createActions as createMenuActions } from 'src/reducers/menu'

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = state => {
  const { expiresAt } = state.auth
  return {
    isDrawerOpen: state.menu.isDrawerOpen,
    isLoggedIn: new Date().getTime() < expiresAt,
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
    openDrawer: () => dispatch(createMenuActions.openDrawer(true)),
    closeDrawer: () => dispatch(createMenuActions.openDrawer(false)),
  }
}

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component)
