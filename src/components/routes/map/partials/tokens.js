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
    this.state = { value: 0 }
  }
  handleChange = (event, value) => this.setState({ value })

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="api key" />
          <Tab label="iframe" />
          <Tab label="JavaScript" />
        </Tabs>
        {value === 0 && <TabContainer>{'aaabbbcccddd111222333'}</TabContainer>}
        {value === 1 && (
          <TabContainer>
            {
              '<iframe frameborder="0"><script src="https://example.com/foo/bar#key=aaabbbcccddd111222333" /></iframe>'
            }
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>{`const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'https://example.com/maps/:mapid/style.json',
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
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Tokens)
