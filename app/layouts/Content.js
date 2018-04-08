import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Showcase, Panel } from 'APP/layouts';
import actions from 'APP/store/actions';
import { style } from 'APP/config';

const styles = {
  content: {
    height: '100%',
    background: style.background.content,
    color: style.color.content
  }
};

class Content extends Component {
  constructor (props) {
    super(props);
  }

  run (payload) {
    this.props.addMap(payload);
  }

  clear () {
    this.props.clearMap();
  }

  render () {
    const { maps } = this.props;
    return (
      <div id="content" style={styles.content}>
        <Showcase maps={maps} />
        <Panel maps={maps} setGlobal={(payload) => this.props.setGlobal(payload)} run={(payload) => this.run(payload)} clear={() => this.clear()} />
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
    },
    clearMap: () => {
      dispatch(actions.clearMap());
    }
  };
};

Content = connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);

export default Content;
