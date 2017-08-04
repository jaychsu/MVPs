<template lang="pug">
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
