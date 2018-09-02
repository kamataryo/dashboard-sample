import React from 'react'
import PropTypes from 'prop-types'
import style from './style'
import connect from './connect'
import { withRouter } from 'react-router'

import classNames from 'classnames'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { mailFolderListItems, systemOperationMenuItems } from './tiles'

class CommonMenu extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    // own Props
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    // styleProps
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    // stateProps
    isLoggedIn: PropTypes.bool.isRequired,
    isDrawerOpen: PropTypes.bool.isRequired,
    // dispatchProps
    openDrawer: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const {
      // ownProps
      children,
      // styleProps
      classes,
      theme,
      // stateProps
      isLoggedIn,
      isDrawerOpen,
      // dispatchProps
      openDrawer,
      closeDrawer,
    } = this.props

    return (
      <div className={ classes.root }>
        <AppBar
          position="absolute"
          className={ classNames(
            classes.appBar,
            isDrawerOpen && classes.appBarShift,
          ) }
        >
          <Toolbar disableGutters={ !isDrawerOpen }>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={ openDrawer }
              className={ classNames(
                classes.menuButton,
                isDrawerOpen && classes.hide,
              ) }
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={ {
            paper: classNames(
              classes.drawerPaper,
              !isDrawerOpen && classes.drawerPaperClose,
            ),
          } }
          open={ isDrawerOpen }
        >
          <div className={ classes.toolbar }>
            <IconButton onClick={ closeDrawer }>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>{mailFolderListItems(isLoggedIn)}</List>
          <Divider />
          <List>{systemOperationMenuItems}</List>
        </Drawer>
        <main className={ classes.content }>
          <div className={ classes.toolbar } />
          {children}
        </main>
      </div>
    )
  }
}

export default withRouter(connect(style(CommonMenu)))
