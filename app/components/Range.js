import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RcRange from 'rc-slider/lib/Range';

const styles = {
  range: {
  }
};

class Range extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { label, min, max, defaultValue, marks } = this.props;
    return (
      <div style={styles.range}>
        <span>{label}</span>
        <RcRange min={min} max={max} defaultValue={defaultValue} marks={marks} />
      </div>
    );
  }
}

Range.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValue: PropTypes.arrayOf(PropTypes.number),
  marks: PropTypes.object
};

Range.defaultProps = {
  min: 0,
  max: 10,
  defaultValue: 5
};

export default Range;
