import React, { Component } from 'react';
import PropTypes from 'prop-types';

import actions from 'APP/store/actions';
import { Heightmap } from 'APP/components';

const styles = {
  showcase: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: '1 1 auto',
    alignItems: 'start',
    padding: '1rem',
    textAlign: 'center',
    overflowY: 'auto'
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
        {maps.map(m => {
          return (
            <Heightmap style={styles.case} map={m.jimp} />
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
