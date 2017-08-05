<template lang="pug">
  .da-selector(
    :class="{ 'is-expanded': isPanelVisible }"
  )
    .da-selector-placeholder {{ selectedOptionData.display }}

    .da-selector-search-wrap
      input.da-selector-search(
        type="text"
        :placeholder="selectedOptionData.display"
      )
      span.da-selector-search-icon

    span.da-selector-triangle

    .da-selector-panel(
      :class="{ hide: !isPanelVisible }"
    )
      ul.da-selector-option-list
        li.da-selector-option-item(
          v-for="optionData in optionDataList"
          :class="{ active: optionData.id === selectedOptionData.id }"
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
      return {}
    },
    methods: {},
  }
</script>

<style src="./da-selector.css"></style>
