import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '1rem 0',
    marginTop: '0.25rem'
  },
  desc: {
    padding: '0.5rem 0',
    fontSize: '1rem'
  },
  label: {
    fontSize: '1rem'
  },
  input: {
    width: '2rem',
    marginLeft: '0.5rem',
    marginRight: '1rem',
    textAlign: 'center'
  }
};

const corners = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

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
              <span>
                <label style={styles.label}>{c}</label>
                <input className="input" style={styles.input} type="number" min={min} max={max} value={defaultValue[i]} onChange={(e) => this.onChange(e.target.value, i)} />
              </span>
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
