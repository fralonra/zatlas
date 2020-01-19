import { actionTypes as actions } from '../../store/actions'

const initialState = {
  global: {
    seaLevel: 2,
    colors: [0X9ED9F6FF, 0XCBE2A3FF, 0XFFFABCFF, 0XFBCB72FF, 0XDEA353FF]
  },
  maps: []
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_GLOBAL:
      return Object.assign({}, state, {
        global: Object.assign({}, state.global, action.payload)
      })
    case actions.ADD_MAP:
      return Object.assign({}, state, {
        maps: [...state.maps, action.payload]
      })
    case actions.DEL_MAP:
      const maps = []
      state.maps.forEach((m, i) => {
        if (i !== action.payload) maps.push(m)
      })
      return Object.assign({}, state, {
        maps
      })
    case actions.CLEAR_MAP:
      return Object.assign({}, state, {
        maps: []
      })
    default:
      return state
  }
}

export default reducers
