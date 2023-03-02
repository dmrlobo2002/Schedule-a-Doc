# Sprint 2 Report

## Work Completed

We were able to integrate the front end with the back end and create a User inside of the mongo DB database and then have the User input their
information in the sign up and login page. We also implemented test cases using cypress for all of the buttons on the home page and for the login
page which ensures the UI will perform as expected when a User uses it. We also added unit tests for the backend which ensured that the backend would
recieve the information from the frontend. We also, added a test to ensure the login is working properly and ensure we could find a created user
within the database which we have created. We also added an option on the front page which would ask the user signing up weather they were a doctor.
If, no is selected we assume the patient is a patient.

## Frontend Cypress Tests

We created two Cypress test cases to test the functionality of the frontend of the web application. Here are the details:

### Test Case 1 - Home Page Works

This test case verifies that all buttons on the home page of the web application are working correctly. Here are the steps involved:

1. Visit the home page of the web application using `cy.visit('http://localhost:3000')`.
2. Check if the 'Login' button exists on the page using `cy.findAllByText('Login').should('exist')`.
3. Click on the 'Login' button using `cy.findAllByText('Login').click()`.
4. Check if the 'Sign up' button exists on the page using `cy.findAllByText('Sign up').should('exist')`.
5. Click on the 'Sign up' button using `cy.findAllByText('Sign up').click()`.
6. Check if the 'About Us' button exists on the page using `cy.findAllByText('About Us').should('exist')`.
7. Click on the 'About Us' button using `cy.findAllByText('About Us').click()`.
8. Check if the 'User Info' button does not exist on the page using `cy.findAllByText('User Info').should('not.exist')`.

### Test Case 2 - Login Page Works

This test case verifies that the login page of the web application is functioning correctly. Here are the steps involved:

1. Visit the login page of the web application using `cy.visit('http://localhost:3000/Login')`.
2. Type in a test email address into the email input field using `cy.findByPlaceholderText('Email').type('user@gmail.com').should('be.visible')`.
3. Type in a test password into the password input field using `cy.findByPlaceholderText('Password').type('user1234')`.
4. Click on the 'LOGIN' button using `cy.findAllByText('LOGIN').click()`.
5. Check if the 'Forgot Password?' button exists on the page using `cy.findAllByText('Forgot Password?').should('exist')`.
6. Click on the 'Forgot Password?' button using `cy.findAllByText('Forgot Password?').click()`.
7. Check if the 'SIGN UP' button exists on the page using `cy.findAllByText('SIGN UP').should('exist')`.
8. Click on the 'SIGN UP' button using `cy.findAllByText('SIGN UP').click()`.

## Backend Unit Tests

We created a unit test case for the backend of the web application. Here are the details:

### Test Case 1 - TestMongoDBConnection

This test case verifies that the Go backend is able to connect to the MongoDB database. Here are the steps involved:

1. Set up the client options for connecting to a MongoDB Atlas cluster hosted on `mongodb+srv://cluster0.j5xkmde.mongodb.net` using a username and password of `cen3031`.
2. Create a MongoDB client by calling the mongo.Connect function and passing in the client options.
3. Check the connection to the MongoDB database by calling the Ping method on the client and passing in a nil context.
4. Disconnect the MongoDB client by calling the Disconnect method on the client.
5. Use the assert.NoError function to check if there were any errors while connecting, pinging, or disconnecting the MongoDB client. If there were no errors, the test passes. If there were any errors, the test fails and outputs the error message.

## What Issues Were Successful

Our team was successful in integrating the front end and back end, allowing users to create accounts and log in to the web application. We also successfully implemented Cypress test cases and unit tests for both the frontend and backend. Additionally, we were able to add a feature on the sign-up page that allows users to specify whether they are a doctor or a patient, and we were able to test logins to ensure they were successful.

## What Issues Were not Successful

We were not able to create pages that were only accessible to logged-in users or a taskbar that was only accessible to logged-in users. These issues will be addressed in future sprints.

## Backend Documentation
