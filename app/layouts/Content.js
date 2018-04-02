import React, { Component } from 'react';
//import { Button } from 'reactstrap';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Heightmap } from 'APP/layouts';
//import routes from 'APP/routes';
import { style } from 'APP/config';

const styles = {
  content: {
    flex: '1 1 auto',
    background: style.background.content
  },
};

export default class Content extends Component {
  constructor (props) {
    super(props);
  }

  onButtonAddClick () {

  }

  render () {
    return (
      <div style={styles.content}>
        <Heightmap />
      </div>
    );
  }
}
// <Switch>
// {routes.map((route, index) => (
//   <Route
//   key={index}
//   path={route.path}
//   exact={route.exact}
//   component={route.component}
//   />
// ))}
// </Switch>
