import React, {
  Component,
  PropTypes,
} from 'react'
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
  }

  render() {
    const classSet = DaSelector.classSet

    return (
      <div className={classSet.main}>
        <div className={classSet.placeholder}>
          { this.state.selectedOptionData.display }
        </div>

        <div className={classSet.searchWrap}>
          <input
            className={classSet.search}
            type="text"
            placeholder={this.state.selectedOptionData.display}
          />
          <span className={classSet.searchIcon}></span>
        </div>

        <span className={classSet.triangle}></span>

        <div className={classSet.panel}>
          <ul className={classSet.list}>
            { this.state.optionDataList.map(optionData => (
                <li
                  key={optionData.id}
                  className={classSet.item}
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
}

export default DaSelector
