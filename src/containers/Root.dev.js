import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import route from '../route'
import DevTools from './DevTools'

export default class Root extends Component {
  render() {
    const { store } = this.props
    if (!this.route) this.route = route
    return (
      <Provider store={store}>
        <div>
          <Router>{this.route}</Router>
          <DevTools />
        </div>
      </Provider>
    )
  }
}
