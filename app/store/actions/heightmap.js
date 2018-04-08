export const types = {
  SET_GLOBAL: 'SET_GLOBAL',
  ADD_MAP: 'ADD_MAP',
  DEL_MAP: 'DEL_MAP',
  CLEAR_MAP: 'CLEAR_MAP'
};

const actions = {
  setGlobal (payload) {
    return {
      type: types.SET_GLOBAL,
      payload
    };
  },
  addMap (payload) {
    return {
      type: types.ADD_MAP,
      payload
    };
  },
  delMap (payload) {
    return {
      type: types.DEL_MAP,
      payload
    };
  },
  clearMap () {
    return {
      type: types.CLEAR_MAP
    };
  }
};

export default actions;
