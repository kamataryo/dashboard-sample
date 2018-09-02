import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import maps from 'src/../../samples/maps'
import Link from 'src/components/commons/refined-link'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MapIcon from '@material-ui/icons/Map'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
})

export const Maps = props => {
  const { classes } = props
  return (
    <div>
      <h1>{'Maps'}</h1>
      <p>{'Configure maps here.'}</p>
      {maps.map(map => (
        <div key={ `each-map-link-to-${map.id}` } className={ classes.paper }>
          <List dense={ false }>
            <ListItem>
              <Link to={ `/maps/${map.id}` }>
                <ListItemAvatar>
                  <Avatar>
                    <MapIcon />
                  </Avatar>
                </ListItemAvatar>
              </Link>

              <Link to={ `/maps/${map.id}` } style={ { paddingLeft: 16 } }>
                <ListItemText primary={ map.name } />
              </Link>

              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
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
}

export default withStyles(styles)(Maps)
