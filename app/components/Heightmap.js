import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Jimp from 'jimp';

const styles = {
  wrapper: {
  },
  map: {
    width: '100%',
    height: 'auto',
  }
};

class Heightmap extends Component {
  constructor (props) {
    super(props);

    this.state = {
      jimp: null,
      global: props.global
    };

    this.setJimp(props);
  }

  setJimp ({map, range, global}) {
    const size = map.length;
    const { seaLevel, colors } = global;
    new Jimp(size, size, (err, image) => {
      const sea = seaLevel > 0 ? seaLevel : 0;
      const land = range - sea;
      const step = land > colors.length ? colors.length - 1: land;
      const interval = land / step;
      map.forEach((d, x) => {
        d.forEach((v, y) => {
          image.setPixelColor(this.colorize(v, {
            interval,
            ...global
          }), x, y);
        });
      });
      image.crop(1, 1, size - 2, size - 2);
      image.getBase64('image/png', (err, jimp) => {
        this.setState({ jimp });
      });
    });
  }

  colorize (value, factor) {
    const { interval, seaLevel, colors } = factor;
    if (value <= seaLevel) return colors[0];
    let level = Math.round((value - (seaLevel > 0 ? seaLevel : 0)) / interval);
    if (level > colors.length - 1) level = colors.length - 1;
    return colors[level];
  }

  componentWillReceiveProps (nextProps) {
    this.setJimp(nextProps);
  }

  render () {
    const { style } = this.props;
    return (
      <div style={{...style, ...styles.wrapper}}>
        <img style={styles.map} src={this.state.jimp} />
      </div>
    );
  }
}

Heightmap.propTypes = {
  map: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  range: PropTypes.number,
  global: PropTypes.object
};

export default Heightmap;
