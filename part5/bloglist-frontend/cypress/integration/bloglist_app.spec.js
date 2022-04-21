describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Alphonzo Escolar',
      username: 'aescolar',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('aescolar')
      cy.get('#password').type('sekret')
      cy.contains('login').click()

      cy.contains('Alphonzo Escolar logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('aescolar')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('.notification')
        .should('contain', 'username or password is invalid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})