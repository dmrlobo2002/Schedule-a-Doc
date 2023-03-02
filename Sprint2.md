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
2. Create a MongoDB client by calling the `mongo.Connect` function and passing in the client options.
3. Check the connection to the MongoDB database by calling the `Ping` method on the client and passing in a nil context.
4. Disconnect the MongoDB client by calling the Disconnect method on the client.
5. Use the `assert.NoError` function to check if there were any errors while connecting, pinging, or disconnecting the MongoDB client. If there were no errors, the test passes. If there were any errors, the test fails and outputs the error message.

## What Issues Were Successful

Our team was successful in integrating the front end and back end, allowing users to create accounts and log in to the web application. We also successfully implemented Cypress test cases and unit tests for both the frontend and backend. Additionally, we were able to add a feature on the sign-up page that allows users to specify whether they are a doctor or a patient, and we were able to test logins to ensure they were successful.

## What Issues Were not Successful

We were not able to create pages that were only accessible to logged-in users or a taskbar that was only accessible to logged-in users. These issues will be addressed in future sprints.

## Backend Documentation

### Using the Go-based Backend API in React via Axios

To use the Go-based Backend API in React via Axios, follow the steps below:

1. Install Axios by running npm install axios in your React project directory.
2. Create a new file called api.js in your React project directory.
3. Import Axios and define the base URL for your API:

```
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
```

4. Define functions for each API endpoint you want to use. For example, to create a new user, you can define the following function:

```
export const createUser = (user) => {
  return axios.post(`${API_BASE_URL}/signup`, user);
};
```

5. Call the API functions from your React components. For example, to create a new user, you can call the createUser function like this:

```
import { createUser } from './api';

const handleSubmit = async (event) => {
  event.preventDefault();
  const user = {
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    isDoctor: false,
  };
  try {
    const response = await createUser(user);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
```

The createUser function is called with a user object as an argument. The function returns a Promise that resolves with the response data from the API. The response data can be accessed in the try block or caught in the catch block if an error occurs.

With these steps you can use our Go-based backend API in React using Axios.

### Directory: server

#### File: .env

This file contains the environment variables used in the backend, such as the database connection string, server port, and other configurations. These variables are loaded into the application at runtime using the third-party library `godotenv`. It is important to keep this file secure and not expose it to the public, as well as keep it in the gitignore for version control.

### File: go.mod, go.sum

These files are used by Go to manage dependencies of the application. `go.mod` contains a list of required packages, along with their version, while go.sum is used to verify the integrity of those packages. When a new package is added or removed, these files are updated accordingly.

### File: main.go

This file is the entry point for the backend application. It initializes the server, sets up the database connection, registers the routes and middleware, and starts listening for incoming requests. The main function calls other functions defined in the codebase to set up the application.

In this file, the main function is defined, which is the entry point of the application. It first checks for the environment variable PORT to determine which port the server should listen on. If the PORT environment variable is not set, it defaults to port 8000.

The gin router is then initialized using `gin.New()`. The `gin.Logger()` middleware is added to log incoming requests. The `cors.Default()` middleware is added to handle Cross-Origin Resource Sharing (CORS) requests.

Gin is a web framework for Go language that provides a routing mechanism to handle HTTP requests. A router in Gin is responsible for directing incoming requests to the appropriate handler function based on the request path and method. It defines a set of routes, each of which maps to a specific handler function.

The router in Gin is responsible for matching the incoming request URL with the defined routes and passing control to the appropriate handler function to process the request. This is achieved by registering the handler function with the appropriate HTTP method (GET, POST, PUT, DELETE) and URL pattern using the router's methods.

In the main.go file, the router variable is created using the `gin.New()` function, which returns a new instance of the Gin router. The router instance is then used to register the endpoints for handling incoming requests, such as `/signup, /appointment`, and `/login`. These endpoints correspond to the create user, create appointment, and login functionality respectively.
Finally, the `router.Run()` method is called to start the HTTP server and listen for incoming requests on the specified port.

### Directory: server/models

#### File: appointment.go

This code defines a struct named Appointment which represents an appointment in the system. The struct has five fields: `ID, Date, Category, Patient, Doctor, and IsApproved`.
ID is of type primitive.ObjectID and is mapped to the `_id` field in MongoDB.
Date is a pointer to a string and is mapped to the `date` field in JSON.
Category is a pointer to a string and is mapped to the category field in JSON.
Patient is of type `primitive.ObjectID` and is mapped to the `_patientID` field in MongoDB.
Doctor is of type `primitive.ObjectID` and is mapped to the `_doctorID` field in MongoDB.
`IsApproved` is a pointer to a bool and is mapped to the isDoctor field in JSON.
The `ID` field is used to uniquely identify an appointment in the database. The Date field represents the date of the appointment. The Category field represents the category of the appointment, such as "General Checkup" or "Dental". The Patient field represents the patient associated with the appointment, while the Doctor field represents the doctor associated with the appointment. The IsApproved field is used to determine whether the appointment has been approved by the doctor.

#### File: user.go

The `user.go` file defines the User struct and functions for managing users in the backend. It provides functionality for creating, retrieving, updating, and deleting users in the database. This file also defines the MongoDB colle
ction used for storing users. This struct contains the following fields:

