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
  };

  static defaultProps = {
    placeholder: '',
    isPanelVisible: false,
  };

  constructor(props) {
    super(props)

    this.state = {
      optionDataList: props.optionDataList,
      selectedOptionData: props.selectedOptionData || props.optionDataList[0],
      isPanelVisible: props.isPanelVisible,
    }

    window.addEventListener('click', event => {
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
    }, false)
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
}

export default DaSelector
