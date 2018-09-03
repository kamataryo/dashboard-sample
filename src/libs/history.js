import createHistory from 'history/createBrowserHistory'
const history = createHistory()

const { PUBLIC_URL } = process.env

const refinedPush = path => history.push(`${PUBLIC_URL}${path}`)
const refinedReplace = path => history.replace(`${PUBLIC_URL}${path}`)

history.refinedPush = refinedPush
history.refinedReplace = refinedReplace

export default history
