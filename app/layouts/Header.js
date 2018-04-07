import React, { Component } from 'react';
import { connect } from 'react-redux';

import { style } from 'APP/config';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: '0 0 auto',
    padding: '1rem',
    background: style.background.header,
    color: style.color.header
  },
  brand: {

  },
  links: {

  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
};

const brand = 'ZATLAS - Online random heightmap generator.';

const links = [{
  label: 'View Code on Github',
  url: 'https://github.com/fralonra/zatlas'
}];

class Header extends Component {
  constructor (props) {
    super(props);
  }

  getParamFromState (param) {
    const params = typeof param === 'object' ? param : Array.of(param);
    let result = this.props;
    params.forEach(p => {
      result = result[p];
    });
    return result;
  }

  render () {
    return (
      <div style={styles.header}>
        <div style={styles.brand}>{brand}</div>
        <div style={styles.links}>
          {links.map(l => {
            return (
              <a style={styles.link} href={l.url}>{l.label}</a>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(
  mapStateToProps
)(Header);
