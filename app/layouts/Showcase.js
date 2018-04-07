import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mapcase } from 'APP/layouts';

const styles = {
  showcase: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: '1 1 auto',
    alignItems: 'start',
    textAlign: 'center',
    overflowY: 'auto'
  },
  intro: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '1rem',
    color: '#565656',
    fontSize: '3rem',
    fontWeight: 'bold'
  },
  introTitle: {

  },
  introDetail: {
    textAlign: 'left'
  },
  case: {
    width: '33%'
  }
};

class Showcase extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { maps } = this.props;
    return (
      <div style={styles.showcase}>
        {maps.length === 0 && (
          <div style={styles.intro}>
            <div>
              <p style={styles.introTitle}>INTRO</p>
              <p style={styles.introDetail}>
                <div>A random heightmap generator using diamond-square algorithm.</div>
                <div>Click on the right to start your trip.</div>
              </p>
            </div>
          </div>
        )}
        {maps.map((m, i) => {
          return (
            <Mapcase style={styles.case} index={i} map={m}/>
          );
        })}
      </div>
    );
  }
}

Showcase.propTypes = {
  maps: PropTypes.arrayOf(PropTypes.object)
};

export default Showcase;
