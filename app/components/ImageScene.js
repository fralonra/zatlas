import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  scene: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: '#000000cc',
    zIndex: 999,
    overflow: 'auto'
  },
  wrapper: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  info: {
    color: '#eeeeee'
  },
  image: {
    margin: 'auto'
  }
};

const info = 'Click anywhere to close.'

class ImageScene extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { style, src, alt, onClick } = this.props;
    return (
      <div style={{...style, ...styles.scene}} onClick={() => onClick()}>
        <div style={styles.wrapper}>
          <p style={styles.info}>{info}</p>
          <img style={styles.image} src={src} alt={alt}/>
        </div>
      </div>
    );
  }
}

ImageScene.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func
};

ImageScene.defaultProps = {
  alt: 'image-scene'
};

export default ImageScene;
