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
      cy.login({ username: 'aescolar', password: 'sekret' })
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'aescolar', password: 'sekret' })
    })

    it('a blog can be created', function() {
      cy.createBlog({
        title: 'Testing with Cypress',
        author: 'Fonz Escolar',
        url: 'fonz-cypress.io'
      })

      cy.contains('Testing with Cypress Fonz Escolar')
    })

    it.only('a blog can be liked', function() {
      cy.createBlog({
        title: 'Testing with Cypress',
        author: 'Fonz Escolar',
        url: 'fonz-cypress.io'
      })

      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })
  })
})