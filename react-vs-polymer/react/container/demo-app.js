import React, { Component } from 'react'
import './page-override.css'

import DaSelector from '../component/da-selector'

class DemoApp extends Component {
  render() {
    return (
      <div>
        <DaSelector
          id="demo-selector"
          optionDataList={this.getRandomData(20)}
          placeholder="This is yield name"
        />
      </div>
    )
  }

  getRandomData(length) {
    let result = []
      , i

    result.push({
      id: 'id-0',
      display: 'Please select an option',
    })

    for (i = 1; i < length; i++) {
      result.push({
        id: `id-${i}`,
        display: `${i} - ${Math.random().toString(16).slice(2)}`,
      })
    }

    return result
  }
}

export default DemoApp
