
describe('empty spec', () => {
  it('Home Page works', () =>{
    cy.visit('http://localhost:3000')
    cy.findAllByText('Login').should('exist');
    cy.findAllByText('Login').click();
    cy.findAllByText('Sign up').should('exist');
    cy.findAllByText('Sign up').click();
    cy.findAllByText('About Us').should('exist');
    cy.findAllByText('About Us').click();
    cy.findAllByText('User Info').should('not.exist');
  })

  it('Login Works', () =>{
    cy.visit('http://localhost:3000/Login')
    cy.findByPlaceholderText('Email').type('user@gmail.com').should('be.visible');
    cy.findByPlaceholderText('Password').type('user1234');
    cy.findAllByText('LOGIN').click();
    cy.findAllByText('Forgot Password?').should('exist');
    cy.findAllByText('Forgot Password?').click();
    cy.findAllByText('SIGN UP').should('exist');
    cy.findAllByText('SIGN UP').click();
    
  })

  it('Patient dashboard Works', () =>{
    cy.visit('http://localhost:3000/patient-dashboard')
    cy.findAllByText('Dashboard').should('exist');
    cy.findAllByText('Dashboard').click();
    cy.findAllByText('Calendar').should('exist');
    cy.findAllByText('Calendar').click();
    cy.findAllByText('About Us').should('exist');
    cy.findAllByText('About Us').click();
    cy.findAllByText('User Info').should('not.exist');
  })
  
})