import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Heightmap } from 'APP/components';
import actions from 'APP/store/actions';

const styles = {
  wrapper: {
  },
  case: {
    padding: '0.5rem 1rem'
  },
  info: {
    textAlign: 'left'
  }
};

class Mapcase extends Component {
  constructor (props) {
    super(props);

    this.state = {
      global: props.global
    };
  }

  delete () {
    this.props.delMap(this.props.index);
  }

  render () {
    const { style, map, global } = this.props;
    const { factor } = map;
    return (
      <div style={{...style, ...styles.wrapper}}>
        <Heightmap style={styles.case} map={map.raw} range={factor.range} global={global}/>
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
