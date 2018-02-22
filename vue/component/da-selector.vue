<template lang="pug">
  .da-selector(
    ref="container"
    :class="{ 'is-expanded': isPanelVisible_ }"
  )
    .da-selector-placeholder {{ selectedOptionData_.display }}

    .da-selector-search-wrap
      input.da-selector-search(
        ref="searcher"
        type="text"
        :placeholder="selectedOptionData_.display"
      )
      span.da-selector-search-icon

    span.da-selector-triangle

    .da-selector-panel(
      :class="{ hide: !isPanelVisible_ }"
    )
      ul.da-selector-option-list
        li.da-selector-option-item(
          v-for="optionData in optionDataList_"
          :class="{ active: optionData.id === selectedOptionData_.id }"
          :data-optid="optionData.id"
          @click="() => selectOption(optionData)"
        ) {{ optionData.display }}

    label(
      :for="id"
    ) {{ placeholder }}
    input(
      type="hidden"
      :id="id"
      :name="name"
      :data-opt="selectedOptionData_.display"
      v-model="selectedOptionData_.id"
    )
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: '',
      },
      onChange: {
        type: Function,
        default: () => {},
      },

      optionDataList: {
        type: Array,
        required: true,
        default() {
          return [{
            id: null,
            display: '',
          }]
        },
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
    },
    data() {
      return {
        optionDataList_: this.optionDataList,
        selectedOptionData_: this.selectedOptionData,
        isPanelVisible_: this.isPanelVisible,
      }
    },
    methods: {
      selectOption(optionData) {
        // switch (optionData.id)
        // null -> invalid
        // '' -> empty but valid
        // 'any' -> valid
        if (optionData.id === null) return false

        if (!optionData.display) optionData.display = optionData.id

        this.onChange(optionData, this.selectedOptionData_)
        this.selectedOptionData_ = optionData

        this.togglePanel(false)
      },

      togglePanel(isPanelVisible) {
        if (isPanelVisible === undefined) {
          isPanelVisible = !this.isPanelVisible_
        } else {
          isPanelVisible = !!isPanelVisible
        }

        if (!isPanelVisible) {
          this.$refs['searcher'].value = ''
          this.$refs['searcher'].dispatchEvent(new Event('keyup'))
        }

        this.isPanelVisible_ = isPanelVisible
      },

      handlePageEvent(event) {
        const targetClass = event.target.className
        const needNoResponse = (
          ~targetClass.indexOf('da-selector-option') ||
          ~targetClass.indexOf('da-selector-search')
        )
        const isOutsideComponent = !this.$refs['container'].contains(event.target)

        if (needNoResponse) {
          return false
        } else if (isOutsideComponent) {
          this.togglePanel(false)
          return false
        }

        this.togglePanel()
        if (this.isPanelVisible_) {
          // Here is a hack to use `focus` within `setTimeout`
          setTimeout(() => this.$refs['searcher'].focus(), 0)
        }
      },

      handleSearcherEvent(event) {
        const value = event.target.value
        if (typeof value !== 'string') return false

        const searchResults = this.optionDataList.filter(optionData => {
          if (!optionData) return false

          const searchYield = [
            optionData.id || '',
            optionData.display || ''
          ].join('::').toLowerCase()

          if (~searchYield.indexOf(value.toLowerCase())) return true
          return false
        })

        this.optionDataList_ = (searchResults.length)
          ? searchResults
          : [{ id: null, display: 'no result' }]
      },
    },

    mounted() {
      window.addEventListener('click', this.handlePageEvent, false)
      this.$refs['searcher'].addEventListener('keyup', this.handleSearcherEvent, false)
    },
    beforeDestroy() {
      window.removeEventListener('click', this.handlePageEvent, false)
      this.$refs['searcher'].removeEventListener('keyup', this.handleSearcherEvent, false)
    },
  }
</script>

<style src="./da-selector.css"></style>
