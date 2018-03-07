(function (ReactComponent, React, PropTypes, clas) {


const { DaSelector } = ReactComponent

class DemoApp extends React.Component {
  constructor(props) {
    super(props)

    const optionDataList = this.getRandomData(20)
    this.state = {
      optionDataList,
      selectOption: optionDataList[0],
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

window.ReactComponent = Object.assign(ReactComponent, { DemoApp })


})(window.ReactComponent || {}, window.React, window.PropTypes, window.classNames)
