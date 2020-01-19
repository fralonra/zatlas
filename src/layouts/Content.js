import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Showcase, Panel } from '../layouts'
import actions from '../store/actions'
import { style } from '../config'

const styles = {
  content: {
    height: '100%',
    background: style.background.content,
    color: style.color.content
  }
}

class ContentCom extends Component {
  run (payload) {
    this.props.addMap(payload)
  }

  clear () {
    this.props.clearMap()
  }

  render () {
    const { maps } = this.props
    return (
      <div id='content' style={styles.content}>
        <Showcase maps={maps} />
        <Panel maps={maps} setGlobal={(payload) => this.props.setGlobal(payload)} run={(payload) => this.run(payload)} clear={() => this.clear()} />
      </div>
    )
  }
}

ContentCom.propTypes = {
  seaLevel: PropTypes.number,
  maps: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    seaLevel: state.heightmap.seaLevel,
    maps: state.heightmap.maps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGlobal: (payload) => {
      dispatch(actions.setGlobal(payload))
    },
    addMap: (payload) => {
      dispatch(actions.addMap(payload))
    },
    clearMap: () => {
      dispatch(actions.clearMap())
    }
  }
}

const Content = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentCom)

export default Content
