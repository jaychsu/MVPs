<template lang="pug">
  da-selector(
    id="demo-selector"
    placeholder="This is yield name"
    :optionDataList="optionDataList"
    :onChange="onChange"
  )
</template>

<script>
  import DaSelector from './da-selector.vue'

  export default {
    components: { DaSelector },
    data() {
      return {
        optionDataList: getRandomData(20),
        onChange(newOption, oldOption) {},
      }
    },
  }

  function getRandomData(length) {
    let result = []
      , i

    result.push({
      id: 'id-0',
      display: 'Please select an option',
    })

    for (i = 1; i < length; i++) {
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
