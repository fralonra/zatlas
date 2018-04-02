export const types = {
  SET_POWER: 'SET_POWER',
  SET_CORNER: 'SET_CORNER',
  SET_OFFSET: 'SET_OFFSET',
  SET_RANGE: 'SET_RANGE',
  SET_ROUGH: 'SET_ROUGH',
  SET_SMOOTH: 'SET_SMOOTH',
  ADD_MAP: 'ADD_MAP'
};

const actions = {
  setPower (payload) {
    return {
      type: types.SET_POWER,
      payload
    };
  },
  setCorner (payload) {
    return {
      type: types.SET_CORNER,
      payload
    };
  },
  setOffset (payload) {
    return {
      type: types.SET_OFFSET,
      payload
    };
  },
  setRange (payload) {
    return {
      type: types.SET_RANGE,
      payload
    };
  },
  setRough (payload) {
    return {
      type: types.SET_ROUGH,
      payload
    };
  },
  setSmooth (payload) {
    return {
      type: types.SET_SMOOTH,
      payload
    };
  },
  addMap (payload) {
    return {
      type: types.ADD_MAP,
      payload
    };
  }
};

export default actions;
