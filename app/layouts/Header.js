import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {
//   Row,
//   Nav, Navbar, NavbarBrand } from 'reactstrap';

// import { NavLink } from 'APP/components';
// import { navRoute as routes } from 'APP/routes';
import { style } from 'APP/config';

const styles = {
  header: {
    flex: '0 0 auto',
    background: style.background.header,
    padding: '1rem'
  }
};

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

  onButtonAddClick () {

  }

  render () {
    return (
      <div style={styles.header}>HEADER</div>
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
