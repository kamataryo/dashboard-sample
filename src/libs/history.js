import createHistory from 'history/createBrowserHistory'
const history = createHistory()

const { push } = history
const refinedPush = path => push(`${process.env.PUBLIC_URL}${path}`)
history.push = refinedPush

export default history
