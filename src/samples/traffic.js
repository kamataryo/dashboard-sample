const range = new Array(Math.floor(Math.random() * 20) + 10)
  .fill(0)
  .map((_0, i) => i + 1)

const getMonthlyData = () =>
  range.map(i => ({
    day: i,
    displayTimes: Math.floor(Math.random() * 100) + 30,
    traffic: Math.floor(Math.random() * 10000000) + 1000000,
  }))

export default {
  'id|___map1___': getMonthlyData(),
  'id|___map2___': getMonthlyData(),
  'id|___map3___': getMonthlyData(),
}
