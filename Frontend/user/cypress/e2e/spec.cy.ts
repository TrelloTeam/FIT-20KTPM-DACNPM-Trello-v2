/// <reference types="Cypress" />
import '@4tw/cypress-drag-drop'
describe('Move a cardlist', () => {
  it('Go to react page', () => {
    cy.visit('http://127.0.0.1:4173/')
    cy.get('#Board_0').click()
    cy.get('#CardId1').drag('#CardId3', {
      force: true
    })
    cy.get('#CardId3').trigger('mouseup', { force: true, button: 0 })
    // cy.get('#65effd108b425dd09c0fe3fe').drag('#65effd068b425dd09c0fe3f7')
    cy.get('#CardlistId2 > #CardId4').should('exist')
  })
})
