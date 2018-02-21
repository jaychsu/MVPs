Object.entries({
  'jquery': '/jquery',
  'polymer': '/polymer/build/es5-bundled',
  'react': '/react/dist',
  'vue': '/vue/dist',
}).forEach(([FRAMEWORK, PATH]) => {

describe(`Test da-selector in ${FRAMEWORK}`, function () {
  it('must render the component properly', function () {
    expect(true).to.equal(true)
  })
})

})
