describe('bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')

    const users = [
      {
        name: 'Andy',
        username: 'User One',
        password: 'abcd123',
      },
      {
        name: 'Django',
        username: 'User Two',
        password: 'p@ssword',
      },
    ]

    cy.request('POST', 'http://localhost:3003/api/users', users[0])
    cy.request('POST', 'http://localhost:3003/api/users', users[1])
    cy.visit('http://localhost:3000')
  })

  it('opens to a login form', function () {
    cy.contains('log in to continue...')
  })

  describe('Login form', function () {
    it('will log in a user with valid credentials', function () {
      cy.get('#username').type('User One')
      cy.get('#password').type('abcd123')
      cy.get('#login-button').click()
      cy.contains('logged in')
    })

    it('will not log in a user with invalid credentials', function () {
      cy.get('#username').type('Wrong Username')
      cy.get('#login-button').click()
      cy.contains('error: missing or invalid credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'User One',
        password: 'abcd123',
      })
      cy.visit('http://localhost:3000')
    })

    it('the user can create a new blog entry', function () {
      cy.get('#add-blog-button').click()
      cy.get('#title').type('A New Blog')
      cy.get('#author').type('Octopus')
      cy.get('#url').type('www.8legs.com')
      cy.get('#submit-blog-button').click()
      cy.contains('A New Blog by Octopus')
    })

    describe('when a user interacts with the blogs list', function () {
      beforeEach(function () {
        const blogs = [
          {
            url: 'www.waitforit.com',
            title: 'How to Use Async/Await',
            author: 'John Doe',
            likes: 8,
          },
          {
            url: 'www.nowigetit.com',
            title: 'Understanding Mongoose Virtuals',
            author: 'Jane Doe',
            likes: 4,
          },
          {
            url: 'localhost:3000',
            title: 'How to Play the Guitar',
            author: 'Django',
            likes: 44,
          },
        ]

        blogs.forEach((blog) => {
          cy.createBlog(blog)
        })
        cy.visit('http://localhost:3000')
      })

      it('the user can like a blog', function () {
        cy.get('.blog').eq(0).find('button').click()
        cy.contains('likes')
        cy.get('[data-cy="like-button"]').click()
        cy.get('.blog').should('contain', '45')
      })

      it('the user can delete a blog', function () {
        cy.get('.blog').eq(1).find('button').click()
        cy.get('[data-cy="remove-button"]').click()
        cy.get('#blogs-list').should('not.contain', 'How to Use Async/Await')
      })

      it('a user cannot delete a blog created by another user', function () {
        cy.get('#logout-button').click()
        cy.visit('http://localhost:3000')
        cy.get('#username').type('User Two')
        cy.get('#password').type('p@ssword')
        cy.get('#login-button').click()
        cy.get('.blog').eq(0).find('button').click()
        cy.get('.blog').should('not.contain', '[data-cy="remove-button"]')
      })

      it('shows the blogs in order according to the number of likes', function () {
        cy.get('.blog').eq(0).should('contain', 'How to Play the Guitar')
        cy.get('.blog').eq(1).should('contain', 'How to Use Async/Await')
        cy.get('.blog')
          .eq(2)
          .should('contain', 'Understanding Mongoose Virtuals')
      })
    })
  })
})
