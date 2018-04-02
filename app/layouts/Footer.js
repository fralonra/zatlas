import React, { Component } from 'react';

import { style } from 'APP/config';

const styles = {
  footer: {
    flex: '0 0 auto',
    padding: '0.75rem',
    background: style.background.footer,
    fontSize: '75%',
    textAlign: 'center'
  },
};

const yearOfStart = 2018;
const yearOfNow = new Date().getFullYear();

export default class Footer extends Component {
  constructor (props) {
    super(props);
  }

  onButtonAddClick () {

  }

  render () {
    return (
      <div style={styles.footer}>
        {yearOfNow === yearOfStart ?
          yearOfNow :
          `${yearOfStart}-${yearOfNow}`
        }
      </div>
    );
  }
}
