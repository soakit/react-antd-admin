import React from 'react'
import { Card } from 'antd'

import './index.less'

export default props => {
  return (
    <Card
      className={`panel-box ${props.className}`}
      title={props.title}
      bordered={false}
      bodyStyle={props.bodyStyle}
    >
      {props.children}
    </Card>
  )
}
