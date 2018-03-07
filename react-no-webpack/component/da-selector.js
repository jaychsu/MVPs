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

// To expose method to `togglePanel` by event, just refer commit `44059e28952b7ee70454cc6b7b2d7945bc3d29bd`
class DaSelector extends Component {
  static CLS_SET = {
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
    name: PropTypes.string.isRequired,
    optionDataList: PropTypes.arrayOf(OptionData).isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    selectedOptionData: OptionData,
    isPanelVisible: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: '',
    isPanelVisible: false,
    onChange: () => {},
  };

  constructor(props) {
    super(props)

    this.state = {
      optionDataList: props.optionDataList,
      selectedOptionData: props.selectedOptionData || props.optionDataList[0],
      isPanelVisible: props.isPanelVisible,
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.handlePageEvent, false)
    this.searcher.addEventListener('keyup', this.handleSearcherEvent, false)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handlePageEvent, false)
    this.searcher.removeEventListener('keyup', this.handleSearcherEvent, false)
  }

  render() {
    const CLS_SET = DaSelector.CLS_SET

    return (
      <div className={clas(CLS_SET.main, {
          'is-expanded': this.state.isPanelVisible,
        })}
      >
        <div className={CLS_SET.placeholder}>
          { this.state.selectedOptionData.display }
        </div>

        <div className={CLS_SET.searchWrap}>
          <input
            className={CLS_SET.search}
            type="text"
            placeholder={this.state.selectedOptionData.display}
            ref={input => this.searcher = input}
          />
          <span className={CLS_SET.searchIcon}></span>
        </div>

        <span className={CLS_SET.triangle}></span>

        <div className={clas(CLS_SET.panel, {
            'hide': !this.state.isPanelVisible,
          })}
        >
          <ul className={CLS_SET.list}>
            { this.state.optionDataList.map(optionData => (
                <li
                  key={optionData.id}
                  className={clas(CLS_SET.item, {
                    'active': optionData.id === this.state.selectedOptionData.id,
                  })}
                  data-optid={optionData.id}
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
        <input
          type="hidden"
          id={this.props.id}
          name={this.props.name}
          data-opt={this.state.selectedOptionData.display}
          value={this.state.selectedOptionData.id}
        />
      </div>
    )
  }

  selectOption(optionData) {
    // switch (optionData.id)
    // null -> invalid
    // '' -> empty but valid
    // 'any' -> valid
    if (optionData.id === null) return false

    if (!optionData.display) optionData.display = optionData.id

    this.props.onChange(optionData, this.state.selectedOptionData)

    this.setState({
      selectedOptionData: optionData,
    })

    this.togglePanel(false)
  }

  togglePanel(isPanelVisible) {
    if (isPanelVisible === undefined) {
      isPanelVisible = !this.state.isPanelVisible
    } else {
      isPanelVisible = !!isPanelVisible
    }

    if (!isPanelVisible) {
      this.searcher.value = ''
      this.searcher.dispatchEvent(new Event('keyup'))
    }

    this.setState({ isPanelVisible })
  }

  handlePageEvent = event => {
    const targetClass = event.target.className
    const needNoResponse = (
      ~targetClass.indexOf('da-selector-option') ||
      ~targetClass.indexOf('da-selector-search')
    )
    const isOutsideComponent = !event.path.find(path => path.className === DaSelector.CLS_SET.main)

    if (needNoResponse) {
      return false
    } else if (isOutsideComponent) {
      this.togglePanel(false)
      return false
    }

    this.togglePanel()
    if (this.state.isPanelVisible) this.searcher.focus()
  };

  handleSearcherEvent = event => {
    const value = event.target.value
    if (typeof value !== 'string') return false

    let searchResults = this.props.optionDataList.filter(optionData => {
      if (!optionData) return false

      const searchYield = [
        optionData.id || '',
        optionData.display || ''
      ].join('::').toLowerCase()

      if (~searchYield.indexOf(value.toLowerCase())) return true
      else return false
    })

    this.setState({
      optionDataList: (searchResults.length)
        ? searchResults
        : [{ id: null, display: 'no result' }],
    })
  };
}

export default DaSelector
