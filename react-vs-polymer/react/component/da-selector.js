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
    id: PropTypes.string,
    placeholder: PropTypes.string,
    optionDataList: PropTypes.arrayOf(OptionData),
    selectedOptionData: OptionData,
    isPanelVisible: PropTypes.bool,
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        Hello World!
      </div>
    )
  }
}

export default DaSelector
