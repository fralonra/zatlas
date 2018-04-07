import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Showcase, Panel } from 'APP/layouts';
import actions from 'APP/store/actions';
import { style } from 'APP/config';

const styles = {
  content: {
    display: 'flex',
    flexFlow: 'row',
    flex: '1 1 auto',
    background: style.background.content,
    color: style.color.content
  },
  left: {

  },
  right: {

  }
};

class Content extends Component {
  constructor (props) {
    super(props);
  }

  run (payload) {
    this.props.addMap(payload);
  }

  render () {
    const { maps } = this.props;
    return (
      <div style={styles.content}>
        <Showcase style={styles.left} maps={maps} />
        <Panel style={styles.right} maps={maps} setGlobal={(payload) => this.props.setGlobal(payload)} run={(payload) => this.run(payload)} />
      </div>
    );
  }
}

Content.propTypes = {
  seaLevel: PropTypes.number,
  maps: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    seaLevel: state.heightmap.seaLevel,
    maps: state.heightmap.maps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGlobal: (payload) => {
      dispatch(actions.setGlobal(payload));
    },
    addMap: (payload) => {
      dispatch(actions.addMap(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
