import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import traffic from 'src/../../samples/traffic'

console.log(traffic)

const styles = {
  card: {
    minWidth: 275,
    marginBottom: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
}

const SimpleCard = props => {
  const { classes, map } = props
  const data = traffic[map.id]

  return (
    <Card className={ classes.card }>
      <CardContent>
        <Typography variant="headline" component="h2">
          {map.name}
        </Typography>
        <Typography className={ classes.title } color="textSecondary">
          {map.description || '(no description)'}
        </Typography>
        <p>{JSON.stringify(data)}</p>
      </CardContent>
    </Card>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  map: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
}

export default withStyles(styles)(SimpleCard)
