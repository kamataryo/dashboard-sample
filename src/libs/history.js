import createHistory from 'history/createBrowserHistory'
const history = createHistory()

const refinedPush = path => history.push(`${process.env.PUBLIC_URL}${path}`)
history.refinedPush = refinedPush

export default history
