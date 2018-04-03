export const types = {
  ADD_MAP: 'ADD_MAP'
};

const actions = {
  addMap (payload) {
    return {
      type: types.ADD_MAP,
      payload
    };
  }
};

export default actions;
