import React, { Component } from 'react';
import PropTypes from 'prop-types';

const heightmap = require('ds-heightmap');
const Jimp = require('jimp');

import { Corner, Slider } from 'APP/components';
import { style } from 'APP/config';

import 'rc-slider/assets/index.css';

const styles = {
  panel: {
    flex: '0 0 450px',
    padding: '1rem',
    background: style.background.panel,
    color: style.color.panel
  }
};

const panelItems = {
  power: {
    type: 'slider',
    label: 'Power',
    desc: '',
    min: 7,
    max: 12,
    defaultValue: 9,
    marks: marksArrToObj([7, 8, 9, 10, 11, 12, 13]),
    onChange: (props) => {
      this.setValue('power', props.value);
    }
  },
  corner: {
    type: 'corner',
    defaultValue: [2, 2, 2, 2],
    onChange: (props) => {
      this.setValue('corner', props.value);
    }
  },
  offset: {
    type: 'slider',
    label: 'Offset',
    desc: '',
    min: -1,
    max: 1,
    step: 0.1,
    defaultValue: -0.2,
    marks: marksArrToObj([-1, -0.5, 0, 0.5, 1])
  },
  range: {
    type: 'slider',
    label: 'Range',
    desc: '',
    min: 1,
    max: 10,
    defaultValue: 7,
    marks: marksArrToObj([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  },
  rough: {
    type: 'slider',
    label: 'Rough',
    desc: '',
    min: 0,
    max: 0.9,
    step: 0.1,
    defaultValue: 0.1,
    marks: marksArrToObj([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9])
  },
  smooth: {
    type: 'slider',
    label: 'Smooth',
    desc: '',
    min: 0,
    max: 3,
    defaultValue: 3,
    marks: marksArrToObj([0, 1, 2, 3])
  }
};

class Panel extends Component {
  constructor (props) {
    super(props);

    this.state = {
      power: panelItems.power.defaultValue,
      corner: panelItems.corner.defaultValue,
      offset: panelItems.offset.defaultValue,
      range: panelItems.range.defaultValue,
      rough: panelItems.rough.defaultValue,
      smooth: panelItems.smooth.defaultValue
    };
  }

  setValue (key, value) {
    this.setState({ [key]: value });
  }

  run () {
    const { maps, run } = this.props;
    if (maps.length >= 12) return alert('Too many maps');

    const { power, corner, offset, range, rough, smooth } = this.state;
    heightmap.init(power, { corner, offset, range, rough, smooth });
    heightmap.run();
    const raw = heightmap.out();
    const size = raw.length;
    new Jimp(size, size, (err, image) => {
      let max = 0, step = 0;
      raw.forEach((d, x) => {
        d.forEach((v, y) => {
          if (v > max) max = v;
        });
      });
      step = Math.round(max / 4);
      raw.forEach((d, x) => {
        d.forEach((v, y) => {
          image.setPixelColor(colorize(v, step), x, y);
        });
      });
      image.crop(1, 1, size - 2, size - 2);
      image.getBase64('image/png', (err, jimp) => {
        run({ raw, jimp });
      });
    });
  }

  render () {
    return (
      <div style={styles.panel}>
        {Object.keys(panelItems).map(k => {
          const p = panelItems[k];
          p.onChange = (value) => this.setValue(k, value);
          switch (p.type) {
            case 'slider':
              return <Slider {...p}/>;
              break;
            case 'corner':
              p.max = this.state.range;
              return <Corner {...p}/>;
              break;
            default:
              return;
          }
        })}
        <button onClick={() => this.run()}>Run</button>
      </div>
    );
  }
}

Panel.propTypes = {
  maps: PropTypes.arrayOf(PropTypes.object),
  run: PropTypes.func
};

function marksArrToObj(arr) {
  const obj = {};
  arr.forEach(a => {
    obj[a] = String(a);
  });
  return obj;
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

export default Panel;
