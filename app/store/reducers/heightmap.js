import { actionTypes as actions } from 'APP/store/actions';

const initialState = {
  power: 7,
  corner: [1, 1, 1, 1],
  offset: -0.2,
  range: 7,
  rough: 0.8,
  smooth: 3,
  maps: []
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_POWER:
      return Object.assign({}, state, {
        power: action.payload
      });
    case actions.SET_CORNER:
      return Object.assign({}, state, {
        corner: action.payload
      });
    case actions.SET_OFFSET:
      return Object.assign({}, state, {
        offset: action.payload
      });
    case actions.SET_RANGE:
      return Object.assign({}, state, {
        range: action.payload
      });
    case actions.SET_ROUGH:
      return Object.assign({}, state, {
        rough: action.payload
      });
    case actions.SET_SMOOTH:
      return Object.assign({}, state, {
        smooth: action.payload
      });
    case actions.ADD_MAP:
      return Object.assign({}, state, {
        maps: [...state.maps, action.payload]
      });
    default:
      return state;
  }
};

export default reducers;
