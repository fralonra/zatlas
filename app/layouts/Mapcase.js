import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ImageScene, Heightmap } from 'APP/components';
import actions from 'APP/store/actions';
import { style } from 'APP/config';

const styles = {
  wrapper: {
  },
  case: {
    padding: '0.5rem 1rem',
    cursor: 'zoom-in'
  },
  info: {
    textAlign: 'left'
  }
};

class Mapcase extends Component {
  constructor (props) {
    super(props);

    this.state = {
      global: props.global,
      imageScene: false,
      imageSceneSrc: ''
    };
  }

  toggleImageScene (imageSceneSrc) {
    this.setState((prevState, props) => ({
      imageScene: !prevState.imageScene,
      imageSceneSrc
    }));
  }

  delete () {
    this.props.delMap(this.props.index);
  }

  render () {
    const { style, map, global } = this.props;
    const { imageScene, imageSceneSrc } = this.state;
    const { factor } = map;
    return (
      <div style={{...style, ...styles.wrapper}}>
        {imageScene && <ImageScene src={imageSceneSrc} onClick={() => this.toggleImageScene('')}/>}
        <Heightmap style={styles.case} map={map.raw} range={factor.range} global={global} onClick={(src) => this.toggleImageScene(src)}/>
        <button onClick={() => this.delete()}>Delete</button>
        <div style={styles.info}>
          <ul>
            {Object.keys(factor).map(f => {
              return (
                <li>{f}: {Array.isArray(factor[f]) ? factor[f].join(', ') : factor[f]}</li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

Mapcase.propTypes = {
  index: PropTypes.number.isRequired,
  map: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    global: state.heightmap.global
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delMap: (payload) => {
      dispatch(actions.delMap(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mapcase);
