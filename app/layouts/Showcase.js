import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mapcase } from 'APP/layouts';

const styles = {
  showcase: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    textAlign: 'center',
    overflowY: 'auto'
  },
  intro: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '1rem',
    color: '#565656',
    fontWeight: 'bold'
  },
  introTitle: {

  },
  introDetail: {
    textAlign: 'left'
  },
  case: {

  }
};

class Showcase extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { maps } = this.props;
    return (
      <div id="showcase" style={styles.showcase}>
        {maps.length === 0 && (
          <div className="showcase-info" style={styles.intro}>
            <p style={styles.introTitle}>INTRO</p>
            <p style={styles.introDetail}>
              <div>A random heightmap generator using diamond-square algorithm.</div>
              <div>Click on the right to start your trip.</div>
            </p>
          </div>
        )}
        {maps.map((m, i) => {
          return (
            <div className="showcase-case" style={styles.case}>
              <Mapcase index={i} map={m}/>
            </div>
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
