import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import traffic from 'src/../../samples/traffic'
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts'

const styles = {
  card: {
    minWidth: 275,
    marginBottom: 20,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
}

const SimpleCard = props => {
  const { classes, showTraffic, showDisplayTimes, map } = props
  const trafficData = [...traffic[map.id]]
  trafficData.sort((a, b) => a.day - b.day)
  const graphData = trafficData.map(data => ({
    day: data.day,
    displayTimes: data.displayTimes,
    traffic: data.traffic,
  }))

  return (
    <Card className={ classes.card }>
      <CardContent>
        <Typography variant="headline" component="h2">
          {map.name}
        </Typography>
        <Typography className={ classes.title } color="textSecondary">
          {map.description || '(no description)'}
        </Typography>
        <LineChart
          width={ 800 }
          height={ 400 }
          data={ graphData }
          margin={ { top: 5, right: 20, left: 10, bottom: 5 } }
        >
          <XAxis dataKey="day" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          {showDisplayTimes && (
            <Line
              type="monotone"
              dataKey="displayTimes"
              stroke="#ff7300"
              yAxisId={ 0 }
            />
          )}
          {showTraffic && (
            <Line
              type="monotone"
              dataKey="traffic"
              stroke="#387908"
              yAxisId={ 1 }
            />
          )}
        </LineChart>
      </CardContent>
    </Card>
  )
}

SimpleCard.propTypes = {
  // styleProps
  classes: PropTypes.object.isRequired,
  // ownProps
  showTraffic: PropTypes.bool.isRequired,
  showDisplayTimes: PropTypes.bool.isRequired,
  map: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
}

export default withStyles(styles)(SimpleCard)
