import React, { Component } from 'react'
import './page-override.css'

import DaSelector from '../component/da-selector'

class DemoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      optionDataList: this.getRandomData(20),
      selectOption: {},
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // to avoid `this.state.optionDataList` get random every time
    return this.state.selectOption != nextState.selectOption
  }

  render() {
    return (
      <div>
        <p>Your choice is:
          <span id="user-choice">{this.state.selectOption.display}</span>
        </p>
        <DaSelector
          id="demo-selector"
          name="input name"
          placeholder="input placeholder"
          optionDataList={this.state.optionDataList}
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
    const result = [{
      id: '',
      display: 'Please select an option',
    }]

    for (let i = 1; i < length; i++) {
      result.push({
        id: `id-${i}`,
        display: `${i} - ${Math.random().toString(16).slice(2)}`,
      })
    }

    return result
  }
}

export default DemoApp
