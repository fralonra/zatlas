const deepClone = (obj) => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return clone;
};

const marksArrToObj = (arr) => {
  const obj = {};
  arr.forEach(a => {
    obj[a] = String(a);
  });
  return obj;
};

export {
  deepClone,
  marksArrToObj
};
