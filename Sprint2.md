## Work Completed

We were able to integrate the front end with the back end and create a User inside of the mongo DB database and then have the User input their
information in the sign up and login page. We also implemented test cases using cypress for all of the buttons on the home page and for the login
page which ensures the UI will perform as expected when a User uses it. We also added unit tests for the backend which ensured that the backend would
recieve the information from the frontend. We also, added a test to ensure the login is working properly and ensure we could find a created user
within the database which we have created. We also added an option on the front page which would ask the user signing up weather they were a doctor.
If, no is selected we assume the patient is a patient.

## Issues for this sprint:

### Front End

Ensuring User information is being sent to the back end
Cypress testing
Selecting physician or patient
Creating pages onced logged in
Creating taskbar for once logged in

### Cypress Tests

#### Test Case 1 - Home Page Works

The test starts by visiting the home page of the web application using cy.visit('http://localhost:3000').
Then it checks if the 'Login' button exists on the page using cy.findAllByText('Login').should('exist').
After verifying the existence of the 'Login' button, it clicks on it using cy.findAllByText('Login').click().
Then it checks if the 'Sign up' button exists on the page using cy.findAllByText('Sign up').should('exist').
After verifying the existence of the 'Sign up' button, it clicks on it using cy.findAllByText('Sign up').click().
Then it checks if the 'About Us' button exists on the page using cy.findAllByText('About Us').should('exist').
After verifying the existence of the 'About Us' button, it clicks on it using cy.findAllByText('About Us').click().
Finally, it checks if the 'User Info' button does not exist on the page using cy.findAllByText('User Info').should('not.exist').

#### Test Case 2 - Login Page Works

The test starts by visiting the login page of the web application using cy.visit('http://localhost:3000/Login').
Then it types in a test email address into the email input field using cy.findByPlaceholderText('Email').type('user@gmail.com').should('be.visible').
After that, it types in a test password into the password input field using cy.findByPlaceholderText('Password').type('user1234').
Then it clicks on the 'LOGIN' button using cy.findAllByText('LOGIN').click().
After logging in, it checks if the 'Forgot Password?' button exists on the page using cy.findAllByText('Forgot Password?').should('exist').
Then it clicks on the 'Forgot Password?' button using cy.findAllByText('Forgot Password?').click().
After that, it checks if the 'SIGN UP' button exists on the page using cy.findAllByText('SIGN UP').should('exist').
Finally, it clicks on the 'SIGN UP' button using cy.findAllByText('SIGN UP').click().

### Back End

Connecting the backend to take information from the front end
Unit testing for the database
Making sure the database is storing user information
Matching login attempts to known users.

## What Issues Were Successful

Our group was successful in being able to connect the front end and back end
We were also able to tests both the front end and the backend
We were able to make a way for a user signing up to be able to chose if they are a physician or patient
We were successfully able to test if a given login is successful or not.

## What Issues Were not Successful

Creating pages onced logged in
Creating taskbar for once logged in
