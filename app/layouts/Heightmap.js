import React, { Component } from 'react';
import { connect } from 'react-redux';
const heightmap = require('ds-heightmap');
const Jimp = require('jimp');

import actions from 'APP/store/actions';

const styles = {

};

class Heightmap extends Component {
  constructor (props) {
    super(props);

    const { power, addMap } = this.props;
    heightmap.init(power, {
      corner: [2, 2, 5, 4]
    });
    heightmap.run();
    const map = heightmap.out();
    const size = Math.pow(2, power);
    new Jimp(size, size, (err, image) => {
      let max = 0, step = 0;
      map.forEach((d, x) => {
        d.forEach((v, y) => {
          if (v > max) max = v;
        });
      });
      step = Math.round(max / 4);
      map.forEach((d, x) => {
        d.forEach((v, y) => {
          image.setPixelColor(colorize(v, step), x, y);
        });
      });
      image.crop(1, 1, size - 2, size - 2);
      image.getBase64('image/png', (err, res) => {
        addMap(res);
      });
    });
  }

  render () {
    const { maps } = this.props;
    return (
      <div>
        {maps.map(m => {
          return (
            <img src={m} />
          );
        })}
      </div>
    );
  }
}

function colorize(value, step) {
  return value < 0 ?
    Jimp.rgbaToInt(0, 0, 255, 255) :
    value > step ?
    value > step * 2 ?
    value > step * 3 ?
    value > step * 4 ?
    Jimp.rgbaToInt(255, 0, 0, 255) :
    Jimp.rgbaToInt(200, 150, 0, 255) :
    Jimp.rgbaToInt(200, 200, 0, 255) :
    Jimp.rgbaToInt(55, 200, 0, 255) :
    Jimp.rgbaToInt(0, 255, 0, 255);
}

const mapStateToProps = (state) => {
  return {
    power: state.heightmap.power,
    corner: state.heightmap.corner,
    offset: state.heightmap.offset,
    range: state.heightmap.range,
    rough: state.heightmap.rough,
    smooth: state.heightmap.smooth,
    maps: state.heightmap.maps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMap: (payload) => {
      dispatch(actions.addMap(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heightmap);
