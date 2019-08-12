import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import route from '../route'

export default class Root extends Component {
  render() {
    const { store } = this.props
    if (!this.route) this.route = route
    return (
      <Provider store={store}>
        <Router>{this.route}</Router>
      </Provider>
    )
  }
}
