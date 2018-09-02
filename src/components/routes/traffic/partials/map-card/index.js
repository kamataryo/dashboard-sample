import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import traffic from 'src/../../samples/traffic'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Label,
} from 'recharts'

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

  const totalDisplayTimes = graphData.reduce(
    (prev, { displayTimes }) => prev + displayTimes,
    0,
  )

  const totalTraffic = Math.round(
    graphData.reduce((prev, { traffic }) => prev + traffic, 0) / 1000000,
  )

  return (
    <Card className={ classes.card }>
      <CardContent>
        <Typography variant="headline" component="h2">
          {map.name}
        </Typography>

        <Typography
          color="textSecondary"
          component="p"
          style={ { marginBottom: 10 } }
        >
          {map.description || '(no description)'}
        </Typography>

        <Typography component="p">{`Total: ${totalTraffic} MB (${totalDisplayTimes} Times)`}</Typography>
        <LineChart
          width={ 800 }
          height={ 300 }
          data={ graphData }
          margin={ { top: 10, right: 30, left: 30, bottom: 10 } }
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId={ 'left' }>
            <Label angle={ 270 } position="left" style={ { textAnchor: 'middle' } }>
              {'Times [n]'}
            </Label>
          </YAxis>
          <YAxis
            yAxisId={ 'right' }
            orientation={ 'right' }
            tickFormatter={ tick => tick / 1000000 }
          >
            <Label angle={ 90 } position="right" style={ { textAnchor: 'middle' } }>
              {'Traffic [MB]'}
            </Label>
          </YAxis>
          <Tooltip
            formatter={ (value, name) =>
              name === 'traffic' ? value / 1000000 + ' MB' : value
            }
          />
          <Line
            yAxisId={ 'left' }
            type={ 'monotone' }
            dataKey={ 'displayTimes' }
            stroke={ '#8884d8' }
            strokeWidth={ showDisplayTimes ? 1 : 0 }
            dot={ showDisplayTimes }
          />
          <Line
            yAxisId={ 'right' }
            type={ 'monotone' }
            dataKey={ 'traffic' }
            stroke={ '#82ca9d' }
            strokeWidth={ showTraffic ? 1 : 0 }
            dot={ showTraffic }
          />
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
