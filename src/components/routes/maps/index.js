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
import MapIcon from '@material-ui/icons/Map'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

import { createActions as createMapsActions } from 'src/reducers/maps'

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
})

export const Maps = props => {
  const { classes, maps, addMap, deleteMap } = props
  return (
    <div>
      <h1>
        {'Maps'}
        <IconButton
          style={{ marginLeft: 5 }}
          onClick={() => {
            const mapNames = maps.map(map => map.name)
            let maxNewMapNamePrefix = 0
            let newMapName = ''
            do {
              maxNewMapNamePrefix++
              newMapName = `New Map (${maxNewMapNamePrefix})`
            } while (mapNames.includes(newMapName))
            // TODO: id should be numbered by server
            addMap({ id: `new-map-${maxNewMapNamePrefix}`, name: newMapName })
          }}
        >
          <AddIcon />
        </IconButton>
      </h1>
      <p>{'Configure your maps here.'}</p>
      {maps.map((map, index) => (
        <div key={`each-map-link-to-${map.id}`} className={classes.paper}>
          <List dense={false}>
            <ListItem>
              <Link to={`/maps/${map.id}`}>
                <ListItemAvatar>
                  <Avatar>
                    <MapIcon />
                  </Avatar>
                </ListItemAvatar>
              </Link>

              <Link to={`/maps/${map.id}`} style={{ paddingLeft: 16 }}>
                <ListItemText primary={map.name} />
              </Link>

              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Delete"
                  onClick={() => deleteMap(index)}
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

Maps.propTypes = {
  classes: PropTypes.object.isRequired,
  maps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  // dispatchProps
  addMap: PropTypes.func.isRequired,
  deleteMap: PropTypes.func.isRequired,
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = state => {
  return {
    maps: state.maps.data,
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
    deleteMap: index => dispatch(createMapsActions.deleteMap(index)),
    addMap: map => dispatch(createMapsActions.addMap(map)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Maps))
