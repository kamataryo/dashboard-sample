import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

const TabContainer = props => {
  return (
    <Typography component="pre" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
})

class Tokens extends React.Component {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = { index: 0 }
  }
  handleChange = (event, index) => this.setState({ index })

  render() {
    const { classes, value } = this.props
    const { index } = this.state

    return (
      <div className={classes.root}>
        <Tabs value={index} onChange={this.handleChange}>
          <Tab label="api key" />
          <Tab label="iframe" />
          <Tab label="JavaScript" />
        </Tabs>
        {index === 0 && <TabContainer>{value}</TabContainer>}
        {index === 1 && (
          <TabContainer>
            {`<iframe frameborder="0"><script src="https://example.com/foo/bar?key=${value}" /></iframe>`}
          </TabContainer>
        )}
        {index === 2 && (
          <TabContainer>{`const map = new mapboxgl.Map({
    container: document.getElementById('map'),
    style: 'https://example.com/maps/:mapid/style.json?key=${value}',
    localIdeographFontFamily: ['sans-serif'],
    attributionControl: true,
    hash: true,
})`}</TabContainer>
        )}
      </div>
    )
  }
}

Tokens.propTypes = {
  // ownProps
  value: PropTypes.string.isRequired,
  // styleProps
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Tokens)
