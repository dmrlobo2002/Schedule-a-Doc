
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
    cy.findAllByText('SIGN UP').should('exist');
    cy.findAllByText('SIGN UP').click();
    
  })

  it('Patient dashboard Works', () =>{
    cy.visit('http://localhost:3000/Dashboard')
    cy.findAllByText('Patient Dashboard').should('exist');
    cy.findAllByText('Patient Dashboard').click();
    cy.findAllByText('Reports').should('exist');
    cy.findAllByText('Schedule Appointment').should('exist');
    cy.findAllByText('Profile').should('exist');
    cy.findAllByText('Calendar').should('exist');
    cy.findAllByText('Logout').should('exist');
    cy.findAllByText('Logout').click();
  })

  it('Doctor dashboard Works', () =>{
    cy.visit('http://localhost:3000/Dashboard')
    cy.findAllByText('Doctor Dashboard').should('exist');
    cy.findAllByText('Doctor Dashboard').click();
    cy.findAllByText('Patients').should('exist');
    cy.findAllByText('Appointment Requests').should('exist');
    cy.findAllByText('Profile').should('exist');
    cy.findAllByText('Daily Tasks').should('exist');
    cy.findAllByText('Calendar').should('exist');
    cy.findAllByText('Logout').should('exist');
    cy.findAllByText('Logout').click();
  })

  it('Forget Password works', () =>{
    cy.visit('http://localhost:3000')
    cy.findAllByText('Login').should('exist');
    cy.findAllByText('Login').click();
    cy.findAllByText('Forgot Password?').should('exist');
    cy.findAllByText('Forgot Password?').click();
    cy.findByPlaceholderText('Email').type('introtosoftware@ufl.edu').should('be.visible');
    cy.findAllByText('CONTINUE').click();
    cy.findByPlaceholderText('Verification Code').type('1234').should('be.visible');
    cy.findAllByText('CONTINUE').click();
    cy.findByPlaceholderText('New Password').type('hello').should('be.visible');
    cy.findByPlaceholderText('Confirm Password').type('hello').should('be.visible');
    cy.findAllByText('CONTINUE').click();
  })

  it('Dashboard Functionality', () =>{
    cy.visit('http://localhost:3000/Dashboard')
    cy.findAllByText('Doctor Dashboard').should('exist');
    cy.findAllByText('Doctor Dashboard').click();
    cy.findAllByText('Patients').should('exist');
    cy.findAllByText('Patients').click();
    cy.findAllByText('Alice Brown').should('exist');
    cy.findAllByText('Alice Brown').click();
    cy.findAllByText('View Lab Results').click();
    cy.findAllByText('Appointment Requests').should('exist');
    cy.findAllByText('Appointment Requests').click();
    cy.findAllByText('Profile').should('exist');
    cy.findAllByText('Profile').click();
    cy.findAllByText('Daily Tasks').should('exist');
    cy.findAllByText('Daily Tasks').click();
    cy.findAllByText('Logout').should('exist');
    cy.findAllByText('Logout').click();
  }) 


  it('Calendar', () =>{
    cy.visit('http://localhost:3000/Dashboard')
    cy.findAllByText('Doctor Dashboard').should('exist');
    cy.findAllByText('Doctor Dashboard').click();
    cy.findAllByText('Calendar').should('exist');
    cy.findAllByText('Calendar').click();
    cy.findAllByText('BACK').should('exist');
    cy.findAllByText('BACK').click();
    cy.findAllByText('Logout').should('exist');
    cy.findAllByText('Logout').click();
  }) 

  it('Doctor Profile', () =>{
    cy.visit('http://localhost:3000/Dashboard')
    cy.findAllByText('Doctor Dashboard').click();
    cy.findAllByText('Profile').should('exist');
    cy.findAllByText('Profile').click();
    cy.findAllByText('View Patients').click();
    cy.findAllByText('Profile').click();
    cy.findAllByText('View Tasks').click();
    cy.findAllByText('Profile').click();
    cy.findAllByText('View Requests').click();
    cy.findAllByText('Profile').click();
    cy.findAllByText('Calendar').click();
    cy.findAllByText('BACK').click();
    cy.findAllByText('Profile').click();
    cy.findAllByText('Daily Tasks').should('exist');
    cy.findAllByText('Daily Tasks').click();
    cy.findAllByText('Logout').should('exist');
    cy.findAllByText('Logout').click();
  }) 
})