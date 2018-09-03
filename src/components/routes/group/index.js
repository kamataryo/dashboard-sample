import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { createActions as createGroupsActions } from 'src/reducers/groups'
import history from 'src/libs/history'

export class Group extends React.Component {
  /**
   * delete button handler
   * @return {void}
   */
  onDeleteClick = () => {
    const {
      routeParams: { groupId },
      groups,
      deleteGroup,
    } = this.props
    const groupIndex = groups.map(group => group.id).indexOf(groupId)
    history.push(`${process.env.PUBLIC_URL}/groups`)
    deleteGroup(groupIndex)
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const {
      routeParams: { groupId },
      groups,
    } = this.props

    const map = groups.find(map => map.id === groupId)

    return (
      <div>
        <Typography variant="headline" component="h2">
          {map.name}
        </Typography>

        <Typography
          color="textSecondary"
          component="p"
          style={{ marginBottom: 10 }}
        >
          {map.description || '(no description)'}
        </Typography>

        <p>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.onDeleteClick}
          >
            {'delete this group'}
          </Button>
        </p>
      </div>
    )
  }
}

Group.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
  routeParams: PropTypes.shape({ groupId: PropTypes.string.isRequired })
    .isRequired,
  deleteGroup: PropTypes.func.isRequired,
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = state => {
  return {
    groups: state.groups.data,
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
    deleteGroup: index => dispatch(createGroupsActions.deleteGroup(index)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Group)
