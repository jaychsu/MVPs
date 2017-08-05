<template lang="pug">
  .da-selector(
    ref="container"
    :class="{ 'is-expanded': pri_isPanelVisible }"
  )
    .da-selector-placeholder {{ selectedOptionData.display }}

    .da-selector-search-wrap
      input.da-selector-search(
        ref="searcher"
        type="text"
        :placeholder="selectedOptionData.display"
      )
      span.da-selector-search-icon

    span.da-selector-triangle

    .da-selector-panel(
      :class="{ hide: !pri_isPanelVisible }"
    )
      ul.da-selector-option-list
        li.da-selector-option-item(
          v-for="optionData in optionDataList"
          :class="{ active: optionData.id === selectedOptionData.id }"
          @click="() => selectOption(optionData)"
        ) {{ optionData.display }}

    label(
      :for="id"
    ) {{ placeholder }}
    input(
      type="hidden"
      :id="id"
    )
</template>

<script>
  const OptionData = {
    id: '',
    display: '',
  }

  const ID_NO_RESULT = 'no-result'
  const NULL_FN = () => {}

  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
      optionDataList: {
        type: Array,
        required: true,
        default() {
          return [ OptionData ]
        },
      },
      placeholder: {
        type: String,
        default: '',
      },
      selectedOptionData: {
        type: Object,
        default() {
          return this.optionDataList[0]
        },
      },
      isPanelVisible: {
        type: Boolean,
        default: false,
      },
      onChange: {
        type: Function,
        default: NULL_FN,
      },
    },
    data() {
      return {
        pri_isPanelVisible: this.isPanelVisible,
      }
    },
    methods: {
      selectOption(optionData) {
        if (optionData.id === ID_NO_RESULT) return false

        if (!optionData.display) optionData.display = optionData.id

        const prevOptionData = this.selectedOptionData
        this.onChange(optionData, prevOptionData)
        this.selectedOptionData = optionData

        this.togglePanel(false)
      },
      togglePanel(isPanelVisible) {
        if (typeof isPanelVisible === 'undefined') {
          isPanelVisible = !this.pri_isPanelVisible
        } else {
          isPanelVisible = !!isPanelVisible
        }

        this.pri_isPanelVisible = isPanelVisible
      },
      handlePageEvent(event) {
        const targetClass = event.target.className
        const isOutsideComponent = !this.$refs['container'].contains(event.target)
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
          if (this.pri_isPanelVisible) {
            // Here is a hack to use `focus` within `setTimeout`
            setTimeout(() => this.$refs['searcher'].focus(), 0)
          }
        }
      },
    },

    mounted() {
      window.addEventListener('click', this.handlePageEvent, false)
    },
    beforeDestroy() {
      window.removeEventListener('click', this.handlePageEvent, false)
    },
  }
</script>

<style src="./da-selector.css"></style>
