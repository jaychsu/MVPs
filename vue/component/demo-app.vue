<template lang="pug">
  div
    p
      | Your choice is:
      span#user-choice {{ selectOption.display }}
    da-selector(
      id="demo-selector"
      name="input name"
      placeholder="input placeholder"
      :optionDataList="optionDataList"
      :onChange="onChange"
    )
</template>

<script>
  import DaSelector from './da-selector.vue'

  export default {
    components: { DaSelector },
    data() {
      const optionDataList = getRandomData(20)
      return {
        optionDataList,
        selectOption: {},
      }
    },
    methods: {
      onChange(newOption, oldOption) {
        this.selectOption = newOption
      },
    },
  }

  function getRandomData(length) {
    const result = [{
      id: '',
      display: 'Please select an option',
    }]

    for (let i = 1; i < length; i++) {
      result.push({
        id: `id-${i}`,
        display: `${i} - ${Math.random().toString(16).slice(2)}`,
      })
    }

    return result
  }
</script>

<style src="../shared/reset.css"></style>
<style src="./demo-app.css"></style>
