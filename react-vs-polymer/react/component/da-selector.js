import React, {
  Component,
  PropTypes,
} from 'react'
import clas from 'classnames'
import './da-selector.css'

const OptionData = PropTypes.shape({
  id: PropTypes.string,
  display: PropTypes.string,
})

const NULL_FN = () => {}

class DaSelector extends Component {
  static idNoResult = 'no-result';

  static classSet = {
    main: 'da-selector',
    panel: 'da-selector-panel',
    list: 'da-selector-option-list',
    item: 'da-selector-option-item',
    searchWrap: 'da-selector-search-wrap',
    searchIcon: 'da-selector-search-icon',
    search: 'da-selector-search',
    placeholder: 'da-selector-placeholder',
    triangle: 'da-selector-triangle',
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    optionDataList: PropTypes.arrayOf(OptionData).isRequired,
    placeholder: PropTypes.string,
    selectedOptionData: OptionData,
    isPanelVisible: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    placeholder: '',
    isPanelVisible: false,
    onChange: NULL_FN,
  };

  constructor(props) {
    super(props)

    this.state = {
      optionDataList: props.optionDataList,
      selectedOptionData: props.selectedOptionData || props.optionDataList[0],
      isPanelVisible: props.isPanelVisible,
    }

    window.addEventListener('click', this.handlePageEvent, false)
  }

  componentDidMount() {
    this.selectOption(this.props.optionDataList[0])
    this.searcher.addEventListener('keyup', this.handleSearcherEvent, false)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handlePageEvent, false)
    this.searcher.removeEventListener('keyup', this.handleSearcherEvent, false)
  }

  render() {
    const classSet = DaSelector.classSet

    return (
      <div className={clas(classSet.main, {
          'is-expanded': this.state.isPanelVisible,
        })}
      >
        <div className={classSet.placeholder}>
          { this.state.selectedOptionData.display }
        </div>

        <div className={classSet.searchWrap}>
          <input
            className={classSet.search}
            type="text"
            placeholder={this.state.selectedOptionData.display}
            ref={input => this.searcher = input}
          />
          <span className={classSet.searchIcon}></span>
        </div>

        <span className={classSet.triangle}></span>

        <div className={clas(classSet.panel, {
            'hide': !this.state.isPanelVisible,
          })}
        >
          <ul className={classSet.list}>
            { this.state.optionDataList.map(optionData => (
                <li
                  key={optionData.id}
                  className={clas(classSet.item, {
                    'active': optionData.id === this.state.selectedOptionData.id,
                  })}
                  onClick={() => this.selectOption(optionData)}
                >
                  { optionData.display }
                </li>
            ))}
          </ul>
        </div>

        <label htmlFor={this.props.id}>
          { this.props.placeholder }
        </label>
        <input id={this.props.id} type="hidden" />
      </div>
    )
  }

  selectOption(optionData) {
    if (optionData.id === DaSelector.idNoResult) return false

    if (!optionData.display) optionData.display = optionData.id

    const prevOptionData = this.state.selectedOptionData
    this.props.onChange(optionData, prevOptionData)

    this.setState({
      selectedOptionData: optionData,
    })

    this.togglePanel(false)
  }

  togglePanel(isPanelVisible) {
    if (typeof isPanelVisible === 'undefined') {
      isPanelVisible = !this.state.isPanelVisible
    } else {
      isPanelVisible = !!isPanelVisible
    }

    this.setState({ isPanelVisible })
  }

  handlePageEvent = event => {
    const targetClass = event.target.className
    const isOutsideComponent = !event.path.find(path => path.className === DaSelector.classSet.main)
    const needNoResponse =
      targetClass.indexOf('da-selector-option') > -1
      || targetClass.indexOf('da-selector-search') > -1

    if (needNoResponse) {
      // need no response
      return false
    } else if (isOutsideComponent) {
      // outside component
      this.togglePanel(false)
      return false
    } else {
      // toggle panel
      this.togglePanel()
      if (this.state.isPanelVisible) this.searcher.focus()
    }
  };

  handleSearcherEvent = event => {
    const value = event.target.value
    if (typeof value !== 'string') return false

    let searchResults = this.props.optionDataList.filter(optionData => {
      if (!optionData) return false
      const searchYield = [
        optionData.id || '',
        optionData.display || ''
      ].join('::')
      if (searchYield.toLowerCase().indexOf(value.toLowerCase()) > -1) return true
      return false
    })

    searchResults = (searchResults.length > 0)
      ? searchResults
      : [{ id: DaSelector.idNoResult, display: 'no result' }]

    this.setState({
      optionDataList: searchResults,
    })
  };
}

export default DaSelector
