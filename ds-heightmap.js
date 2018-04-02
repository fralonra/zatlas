(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DsHeightmap = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const average = require('./utils').average;
const fillArray = require('./utils').fillArray;
const makeValInRange = require('./utils').makeValInRange;
const rgbToHex = require('./utils').rgbToHex;
const posInArray = require('./utils').posInArray;

const POWER_MIN = 2,
      POWER_MAX = 12,
      SMOOTH_MAX = 3;

const POWER_DEFAULT = 7,
      CORNER_DEFAULT = [1, 1, 1, 1],
      OFFSET_DEFAULT = -0.2,
      RANGE_DEFAULT = 7,
      ROUGH_DEFAULT = 0.8,
      SMOOTH_DEFAULT = 3;

const _data = [];
const _corners = [];
let _power = POWER_DEFAULT,
    _corner = CORNER_DEFAULT,
    _offset = OFFSET_DEFAULT,
    _range = RANGE_DEFAULT,
    _rough = ROUGH_DEFAULT,
    _smooth = SMOOTH_DEFAULT,
    _max = 0,
    _initialAverage = 0;

const ds = {

  init (power, opt = {}) {
    initVar(power, opt);
    initData();
  },

  run () {
    diamondSquare(_max - 1);
    if (_smooth > 0) this.smooth(_smooth);
  },

  out () {
    return _data;
  },

  smooth (factor) {
    const f = makeValInRange(factor, 0, SMOOTH_MAX);
    _data.forEach((d, x) => {
      d.forEach((v, y) => {
        let svCount = 0;
        let ov = null;
        for (let i = x - 1; i <= x + 1; ++i) {
          for (let j = y - 1; j <= y + 1; ++j) {
            if (i < 0 || i > _max - 1 || j < 0 || j > _max - 1) break;
            if (i === x && j === y) break;
            if (_data[i][j] === v) ++svCount;
            else if (!ov) ov = _data[i][j];
            if (i === x + 1 && j === y + 1) {
              if (svCount < factor) {
                _data[x][y] = ov;
              }
            }
          }
        }
      });
    });
  }
};

function initVar(p, opt) {
  const n = Number.isInteger(p) ? p : Number.parseInt(p);
  _power = n < 0 ? POWER_MIN :
    n > POWER_MAX ?
    POWER_MAX :
    n;
  _max = Math.pow(2, _power) + 1;

  _offset = typeof opt.offset === 'number' ? makeValInRange(opt.offset, -1, 1) : _offset;
  _range = typeof opt.range === 'number' ? makeValInRange(opt.range, 1, 10) : _range;
  _rough = typeof opt.rough === 'number' ? makeValInRange(opt.rough, 0, 0.9) : _rough;
  _smooth = typeof opt.smooth === 'number' ? makeValInRange(opt.smooth, 0, SMOOTH_MAX) : _smooth;

  const temp = opt.corner ? fillArray(4, opt.corner) : Array(4).fill(null);
  _corner = temp.map(t => t === null ?
    Math.random() * _range :
    t < 0 ?
    0 :
    t > _range ?
    _range :
    t
  );
  _corners.push([0, 0], [_max - 1, 0], [_max - 1, _max - 1], [0, _max - 1]);
  _initialAverage = average(_corner);
}

function initData() {
  for (let i = 0; i < _max; ++i) {
    _data.push(Array(_max).fill(0));
  }
  _corners.forEach((c, i) => {
    set(...c, _corner[i]);
  });
}

function get(x, y) {
  if (x < 0 || x > _max - 1 || y < 0 || y > _max - 1) return _initialAverage;
  return _data[x][y];
}

function set(x, y, val) {
  _data[x][y] = val;
}

function diamondSquare(size) {
  const half = size / 2;
  let x, y;
  if (half < 1) return _data;

  for (y = half; y < _max; y += size) {
    for (x = half; x < _max; x += size) {
      if (notCorner(x, y)) {
        square(x, y, half);
      }
    }
  }
  for (y = 0; y < _max; y += half) {
    for (x = (y + half) % size; x < _max; x += size) {
      if (notCorner(x, y)) {
        diamond(x, y, half);
      }
    }
  }
  diamondSquare(size / 2);
}

function square(x, y, half) {
  const a = average([
    get(x - half, y - half),
    get(x + half, y - half),
    get(x + half, y + half),
    get(x - half, y + half)
  ]);
  set(x, y, getValue(a, half));
}

function diamond(x, y, half) {
  const a = average([
    get(x, y - half),
    get(x + half, y),
    get(x, y + half),
    get(x - half, y)
  ]);

  set(x, y, getValue(a, half));
}

function getValue(average, size) {
  return makeValInRange(Math.round(average + genOffset(size)), -_range, _range);
}

function genOffset(size) {
  const roughFactor = size / _max / (1 - _rough);
  return ((Math.random() + _offset) * _range * roughFactor);
}

function notCorner(x, y) {
  return (x !== 0 && x !== _max - 1 && y !== 0 && y !== _max - 1) ||
  !posInArray(x, y, _corners);
}

if ("development" === 'development') {
  console.log('ds-heightmap: This version is used for development. You can switch to production version when all done.');
}

module.exports = ds;

},{"./utils":2}],2:[function(require,module,exports){
function average(values) {
  return values.reduce((sum, val) => sum + val) / values.length;
}

function fillArray(size, data) {
  return typeof i === 'number' ? Array(size).fill(data) :
    (Array.isArray(data) ?
    (data.length < size ?
    data.concat(Array(size - data.length).fill(data[data.length - 1])) :
    data.length > size ?
    data.slice(0, size) :
    data) :
    [1, 1, 1, 1]);
}

function makeValInRange(val, m1, m2) {
  let min, max;
  if (m1 <= m2) {
    min = m1;
    max = m2;
  } else {
    min = m2;
    max = m1;
  }
  return val > max ?
    max :
    val < min ?
    min :
    val;
}

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function posInArray(x, y, array) {
  return array.some((a, i, arr) => a[0] === x && a[1] === y);
}

const utils = {
  average,
  fillArray,
  makeValInRange,
  rgbToHex,
  posInArray
};

module.exports = utils;

},{}]},{},[1])(1)
});
