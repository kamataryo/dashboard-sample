import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Link from 'src/components/commons/refined-link'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import GroupIcon from '@material-ui/icons/Group'
import DeleteIcon from '@material-ui/icons/Delete'

import { createActions as createGroupsActions } from 'src/reducers/groups'

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
})

export const Groups = props => {
  const { classes, groups, deleteGroup } = props
  return (
    <div>
      <h1>{'Groups'}</h1>
      <p>{'Configure your groups here.'}</p>
      {groups.map((group, index) => (
        <div key={`each-map-link-to-${group.id}`} className={classes.paper}>
          <List dense={false}>
            <ListItem>
              <Link to={`/groups/${group.id}`}>
                <ListItemAvatar>
                  <Avatar>
                    <GroupIcon />
                  </Avatar>
                </ListItemAvatar>
              </Link>

              <Link to={`/groups/${group.id}`} style={{ paddingLeft: 16 }}>
                <ListItemText primary={group.name} />
              </Link>

              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Delete"
                  onClick={() => deleteGroup(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      ))}
    </div>
  )
}

Groups.propTypes = {
  classes: PropTypes.object.isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
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
)(withStyles(styles)(Groups))
