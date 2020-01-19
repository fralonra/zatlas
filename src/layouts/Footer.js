import React, { Component } from 'react'

import { style } from '../config'

const styles = {
  footer: {
    flex: '0 0 auto',
    padding: '0.75rem',
    background: style.background.footer,
    color: style.color.footer,
    fontSize: '75%',
    textAlign: 'center'
  }
}

const yearOfStart = 2018
const yearOfNow = new Date().getFullYear()

export default class Footer extends Component {
  render () {
    return (
      <div style={styles.footer}>
        {yearOfNow === yearOfStart
          ? yearOfNow
          : `${yearOfStart}-${yearOfNow}`}
      </div>
    )
  }
}
