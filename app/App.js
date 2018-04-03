import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
//import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import store from 'APP/store';
import { Content, Header, Footer } from 'APP/layouts';

//import 'ROOT/node_modules/bootstrap/dist/css/bootstrap.css';
import 'APP/styles/main.less';

const styles = {
  app: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    padding: 0,
    overflow: 'hidden'
  }
};

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div style={styles.app}>
          <Header />
          <Content />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default hot(module)(App);
