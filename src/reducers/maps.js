import sampleMaps from 'src/samples/maps'
import style from 'src/samples/style.json'

const initialMapsState = {
  data: [] && sampleMaps, // NOTE: sample
  styles:
    {} &&
    sampleMaps
      .map(map => map.id)
      .reduce((prev, id) => ({ ...prev, [id]: style }), {}), // key is map id
}

export const Actions = {}

const reducer = (state = initialMapsState, action) => {
  const { type } = action
  console.log(type)
  return state
}

export default reducer
