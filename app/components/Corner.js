import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  wrapper: {
    position: 'relative',
    width: '70px',
    height: '70px',
    margin: '1rem',
    background: '#fefefe'
  },
  desc: {
    padding: '0.5rem 0',
    fontSize: '1rem'
  },
  input: {
    width: '2rem',
    textAlign: 'center'
  },
  topLeft: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  bottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0
  }
};

const corners = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];

class Corner extends Component {
  constructor (props) {
    super(props);

    this.state = {
      corners: this.props.defaultValue
    };
  }

  onChange (value, index) {
    this.setState((prevState) => {
      const cornersNew = prevState.corners;
      cornersNew[index] = Number(value);
      return {
        corners: cornersNew
      };
    });
    this.props.onChange(this.state.corners);
  }

  render () {
    const { desc, min, max, defaultValue } = this.props;
    return (
      <div>
        <div>Corner</div>
        <div style={styles.desc}>{desc}</div>
        <div style={styles.wrapper}>
          {corners.map((c, i) => {
            return (
              <input style={{...styles.input, ...styles[c]}} type="number" min={min} max={max} value={defaultValue[i]} onChange={(e) => this.onChange(e.target.value, i)} />
            )
          })}
        </div>
      </div>
    );
  }
}

Corner.propTypes = {
  desc: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValue: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func
};

Corner.defaultProps = {
  min: 1,
  max: 10,
  defaultValue: [2, 2, 2, 2]
};

export default Corner;
