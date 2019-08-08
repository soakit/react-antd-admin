import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, matchPath } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { getAllMenu, updateNavPath } from '../../actions/menu'

import './index.less'

const { SubMenu } = Menu

const defaultProps = {
  items: [],
}

const propTypes = {
  items: PropTypes.array,
}

const { Sider } = Layout

const isActive = (path, history) => {
  return matchPath(path, {
    path: history.location.pathname,
    exact: true,
    strict: false,
  })
}

class Sidebar extends React.Component {
  state = {
    openKey: 'sub1',
    activeKey: 'menu101',
    collapsed: false,
    mode: 'inline',
  }

  componentDidMount() {
    this.props.getAllMenu()
  }

  componentWillReceiveProps(nextProps) {
    Array.isArray(nextProps.items) &&
      nextProps.items.forEach((item, i) => {
        Array.isArray(item.child) &&
          item.child.forEach(node => {
            if (node.url && isActive(node.url, this.props.history)) {
              this.menuClickHandle({
                key: `menu${node.key}`,
                keyPath: [`menu${node.key}`, `sub${item.key}`],
              })
            }
          })
      })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      mode: !this.state.collapsed ? 'vertical' : 'inline',
    })
  }

  menuClickHandle = item => {
    this.setState({
      activeKey: item.key,
    })
    this.props.updateNavPath(item.keyPath, item.key)
  }

  render() {
    const { items, history } = this.props
    let { activeKey, openKey } = this.state

    const menuProcess = (nodes, pkey) => {
      return (
        Array.isArray(nodes) &&
        nodes.map((item, i) => {
          const menu = menuProcess(item.child, item.key)
          if (item.url && isActive(item.url, history)) {
            activeKey = `menu${item.key}`
            openKey = `sub${pkey}`
          }
          if (menu.length > 0) {
            return (
              <SubMenu
                key={`sub${item.key}`}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span className="nav-text">{item.name}</span>
                  </span>
                }
              >
                {menu}
              </SubMenu>
            )
          }
          return (
            <Menu.Item key={`menu${item.key}`}>
              {item.url ? (
                <Link to={item.url}>
                  {item.icon && <Icon type={item.icon} />}
                  <span>{item.name}</span>
                </Link>
              ) : (
                <span>
                  {item.icon && <Icon type={item.icon} />}
                  <span>{item.name}</span>
                </span>
              )}
            </Menu.Item>
          )
        })
      )
    }

    const menu = menuProcess(items)

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="ant-layout-logo" />
        <Menu
          mode={this.state.mode}
          theme="dark"
          selectedKeys={[activeKey]}
          defaultOpenKeys={[openKey]}
          onClick={this.menuClickHandle}
        >
          {menu}
        </Menu>
        <div className="sider-trigger">
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        </div>
      </Sider>
    )
  }
}

Sidebar.propTypes = propTypes
Sidebar.defaultProps = defaultProps

function mapStateToProps(state) {
  return {
    items: state.menu.items,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMenu: bindActionCreators(getAllMenu, dispatch),
    updateNavPath: bindActionCreators(updateNavPath, dispatch),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sidebar)
)
