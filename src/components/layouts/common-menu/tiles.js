// This file is shared across the demos.

import React from 'react'
import Link from 'src/components/commons/refined-link'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import HomeIcon from '@material-ui/icons/Home'
import ChartIcon from '@material-ui/icons/InsertChartOutlined'
import MapIcon from '@material-ui/icons/Layers'
import UserIcon from '@material-ui/icons/Person'
import GroupIcon from '@material-ui/icons/Group'
import InfoIcon from '@material-ui/icons/Info'

export const mailFolderListItems = isLoggedIn => (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>

    {isLoggedIn && (
      <Link to="/traffic">
        <ListItem button>
          <ListItemIcon>
            <ChartIcon />
          </ListItemIcon>
          <ListItemText primary="Trafic" />
        </ListItem>
      </Link>
    )}

    {isLoggedIn && (
      <Link to="/maps">
        <ListItem button>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Maps" />
        </ListItem>
      </Link>
    )}

    {isLoggedIn && (
      <Link to="/profile">
        <ListItem button>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </Link>
    )}

    {isLoggedIn && (
      <Link to="/groups">
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Groups" />
        </ListItem>
      </Link>
    )}
  </div>
)

export const systemOperationMenuItems = (
  <Link to={ '/information' }>
    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Information" />
    </ListItem>
  </Link>
)
