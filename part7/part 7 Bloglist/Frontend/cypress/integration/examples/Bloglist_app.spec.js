describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'Annie',
      name: 'Annie',
      password: 'welcome'
    }
    cy.request('POST','http://localhost:3001/api/users', user)
    const user2 = {
      username: 'Bunny',
      name: 'Bunny',
      password: 'welcome'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user2)
    cy.visit('http://localhost:3000')
  })
  //5.17
  it('Login from is shown', function () {
    cy.contains('Login into Application')
    cy.get('form').contains('Submit')
    cy.get('#username').type('hello')
  })
  //5.18
  describe('Login', function () {
    it('Login with correct credentials', function () {
      cy.contains('Login into Application')
      cy.get('form').contains('Submit')
      cy.get('#username').type('Annie')
      cy.get('#password').type('welcome')
      cy.get('#submit').click()
      cy.contains('Annie has logged in')
    })

    it('Login with correct credentials', function () {
      cy.contains('Login into Application')
      cy.get('form').contains('Submit')
      cy.get('#username').type('wrong')
      cy.get('#password').type('details')
      cy.get('#submit').click()
      cy.get('.error').contains('invalid username or password')
    })
  })
  //5.19
  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Annie', password: 'welcome' })
    })

    it('A blog can be created', function() {
      cy.contains('Add New Blog').click()
      cy.get('form').contains('Submit')
      cy.get('#title').type('New Blog for the world')
      cy.get('#author').type('Author')
      cy.get('#url').type('New Blog for the world')
      cy.contains('Submit').click()
      cy.contains('New Blog for the world by Author')
    })
    //5.20
    it('user can like a blog', function(){
      cy.createBlog({ title:'new Blog', author:'swetha', url:'www.blog.com' })
      cy.contains('Show').click()
      cy.contains('0')
      cy.contains('Like').click()
      cy.should('not.contain', '0')
    })
    //5.21
    it('Created User can delete the blog', function(){
      cy.createBlog({ title: 'Delete Blog', author: 'swetha', url: 'www.blog.com' })
      cy.contains('Delete Blog')
      cy.contains('Show').click()
      cy.contains('Like').click()
      cy.get('#remove').click().then(($el) => {
        Cypress.dom.isDetached($el) // false
      })
      cy.get('.main').should('not.contain','Delete Blog')
    })

    it('Non Creator unable to delete the blog', function(){
      cy.createBlog({ title: 'Delete Blog', author: 'Annie', url: 'www.blog.com' })
      cy.get('#logout').click()
      cy.login({ username:'Bunny', password:'welcome' })
      cy.contains('Delete Blog')
      cy.contains('Show').click()
      cy.get('#remove').click().then(($el) => {
        Cypress.dom.isDetached($el) // false
      })
      cy.get('.main').should('contain', 'Delete Blog')
    })
    //5.22
    it.only('Blogs sorted', function(){
      cy.createBlog({ title: 'Blog 1', author: 'Annie', url: 'www.blog.com' })
      cy.contains('Show').click()
      cy.contains('Like').click()
      cy.createBlog({ title: 'Blog 2', author: 'Bunny', url: 'www.blog.com' })
      cy.contains('Blog 2').contains('Show').click()
      cy.contains('Blog 2').contains('Like').click()
      cy.wait(1000)
      cy.contains('Blog 2').contains('Like').click()
      cy.createBlog({ title: 'Blog 3', author: 'cydney', url: 'www.blog.com' })
      cy.contains('Blog 3').contains('Show').click()
      cy.wait(1000)
      cy.contains('Blog 3').contains('Like').click()
      cy.wait(1000)
      cy.contains('Blog 3').contains('Like').click()
      cy.wait(1000)
      cy.contains('Blog 3').contains('Like').click()
      cy.createBlog({ title: 'Blog 4', author: 'Danny', url: 'www.blog.com' })
      cy.contains('Blog 4').contains('Show').click()
      cy.contains('Blog 4').contains('Like').click()
      cy.wait(1000)
      cy.contains('Blog 4').contains('Like').click()
      cy.wait(1000)
      cy.contains('Blog 4').contains('Like').click()
      cy.wait(1000)
      cy.contains('Blog 4').contains('Like').click()
      cy.wait(1000)
      cy.contains('Blog 4').contains('Hide').click()
      cy.get('.Blog').then(blogs => {
        expect(blogs[0]).to.contain('Blog 4')
      })
    })
  })
})

