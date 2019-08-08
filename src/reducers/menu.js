/* eslint-disable no-case-declarations */
import _ from 'lodash'

import {
  GET_ALL_MENU,
  GET_ALL_MENU_SUCCESS,
  UPDATE_NAVPATH,
} from '../actions/menu'

const initialState = {
  items: [],
  navpath: [],
}

export default function menu(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ALL_MENU_SUCCESS:
      return Object.assign({}, initialState, {
        items: action.payload.data.menus,
      })
    case UPDATE_NAVPATH:
      const navpath = []
      let tmpOb
      let tmpKey
      let child
      if (Array.isArray(action.payload.data)) {
        action.payload.data.reverse().forEach(item => {
          if (item.indexOf('sub') !== -1) {
            tmpKey = item.replace('sub', '')
            tmpOb = _.find(state.items, function(o) {
              return o.key === tmpKey
            })
            // eslint-disable-next-line prefer-destructuring
            child = tmpOb.child
            navpath.push({
              key: tmpOb.key,
              name: tmpOb.name,
            })
          }
          if (item.indexOf('menu') !== -1) {
            tmpKey = item.replace('menu', '')
            if (child) {
              tmpOb = _.find(child, function(o) {
                return o.key === tmpKey
              })
              navpath.push({
                key: tmpOb.key,
                name: tmpOb.name,
              })
            }
          }
        })
      }
      return Object.assign({}, state, {
        currentIndex: action.payload.key * 1,
        navpath,
      })
    default:
      return state
  }
}
