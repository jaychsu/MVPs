/**
 * DA Selector
 * ======
 * Author: Jaych Su
 * Email: jaych.su@autodesk.com
 */

(function ($) {
  'use strict'

  var classSet = {
    'main': 'da-selector',
    'panel': 'da-selector-panel',
    'list': 'da-selector-option-list',
    'item': 'da-selector-option-item',
    'searchWrap': 'da-selector-search-wrap',
    'searchIcon': 'da-selector-search-icon',
    'search': 'da-selector-search',
    'placeholder': 'da-selector-placeholder',
    'triangle': 'da-selector-triangle'
  }

  var NULL_FN = function () {}
  var idNoResult = 'no-result'

  $.fn.initDaSelector = function (cfg) {
    var $target = this
    var config = $.extend({
      'needSearcher': false,
      'isTriangleShown': true,
      'placeholder': '',
      'inputID': '',
      'inputClassNames': '',

      /**
       * [
       *   ...{
       *     'id': string,
       *     'display': string
       *   }
       * ]
       */
      'optionDataList': [],

      // callback
      'onChange': NULL_FN, // params: newValue, oldValue
    }, cfg)

    if (!config.inputID) {
      console.error('[ERROR] failed to initialize '+ $target.selector)
      return null
    }

    if (typeof Array.prototype.filter !== 'function') {
      console.warn('[WARNING] failed to initialize searcher under current browser')
      config.needSearcher = false
    }

    $target.addClass(classSet.main)
    $target.html(generateSelectChild(config))
    addListener($target, config)

    var handler = {
      'setValue': function (value) {
        return _setValue($target, config, value)
      },
      'getValue': function () {
        return _getValue($target, config)
      },
      'resetValue': function () {
        return _setValue($target, config, config.optionDataList[0].id)
      },
      'updateOptionList': function (optionDataList) {
        return _updateOptionList($target, optionDataList)
      },
      'togglePanel': function (isPanelVisible) {
        $target.trigger('toggle-panel', isPanelVisible)
      }
    }

    handler.resetValue()

    return handler
  }

  function addListener($target, config) {
    var $body = $('body')
    var targetSelector = $target.selector
    var isPanelVisible = false
    var selectorValue = null

    $target.on('toggle-panel', function (e, isOpen) {
      if (typeof isOpen === 'undefined') {
        isOpen = !isPanelVisible
      } else {
        isOpen = !!isOpen
      }
      isPanelVisible = isOpen
      togglePanel($target, isOpen)
    })

    // // A way more concise to check if it is within the component scope
    // window.addEventListener('click', event => {
    //   const isOutsideComponent = !event.path.find(path => path === $target[0])
    //   console.log(isOutsideComponent)
    // }, false)

    $body.on('click', function (e) {
      if ((e.target.className || '').indexOf(classSet.search) > -1) return false

      var $elem = $(e.target)
      var isInScope = $target.attr('id') === $elem.attr('id') || $target.find(e.target).length > 0

      if (isInScope) {
        isPanelVisible = !isPanelVisible
      } else {
        isPanelVisible = false
      }

      togglePanel($target, isPanelVisible)
    })

    $body.on('click', targetSelector+' .'+classSet.item, function (e) {
      var $this = $(this)
      var value = $this.data('value')

      if (value === idNoResult) return false

      _setValue($target, config, value)
    })

    $body.on('change', '#'+config.inputID, function (event) {
      var value = event.target.value
      config.onChange(value, selectorValue)
      selectorValue = value
    })

    config.needSearcher && $body.on('keyup', targetSelector+' .'+classSet.search, function (e) {
      var value = e.target.value
      if (typeof value !== 'string') return false

      var searchResults = config.optionDataList.filter(function (optionData) {
        if (!optionData) return false
        var searchYield = [
          optionData.id || '',
          optionData.display || ''
        ].join('::')
        if (searchYield.toLowerCase().indexOf(value.toLowerCase()) > -1) return true
      })

      searchResults = (searchResults.length > 0)
        ? searchResults
        : [{ id: idNoResult, display: 'no result' }]

      _updateOptionList($target, searchResults)
    })
  }

  function togglePanel($target, isPanelVisible) {
    if (isPanelVisible) {
      $target.addClass('is-expanded')
      $target.find('.'+classSet.panel).removeClass('hide')
      $target.find('.'+classSet.search).focus()
    } else {
      $target.removeClass('is-expanded')
      $target.find('.'+classSet.panel).addClass('hide')
    }
  }

  function generateSelectChild(config) {
    var searcher = (config.needSearcher)
      ? [
          '<div class="'+ classSet.searchWrap +'">',
            '<input class="'+ classSet.search +'" type="text" />',
            '<span class="'+ classSet.searchIcon +'"></span>',
          '</div>'
        ].join('')
      : ''
    var triangle = (config.isTriangleShown)
      ? '<span class="'+ classSet.triangle +'"></span>'
      : ''

    return [
      '<div class="'+ classSet.placeholder +'"></div>',
      searcher,
      triangle,
      generateOptionList(config.optionDataList),
      '<label for="'+ config.inputID +'">'+ config.placeholder +'</label>',
      '<input class="'+ config.inputClassNames +'" id="'+ config.inputID +'" type="hidden" />'
    ].join('')
  }

  function generateOptionList(optionDataList) {
    if (!optionDataList) return ''

    return [
      '<div class="'+ classSet.panel +' hide">',
        '<ul class="'+ classSet.list +'">',
          generateOptions(optionDataList),
        '</ul>',
      '</div>'
    ].join('')
  }

  function generateOptions(optionDataList) {
    if (!optionDataList) return ''

    return $.map(optionDataList, function (optionData) {
      if (!optionData.id) optionData.id = ''
      var display = optionData.display || optionData.id
      return [
        '<li ',
          'class="'+ classSet.item +'" ',
          'data-value="'+ optionData.id +'" ',
          'title="'+ display +'" ',
        '>',
          display,
        '</li>'
      ].join('')
    }).join('')
  }

  function _setValue($target, config, value) {
    var $options = $target.find('.'+classSet.item)
    var $selectedOption = $options.closest('[data-value="'+ value +'"]')

    if ($selectedOption.length < 1) return false

    var $input = $('#'+config.inputID)
    var display = $selectedOption.text().trim()
    $input.attr('title', display).val(value).trigger('change')
    $target.find('.'+classSet.placeholder).text(display)
    config.needSearcher && $target.find('.'+classSet.search).attr('placeholder', display)

    $selectedOption.addClass('active')
      .siblings().removeClass('active')

    return true
  }

  function _getValue($target, config) {
    return $('#'+config.inputID).val()
  }

  function _updateOptionList($target, optionDataList) {
    if ($target.find('.'+classSet.list).length < 1) return false

    var options = generateOptions(optionDataList)
    $target.find('.'+classSet.list).html(options)

    return true
  }
})(window.jQuery)
