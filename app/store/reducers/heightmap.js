import { actionTypes as actions } from 'APP/store/actions';

const initialState = {
  maps: []
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_MAP:
      return Object.assign({}, state, {
        maps: [...state.maps, action.payload]
      });
    default:
      return state;
  }
};

export default reducers;
