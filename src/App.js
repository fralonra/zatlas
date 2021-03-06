import React from 'react'
import { Provider } from 'react-redux'
import MediaQuery from 'react-responsive'

import store from './store'
import { Content, Header } from './layouts'
import { global } from './config'

const styles = {
  app: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    overflow: 'hidden'
  }
}

function App () {
  return (
    <Provider store={store}>
      <div style={styles.app}>
        <MediaQuery minDeviceWidth={global.cssMediaBp[0]}>
          <Header />
        </MediaQuery>
        <Content />
      </div>
    </Provider>
  )
}

export default App
