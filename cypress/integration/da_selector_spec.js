const CLS_SET = {
  main: '.da-selector',

  panel: '.da-selector-panel',
  list: '.da-selector-option-list',
  item: '.da-selector-option-item',

  searchWrap: '.da-selector-search-wrap',
  searchIcon: '.da-selector-search-icon',
  search: '.da-selector-search',

  placeholder: '.da-selector-placeholder',
  triangle: '.da-selector-triangle',
}

function slec(selector) {
  return `${CLS_SET.main}:first ${selector}`
}


Object.entries({
  react: '/react/dist',
  vue: '/vue/dist',
  jquery: '/jquery',
  polymer: '/polymer/build/es5-bundled',
}).forEach(([FRAMEWORK, PATH]) => {

describe(`Test da-selector in ${FRAMEWORK}`, function () {
  beforeEach(function () {
    cy.visit(PATH)

    cy.get(slec('> input')).then($input => {
      cy.wrap($input.attr('name')).as('inputName')
      cy.wrap($input.attr('id')).as('inputId')
    })
  })

  it('should render the component properly', function () {
    cy.get(slec(CLS_SET.placeholder)).should('have.length', 1)

    cy.get(slec(CLS_SET.searchWrap)).should('have.length', 1)
      .find(CLS_SET.search).should('have.length', 1)
      .siblings(CLS_SET.searchIcon).should('have.length', 1)

    cy.get(slec(CLS_SET.triangle)).should('have.length', 1)

    cy.get(slec(CLS_SET.panel)).should('have.length', 1)
      .find(CLS_SET.list).should('have.length', 1)
      .find(`${CLS_SET.item}.active`).should('have.length', 1)

    cy.get(slec('> input')).should('have.length', 1)
      .should('have.attr', 'name', this.inputName)
      .should('have.attr', 'id', this.inputId)

    cy.get(slec('> label')).should('have.length', 1)
      .should('have.attr', 'for', this.inputId)
  })

  it('should be able to toggle the panel visibility', function () {
    cy.get(slec(CLS_SET.panel)).should('be.not.visible')

    cy.get(slec(CLS_SET.placeholder)).click()
    cy.get(slec(CLS_SET.panel)).should('be.visible')

    cy.get(slec(CLS_SET.searchWrap)).click()
    cy.get(slec(CLS_SET.panel)).should('be.visible')

    cy.get('body').click()
    cy.get(slec(CLS_SET.panel)).should('be.not.visible')
  })

  it('should be able to select the option in the panel', function () {
    cy.get(slec(CLS_SET.panel)).should('be.not.visible')

    cy.get(slec(CLS_SET.placeholder)).click()
    cy.get(slec(CLS_SET.panel)).should('be.visible')
    cy.get(slec(CLS_SET.item)).should('have.length.at.least', 2)
      .eq(1).click().then($item => {
        const text = $item.text()
        const optid = $item.data('optid')
        cy.get(slec(CLS_SET.item)).eq(1).should('have.class', 'active')
        cy.get(slec(CLS_SET.placeholder)).should('contain', text)
        cy.get(slec(CLS_SET.search)).should('have.attr', 'placeholder', text)
        cy.get(slec('> input')).should('have.value', optid)

        cy.get('#user-choice').should('contain', text)
      })

    cy.get(slec(CLS_SET.panel)).should('be.not.visible')

    cy.get(slec(CLS_SET.placeholder)).click()
    cy.get(slec(CLS_SET.panel)).should('be.visible')
    cy.get(slec(CLS_SET.item)).should('have.length.at.least', 2)
      .eq(0).click().then($item => {
        const text = $item.text()
        const optid = $item.data('optid')
        cy.get(slec(CLS_SET.item)).eq(0).should('have.class', 'active')
        cy.get(slec(CLS_SET.placeholder)).should('contain', text)
        cy.get(slec(CLS_SET.search)).should('have.attr', 'placeholder', text)
        cy.get(slec('> input')).should('have.value', optid)

        cy.get('#user-choice').should('contain', text)
      })

    cy.get(slec(CLS_SET.panel)).should('be.not.visible')
  })

  it('should be able to search options and display the results only in the panel', function () {
    cy.get(slec(CLS_SET.panel)).should('be.not.visible')
    cy.get(slec(CLS_SET.search)).should('be.not.visible')

    cy.get(slec(CLS_SET.placeholder)).click()
    cy.get(slec(CLS_SET.panel)).should('be.visible')
    cy.get(slec(CLS_SET.search)).should('be.visible')

    cy.get(slec(CLS_SET.item)).should('have.length.at.least', 2)
      .eq(1).then($item => {
        const text = $item.text()
        cy.get(slec(CLS_SET.search)).type(text)
        cy.get(slec(CLS_SET.item)).should('have.length', 1)
          .first().should('contain', text)

        cy.get('body').click()
        cy.get(slec(CLS_SET.panel)).should('be.not.visible')
        cy.get(slec('> input')).should('have.not.value')

        cy.get(slec(CLS_SET.placeholder)).click()
        cy.get(slec(CLS_SET.panel)).should('be.visible')
        cy.get(slec(CLS_SET.search)).should('have.not.value')
      })
  })

  it('should be able to search options and select the result in the panel', function () {
    cy.get(slec(CLS_SET.panel)).should('be.not.visible')
    cy.get(slec(CLS_SET.search)).should('be.not.visible')

    cy.get(slec(CLS_SET.placeholder)).click()
    cy.get(slec(CLS_SET.panel)).should('be.visible')
    cy.get(slec(CLS_SET.search)).should('be.visible')

    cy.get(slec(CLS_SET.item)).should('have.length.at.least', 2)
      .eq(1).then($item => {
        const text = $item.text()
        const optid = $item.data('optid')
        cy.get(slec(CLS_SET.search)).type(text)
        cy.get(slec(CLS_SET.item)).should('have.length', 1)
          .first().should('contain', text)
          .click()

        cy.get(slec(CLS_SET.panel)).should('be.not.visible')
        cy.get(slec('> input')).should('have.value', optid)

        cy.get(slec(CLS_SET.placeholder)).should('contain', text)
          .click()
        cy.get(slec(CLS_SET.panel)).should('be.visible')
        cy.get(slec(CLS_SET.search)).should('have.not.value')
      })
  })
})

})