1. ID: a `primitive.ObjectID` type that represents the unique identifier of the user in the database. This field is mapped to the `_id` field in MongoDB.
2. Email: a pointer to a string that holds the user's email address.
3. PhoneNumber: a pointer to a string that holds the user's phone number.
4. Password: a pointer to a string that holds the user's password. Note that storing passwords in plain text is not recommended and should be avoided in production environments.
5. FirstName: a pointer to a string that holds the user's first name.
6. LastName: a pointer to a string that holds the user's last name.
7. IsDoctor: a pointer to a boolean that indicates whether the user is a doctor or not.
   The fields in the User struct are mapped to fields in the MongoDB document using BSON tags. The ID field is mapped to the `_id` field in MongoDB, while the other fields are mapped to fields with the same name as the struct field. Note that the `Email, PhoneNumber, Password, FirstName, LastName,` and `IsDoctor` fields are all pointers to string or boolean values. This is because these fields can be optional, and we want to be able to distinguish between a missing value and an empty string or false boolean value.

### Directory: server/routes

#### File: connection.go

The `connection.go` file contains functions responsible for creating a connection to the MongoDB database and returning a database instance and a collection instance.

The `DBinstance` function first loads the environment variables using the godotenv package. It then retrieves the `MONGODB_URL` variable from the loaded environment variables, which should contain the URL for the MongoDB database. A new MongoDB client is created using the `mongo.NewClient` function, which takes an options struct that contains the URI for the MongoDB database. If there's an error creating the client, the function logs the error and terminates the program. Next, the function creates a context with a timeout of 10 seconds using `context.WithTimeout`, which is used to manage the client's lifecycle.

The Connect method is then called on the client with the created context, which establishes a connection to the MongoDB database. If there's an error connecting to the database, the function logs the error and terminates the program.

Finally, the function returns the MongoDB client, which can be used to access the database.

The Client variable is defined as a global variable, which is initialized by calling the DBinstance function. This variable provides a singleton instance of the MongoDB client throughout the application.

The `OpenCollection` function takes the MongoDB client and the name of the collection as arguments. It retrieves the specified collection from the database by calling `client.Database("cluster0").Collection(collectionName)`. The name of the database `cluster0` was set up manually through MongoDB. The function then returns the collection instance, which can be used to perform CRUD operations on the specified collection.

Overall, the functions in this file provide a simple way to connect to a MongoDB database and retrieve a collection instance. These can be used in other parts of the application to perform database operations.

### File: signup.go

The `signup.go` file includes code that defines three routes for a server: one for creating a user, another for creating an appointment, and a third for user authentication (login).

1. The `CreateUser()` function creates a new user by first binding the incoming JSON request body to a `models.User` struct. It then validates the user struct using the validator package. If the validation fails, it returns a response with a `BadRequest` HTTP status code and an error message. Otherwise, it generates a new MongoDB object ID for the user and inserts it into the users collection of the MongoDB database. If the insertion fails, it returns a response with an `InternalServerError` HTTP status code and an error message. Otherwise, it returns a response with an `OK` HTTP status code and the result of the insertion.

2. The `CreateAppointment()` function creates a new appointment in a similar way to CreateUser(). It binds the incoming JSON request body to a models.Appointment struct, validates it, generates a new MongoDB object ID for the appointment, inserts it into the appointments collection of the MongoDB database, and returns a response with an appropriate HTTP status code and message.

3. The `Login()` function handles user authentication. It binds the incoming JSON request body to a `models.User` struct and checks if a user with the provided email exists in the users collection of the MongoDB database. If it does not exist, it returns a response with a `BadRequest` HTTP status code and an error message. If the user exists, it checks if the provided password matches the password of the existing user. If it does not match, it returns a response with a `BadRequest` HTTP status code and an error message. Otherwise, it generates a JSON Web Token (JWT) using the `jwt-go` package, signs and encodes the token with a secret key, and returns the token in a response with an `OK` HTTP status code.
   Note that this code uses the gin package to handle HTTP requests and responses, the `go.mongodb.org/mongo-driver` package to interact with a MongoDB database, and the `github.com/go-playground/validator/v10` package to validate input data.

### File: connection_test.go

This file contains unit tests for the database connection. It tests whether the connection is established successfully, whether the database collections are created, and whether queries to the database return expected results. The Go file contains a test function named `TestMongoDBConnection`. This test function tests whether the application can connect to MongoDB successfully.

The first step of the test function is to set up MongoDB client options using the `options.Client().ApplyURI()` function, which takes a connection string as an argument. In this case, the connection string is `"mongodb+srv://cen3031:cen3031@cluster0.j5xkmde.mongodb.net/?retrxyWrites=true&w=majority"`.

Next, the test function creates a MongoDB client using the `mongo.Connect()` function, passing in the `clientOptions` variable and a `context.Background()` context. If an error occurs while creating the client, the `assert.NoError(t, err)` function will fail the test.

The third step is to check whether the connection to MongoDB is successful using the `client.Ping()` function, which takes a context and options as arguments. If an error occurs while pinging the server, the `assert.NoError(t, err)` function will fail the test.

Finally, the test disconnects the MongoDB client using the client.`Disconnect()` function, passing in a `context.Background()` context. If an error occurs while disconnecting the client, the `assert.NoError(t, err)` function will fail the test.
Overall, this test function ensures that the application can connect to the MongoDB server and perform basic operations, such as pinging the server and disconnecting from it.
