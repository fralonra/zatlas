import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Menu } from 'react-feather';
import PropTypes from 'prop-types';
import { ds } from 'ds-heightmap';

import { marksArrToObj } from 'APP/libs';
import { Corner, Slider } from 'APP/components';
import { global, style } from 'APP/config';

import 'rc-slider/assets/index.css';

const styles = {
  panel: {
    display: 'flex',
    flexFlow: 'column',
    padding: '1rem',
    background: style.background.panel,
    color: style.color.panel,
    fontSize: '1.25rem',
    overflowY: 'auto'
  },
  controller: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    flex: '0 0 auto',
    padding: '0.5rem'
  },
  main: {
    height: '100%',
    padding: '0 0.5rem',
    overflowY: 'auto'
  },
  mainHidden: {
    display: 'none'
  },
  desc: {
    padding: '0.5rem 0',
    paddingBottom: '1rem',
    fontSize: '1rem'
  },
  buttonRun: {

  },
  buttonClear: {

  },
  options: {
    paddingBottom: '2rem',
    marginTop: '1rem'
  }
};

const panelItems = {
  power: {
    type: 'slider',
    label: 'Power',
    desc: <span>Determine the size of the map. The map will be as large as 2<sup><i>power</i></sup>x2<sup><i>power</i></sup>.</span>,
    min: 7,
    max: 11,
    defaultValue: 9,
    marks: marksArrToObj([7, 8, 9, 10, 11]),
    onChange: (props) => {
      this.setValue('power', props.value);
    }
  },
  corner: {
    type: 'corner',
    desc: 'Determine the heights of four corners. They are initial values in diamond-square algorithm.',
    min: 1,
    defaultValue: [2, 2, 2, 2],
    onChange: (props) => {
      this.setValue('corner', props.value);
    }
  },
  offset: {
    type: 'slider',
    label: 'Offset',
    desc: 'Designed to effect the overall height of the map.',
    min: -0.9,
    max: 0.9,
    step: 0.1,
    defaultValue: 0.2,
    marks: marksArrToObj([-0.9, -0.5, -0.2, 0, 0.2, 0.5, 0.9])
  },
  range: {
    type: 'slider',
    label: 'Range',
    desc: 'All the height values in the map will be within -range to range.',
    min: 3,
    max: 10,
    defaultValue: 7,
    marks: marksArrToObj([3, 4, 5, 6, 7, 8, 9, 10])
  },
  rough: {
    type: 'slider',
    label: 'Rough',
    desc: 'Designed to effect the terrain variability (roughness).',
    min: 0.1,
    max: 0.9,
    step: 0.1,
    defaultValue: 0.8,
    marks: marksArrToObj([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9])
  }
};

const panelItemsGlobal = {
  maxMapCount: {
    type: 'input',
    label: 'Max Map Count',
    desc: 'The max number of maps in this page.',
    min: 12,
    max: 50,
    defaultValue: 12
  },
  br: {
    type: 'br'
  },
  seaLevel: {
    type: 'slider',
    label: 'Sea Level',
    desc: 'The height of sea level.',
    min: 0,
    max: 10,
    marks: marksArrToObj([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    defaultValue: 1
  }
};

class Panel extends Component {
  constructor (props) {
    super(props);

    this.state = {
      hidden: false,
      maxMapCount: 12,
      power: panelItems.power.defaultValue,
      corner: panelItems.corner.defaultValue,
      offset: panelItems.offset.defaultValue,
      range: panelItems.range.defaultValue,
      rough: panelItems.rough.defaultValue
    };

    this.main = this.main.bind(this);
  }

  setValue (key, value) {
    this.setState({ [key]: value });
  }

  run () {
    const { maps, run } = this.props;
    if (maps.length >= this.state.maxMapCount) return alert('Maximum number of maps exceeded. You can delete some maps first.');

    const { power, corner, offset, range, rough } = this.state;
    const raw = ds(power, { corner, offset, range, rough });
    run({ raw, factor: { power, corner, offset, range, rough } });
  }

  clear () {
    const { maps, clear } = this.props;
    if (maps.length > 0) clear();
  }

  toggle () {
    this.setState((prevState, props) => ({
      hidden: !prevState.hidden
    }));
  }

  main () {
    return (
      <div id="panel-main" style={this.state.hidden ? {...styles.main, ...styles.mainHidden} : styles.main}>
        <small className="warning">Scroll down if you cannot see all options.</small>
        <div style={styles.options}>
          {Object.keys(panelItems).map(k => {
            const p = panelItems[k];
            p.onChange = (value) => this.setValue(k, value);
            switch (p.type) {
              case 'slider':
                return <Slider {...p}/>;
              case 'corner':
                p.max = this.state.range;
                return <Corner {...p}/>;
              default:
                return;
            }
          })}
        </div>
        <div style={styles.options}>
          {Object.keys(panelItemsGlobal).map(k => {
            const p = panelItemsGlobal[k];
            p.onChange = (value) => this.props.setGlobal({ [k]: value });
            switch (p.type) {
              case 'br':
                return <br />;
              case 'slider':
                return <Slider {...p}/>;
              case 'input':
                p.defaultValue = this.state.maxMapCount;
                return (
                  <div>
                    <div>{p.label}</div>
                    <div style={styles.desc}>{p.desc}</div>
                    <input className="input" type="number" min={p.min} max={p.max} value={p.defaultValue} onChange={(e) => this.setValue('maxMapCount', e.target.value)} />
                  </div>
                )
              default:
                return;
            }
          })}
        </div>
      </div>
    );
  }

  render () {
    const Main = this.main;
    return (
      <div id="panel" style={styles.panel}>
        <div style={styles.controller}>
          <div>
            <button id="panel-controller-button-run" className="button panel-controller-button" style={styles.buttonRun} onClick={() => this.run()}>Generate!</button>
            <button id="panel-controller-button-clear" className="button panel-controller-button" style={styles.buttonClear} onClick={() => this.clear()}>Clear</button>
          </div>
          <MediaQuery maxDeviceWidth={global.cssMediaBp[0]}>
            <Menu className="icon-button" onClick={() => this.toggle()} />
          </MediaQuery>
        </div>
        <Main />
      </div>
    );
  }
}

Panel.propTypes = {
  global: PropTypes.object,
  maps: PropTypes.arrayOf(PropTypes.object),
  setGlobal: PropTypes.func,
  run: PropTypes.func,
  clear: PropTypes.func
};

export default Panel;
