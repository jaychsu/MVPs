import React, { Component } from 'react'
import './page-override.css'

import DaSelector from '../component/da-selector'

class DemoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectOption: {},
    }
  }

  render() {
    return (
      <div>
        <p>Your choice is: <span>{this.state.selectOption.display}</span></p>
        <DaSelector
          id="demo-selector"
          optionDataList={this.getRandomData(20)}
          placeholder="This is yield name"
          onChange={(newOption, oldOption) => {
            this.setState({
              selectOption: newOption,
            })
          }}
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
