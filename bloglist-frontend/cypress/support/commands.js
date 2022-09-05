Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('userObject', JSON.stringify(body))
  })
})

Cypress.Commands.add('createBlog', ({ url, title, author, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { url, title, author, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('userObject')).token
      }`,
    },
  })
})
