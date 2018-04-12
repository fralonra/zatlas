import React, { Component } from 'react';
import { Github } from 'react-feather';

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

const brand = 'Zatlas - Online random heightmap generator.';

const links = [{
  label: 'View Code on Github',
  url: 'https://github.com/fralonra/zatlas',
  icon: <Github className="icon-button" />
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
              <a style={styles.link} href={l.url}>{l.icon ?
                l.icon :
                l.label}
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Header;
