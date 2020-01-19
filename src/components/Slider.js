import React from 'react'
import PropTypes from 'prop-types'
import RcSlider from 'rc-slider/lib/Slider'

const styles = {
  slider: {
    marginBottom: '2rem'
  },
  label: {

  },
  desc: {
    padding: '0.5rem 0',
    fontSize: '1rem'
  }
}

function Slider ({ label, desc, ...attrs }) {
  return (
    <div style={styles.slider}>
      <div style={styles.label}>{label}</div>
      <div style={styles.desc}>{desc}</div>
      <RcSlider {...attrs} />
    </div>
  )
}

Slider.propTypes = {
  label: PropTypes.string,
  desc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  defaultValue: PropTypes.number,
  marks: PropTypes.object,
  onChange: PropTypes.func
}

Slider.defaultProps = {
  min: 0,
  max: 10,
  defaultValue: 5
}

export default Slider
