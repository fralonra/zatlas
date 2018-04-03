import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  wrapper: {
    margin: '1rem'
  },
  map: {
    width: '100%',
    height: 'auto',
  }
};

class Heightmap extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { map, style } = this.props;
    return (
      <div style={{...style, ...styles.wrapper}}>
        <img style={styles.map} src={map} />
      </div>
    );
  }
}

Range.propTypes = {
  map: PropTypes.string
};

export default Heightmap;
