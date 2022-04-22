describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Alphonzo Escolar',
      username: 'aescolar',
      password: 'sekret'
    }
    const user2 = {
      name: 'Marcus Aurelius',
      username: 'emperor',
      password: 'wisdom'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
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

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Title One',
          author: 'Author One',
          url: 'urlone.com'
        })
        cy.createBlog({
          title: 'Title Two',
          author: 'Author Two',
          url: 'urltwo.com'
        })
        cy.createBlog({
          title: 'Title Three',
          author: 'Author Three',
          url: 'urlthree.com'
        })
      })

      it('one of those can be liked', function() {
        cy.contains('Title Two Author Two')
          .contains('view').click()
          .parent()
          .next()
          .contains('likes 0')
          .contains('like').click()

        cy.get('html').should('contain', 'likes 1')
      })

      it('one of those can be deleted', function() {
        cy.contains('Title Three Author Three')
          .contains('view').click()
          .parent()
          .next()
          .contains('remove').click()

        cy.get('html').should('not.contain', 'Title Three Author Three')
      })
    })
  })
})