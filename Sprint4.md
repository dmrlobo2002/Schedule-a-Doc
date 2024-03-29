# Sprint 4 Report

## Work Completed

Backend:
In this sprint, we focused on frurther implementing backend functionality with four key functions: GetAllDoctors, GetUserIDByEmail, ApproveDenyAppointment, and DeleteAppointment. GetAllDoctors retrieves all doctor records from the database. GetUserIDByEmail finds a user by their email and returns their ID. ApproveDenyAppointment updates the approval status of a specific appointment. Finally, DeleteAppointment removes an appointment from the database based on its ID. These functions help facilitate the management of doctors, users, and appointments within the web application. The task, however, that was most time consuming for this Sprint was actually being able to connect the frontend and backend when creating an appointment, this required the backend to dive deep into the frontend components with Axios. The way it was finally resolved was by returning a user's objectID (they are identified uniquely in the backend with a `primitive.ObjectID'), fromi their email, this is because since an email was a string, it could travel between frontend and backend, however the `objectID' could not: since emails are technically also unique to each user, we were able to use this instead. We also were able to add new test cases to test trying to insert a user with invalid fields to test for error handling, data quality assurance and also testing finding all of the doctors, both of these Go Tests had numerous cases.

Frontend:
During this sprint, our main focus was on enhancing the patient and doctor dashboards, along with their respective functionalities. Initially, we incorporated a calendar feature that enabled both patients and doctors to view their appointments and schedules. Moreover, we added a daily tasks page for doctors to help them manage their daily schedule. Another crucial feature we implemented was the ability for doctors to approve or reject schedule requests, in addition to providing them access to their patients' lab reports. Finally, we also worked on improving the design of previously developed pages. However, we faced some challenges during this sprint. One of the issues was connecting appointment requests with the calendar, so once the doctor approved a request, it could be added as an event on the calendar. We also initially struggled with accessing the patient's lab reports from the search bar, but we were able to resolve this issue. Another challenging aspect was determining the best structure for each tab to provide users with a coherent and easy-to-navigate interface. Nevertheless, through constant iteration and experimentation with different design ideas, we ultimately achieved a desirable and user-friendly design.


## Frontend Cypress Tests

We created eight Cypress test cases to test the functionality of the frontend of the web application. Here are the details:

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

### Test Case 3 - Patient dashboard Works
This test case verifies that usee can navigate to the patient dashboard and the web application is functioning correctly. Here are the steps involved:
1.Visit the dashboard page of the web application using `cy.visit('http://localhost:3000/Dashboard')`.
2. Check if the 'Patient Dashboard' button exists on the page using`cy.findAllByText('Patient Dashboard').should('exist')`.
3. Click the 'Patient Dashboard' button `cy.findAllByText('Patient Dashboard').click()`.
4. Check if the 'Reports' button exists on the page using `cy.findAllByText('Reports').should('exist')`.
5. Check if the 'Schedule Appointment' button exists on the page using `cy.findAllByText('Schedule Appointment').should('exist')`.
6. Check if the 'Profile' button exists on the page using `cy.findAllByText('Profile').should('exist')`.
7. Check if the 'Calendar' button exists on the page using `cy.findAllByText('Calendar').should('exist')`.
8. Check if the 'Logout' button exists on the page using `cy.findAllByText('Logout').should('exist')`.
9.Click on the 'Logout' button, should return back to homepage `cy.findAllByText('Logout').click()`.

### Test Case 4 - Doctor dashboard Works
This test case verifies that usee can navigate to the doctor dashboard and the web application is functioning correctly. Here are the steps involved:
1.Visit the dashboard page of the web application using `cy.visit('http://localhost:3000/Dashboard')`.
2. Check if the 'Doctor Dashboard' button exists on the page using `cy.findAllByText('Doctor Dashboard').should('exist')`.
3. Click the 'Doctort Dashboard' button  `cy.findAllByText('Doctor Dashboard').click()`.
4. Check if the 'Patients' button exists on the page using `cy.findAllByText('Patients').should('exist')`.
5. Check if the 'Patient Records' button exists on the page using `cy.findAllByText('Patient Records').should('exist')`.
6. Check if the 'Appointement Requests' button exists on the page using `cy.findAllByText('Appointment Requests').should('exist')`.
7. Check if the 'Profile' button exists on the page using `cy.findAllByText('Profile').should('exist')`.
8. Check if the 'Daily Tasks' button exists on the page using `cy.findAllByText('Daily Tasks').should('exist')`.
9. Check if the 'Calendar' button exists on the page using `cy.findAllByText('Calendar').should('exist')`.
10. Check if the 'Logout' button exists on the page using `cy.findAllByText('Logout').should('exist')`.
11.Click on the 'Logout' button, should return back to homepage `cy.findAllByText('Logout').click()`.

### Test Case 5 - Forgot Password Works
This test case verifies that the forgot password page of the web application is functioning correctly. Here are the steps involved:
1. Visit the home page of the web application using `cy.visit('http://localhost:3000')`.
2. Check if the 'Login' button exists on the page using `cy.findAllByText('Login').should('exist')`.
3. Click on the 'Login' button using `cy.findAllByText('Login').click()`.
4. Check if the 'Forgot Password' button exists on the page using  `cy.findAllByText('Forgot Password?').should('exist')`.
5. Click on the 'Forgot Password' button using  `cy.findAllByText('Forgot Password?').click()`.
6. Type in a valid email address into the email input field using  `cy.findByPlaceholderText('Email').type('introtosoftware@ufl.edu').should('be.visible')`.
7. Click on the 'CONTINUE' button using  `cy.findAllByText('CONTINUE').click()`.
8. Type in a valid verification code into the verfication code input field using  `cy.findByPlaceholderText('Verification Code').type('1234').should('be.visible')`.
9. Click on the 'CONTINUE' button using  `cy.findAllByText('CONTINUE').click()`.
10. Type in a new password into the new password input field using  `cy.findByPlaceholderText('New Password').type('hello').should('be.visible')`.
11. Retype the same password into the confirm password input field using  `cy.findByPlaceholderText('Confirm Password').type('hello').should('be.visible')`.
12. Click on the 'CONTINUE' button and be redirected to homepage using `cy.findAllByText('CONTINUE').click()`.

### Test Case 6 - Dashboard Functionality
This test case verifies that the different tabs are functioning correctly. Here are the steps involved:
1.Visit the dashboard page of the web application using `cy.visit('http://localhost:3000/Dashboard')`.
2. Check if the 'Doctor Dashboard' button exists on the page using `cy.findAllByText('Doctor Dashboard').should('exist')`.
3. Click the 'Doctort Dashboard' button  `cy.findAllByText('Doctor Dashboard').click()`.
4. Check if the 'Patients' button exists on the page using `cy.findAllByText('Patients').should('exist')`.
5. Check if patient 'Alice Brown' exists on the page using `cy.findAllByText('Alice Brown').should('exist')`.
6. Click on patient 'Alice Brown' to access information about the patient using `cy.findAllByText('Alice Brown').click()`.
7. Click on patient 'Lab Result' to access patient's lab results using `cy.findAllByText('View Lab Results').click()`.
8. Check if the 'Appointement Requests' button exists on the page using `cy.findAllByText('Appointment Requests').should('exist')`.
9. Click on 'Appointement Requests' to view requests using `cy.findAllByText('Appointment Requests').click()`.
10. Check if the 'Profile' button exists on the page using `cy.findAllByText('Profile').should('exist')`.
11. Click on 'Profile' to view user's profile using `cy.findAllByText('Profile').click()`.
12. Check if the 'Daily Tasks' button exists on the page using `cy.findAllByText('Daily Tasks').should('exist')`.
13. Click on 'Daily Tasks' to view user's schedule for the day using `cy.findAllByText('Daily Tasks').click()`.
15. Check if the 'Logout' button exists on the page using `cy.findAllByText('Logout').should('exist')`.
16.Click on the 'Logout' button, should return back to homepage `cy.findAllByText('Logout').click()`.


### Test Case 7 - Calendar
This test case verifies that user can acess the calendar and view its functionalities. Here are the steps involved:
1.Visit the dashboard page of the web application using `cy.visit('http://localhost:3000/Dashboard')`.
2. Check if the 'Doctor Dashboard' button exists on the page using `cy.findAllByText('Doctor Dashboard').should('exist')`.
3. Click the 'Doctort Dashboard' button  `cy.findAllByText('Doctor Dashboard').click()`.
4. Check if the 'Calendar' button exists on the page using `cy.findAllByText('Calendar').should('exist')`.
5. Click on the 'Calendar' button to view the calendar using `cy.findAllByText('Calendar').click()`.
6. Check if the 'BACK' button exists on the page using `cy.findAllByText('BACK').should('exist')`.
7. Click on the 'BACK' button to go back to the dashoard using `cy.findAllByText('BACK').click();`.
8. Check if the 'Logout' button exists on the page using `cy.findAllByText('Logout').should('exist')`.
9. Click on the 'Logout' button, should return back to homepage `cy.findAllByText('Logout').click()`.


### Test Case 8 - Doctor Profile
This test case verifies that the doctor's profile functioning correctly. Here are the steps involved:
1.Visit the dashboard page of the web application using `cy.visit('http://localhost:3000/Dashboard')`.
2. Check if the 'Doctor Dashboard' button exists on the page using `cy.findAllByText('Doctor Dashboard').should('exist')`.
3. Click the 'Doctort Dashboard' button  `cy.findAllByText('Doctor Dashboard').click()`.
4. Check if the 'Profile' button exists on the page using `cy.findAllByText('Profile').should('exist')`.
5. Click on 'Profile' to view user's profile using `cy.findAllByText('Profile').click()`.
6. Click on 'View Patients' to view doctor's clients profile using `cy.findAllByText('View Patients').click()`.
7. Click on 'Profile' to navigate back to user's profile using `cy.findAllByText('Profile').click()`.
8. Click on 'View Tasks' to view doctor's task using `cy.findAllByText('View Tasks').click()`.
9. Click on 'Profile' to navigate back to  user's profile using `cy.findAllByText('Profile').click()`.
10. Click on 'View Requests' to view doctor's pending requests using `cy.findAllByText('View Requests').click()`.
11. Click on 'Profile' to navigate back to  user's profile using `cy.findAllByText('Profile').click()`.
12. Click on the 'Calendar' button to view the calendar using `cy.findAllByText('Calendar').click()`.
13. Click on the 'BACK' button to relocate back to the dashoard using `cy.findAllByText('BACK').click();`.
15. Click on 'Profile' to navigate back to  user's profile using `cy.findAllByText('Profile').click()`.
16. Check if the 'Daily Tasks' button exists on the page using `cy.findAllByText('Daily Tasks').should('exist')`.
17. Click on 'Daily Tasks' to view user's schedule for the day using `cy.findAllByText('Daily Tasks').click()`.
18. Check if the 'Logout' button exists on the page using `cy.findAllByText('Logout').should('exist')`.
19. Click on the 'Logout' button, should return back to homepage `cy.findAllByText('Logout').click()`.

## Backend Unit Tests

We created a unit test case for the backend of the web application. Here are the details:

### Test Case 1 - TestMongoDBConnection

This test case verifies that the Go backend is able to connect to the MongoDB database. Here are the steps involved:

1. Set up the client options for connecting to a MongoDB Atlas cluster hosted on `mongodb+srv://cluster0.j5xkmde.mongodb.net` using a username and password of `cen3031`.
2. Create a MongoDB client by calling the `mongo.Connect` function and passing in the client options.
3. Check the connection to the MongoDB database by calling the `Ping` method on the client and passing in a nil context.
4. Disconnect the MongoDB client by calling the Disconnect method on the client.
5. Use the `assert.NoError` function to check if there were any errors while connecting, pinging, or disconnecting the MongoDB client. If there were no errors, the test passes. If there were any errors, the test fails and outputs the error message.

### Test Case 2 - TestGetUserProperties

This test case verifies that the Go backend is able to connect to the MongoDB database. Here are the steps involved:

1. Set up MongoDB client options
2. Create MongoDB client
3. Initialize user collection
4. Set up router and define route to get user properties
5. Create a test user in the user collection
6. Create a test JWT token for the test user
7. Create a GET request to get the user properties endpoint with the test JWT token as the Authorization header
8. Record the response from the request
9. Assert that the response status code is HTTP 200 (OK)
10. Unmarshal the response body into a map of user properties
11. Assert that the user properties in the response match the properties of the test user in the user collection
12. Delete the test user from the user collection

### Test Case 3 - TestCreateAppointment

This test case verifies that the Go backend is able to connect to the MongoDB database. Here are the steps involved:

1. Set up MongoDB client options
2. Create MongoDB client
3. Initialize appointment collection
4. Set up router and define route to create an appointment
5. Create new appointment JSON string
6. Create a POST request to create a new appointment endpoint with the new appointment JSON string as the request body
7. Record the response from the request
8. Assert that the response status code is HTTP 200 (OK)
9. Find the created appointment in the appointment collection and decode it into an appointment struct
10. Delete the created appointment from the appointment collection

### Test Case 4 - TestCreateUser

This test case verifies that the Go backend is able to connect to the MongoDB database. Here are the steps involved:

1. Set up MongoDB client options
2. Create MongoDB client
3. Initialize user collection
4. Set up router and define route to create a user
5. Create new user JSON string
6. Create a POST request to create a new user endpoint with the new user JSON string as the request body
7. Record the response from the request
8. Assert that the response status code is HTTP 200 (OK)
9. Find the created user in the user collection and decode it into a user struct
10. Delete the created user from the user collection

### Test Case 5 - TestCreateUserInvalidData

This test case verifies that the CreateUser endpoint correctly handles invalid user data input. Here are the steps involved:

1. Set up MongoDB client options
2. Create MongoDB client
3. Set up router and define route to create a user
4. Create an invalid user JSON string with empty fields
5. Create a POST request to the create user endpoint with the invalid user JSON string as the request body
6. Record the response from the request
7. Assert that the response status code is HTTP 400 (Bad Request) since the input data is invalid

### Test Case 6 - TestGetAllDoctors

This test case verifies that the GetAllDoctors endpoint retrieves all doctors from the MongoDB database. Here are the steps involved:

1. Set up MongoDB client options
2. Create MongoDB client
3. Initialize user collection
4. Set up router and define route to get all doctors
5. Create two test doctors in the user collection
6. Create a GET request to the get-all-doctors endpoint
7. Record the response from the request
8. Assert that the response status code is HTTP 200 (OK)
9. Unmarshal the response body into a GetAllDoctorsResponse struct
10. Check i`f the test doctors are present in the response
11. Delete the test doctors from the user collection
12. The createTestDoctor function is a helper function that creates a test doctor in the user collection for use in the TestGetAllDoctors test case.


## What Issues Were Successful


Backend:

In this sprint, several issues were successfully addressed, which contributed to the development and functionality of the doctor scheduling web app: Doctor retrieval: The GetAllDoctors function was implemented successfully, allowing the app to fetch all doctors from the database by filtering users with the "isdoctor" field set to true. This is crucial for displaying a list of available doctors to the users. User identification: The GetUserIDByEmail function was developed to find a user by their email address and return their ID. This functionality is essential for associating appointments and other user-specific data with the correct user. Appointment management: Two functions were implemented to handle appointment management: ApproveDenyAppointment and DeleteAppointment. ApproveDenyAppointment allows for the approval or denial of an appointment, providing a streamlined way to manage appointment requests. DeleteAppointment enables the deletion of appointments from the database, offering a means to remove unwanted or outdated appointments.

By addressing these issues, the sprint was successful in improving the doctor scheduling web app's user experience and functionality, allowing for more efficient appointment management and user-doctor interactions.

Frontend:


## What Issues Were not Successful

Backend:

We were not succesful yet in being able to connnect the backend to the frontend for the doctor scheduling process, however we were able to make it work with Postman. N issue that was in some ways succesful, but need work on is user authentication or authorization mechanisms. This is because in a real-world application, its crucial to ensure that only authenticated and authorized users can perform actions such as approving, denying, or deleting appointments.

Frontend:


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

6. The `GetUserProperties` function retrieves the properties of a user based on their JWT token. It first extracts the token from the Authorization header and parses it to get the user's email. After checking if the token is valid, it creates a new MongoDB context with a timeout of 100 seconds, finds the user with the specified email, and decodes the result into a `models.User` struct. Lastly, it returns the user properties in the response as a JSON object.
7. The `GetAllDoctors` function retrieves all users who are doctors. It creates a new MongoDB context with a timeout of 100 seconds, finds all users with the `isDoctor` field set to `true`, and decodes the results into an array of `models.User` structs. It logs the number of doctors found and returns the doctors in the response as an array of JSON objects.

5. The `GetAppointmentsByDoctor` function retrieves all appointments associated with a specific doctor. It first extracts the doctorID from the URL parameter of the incoming request and converts it to a MongoDB ObjectID. It then creates a new MongoDB context with a timeout of 100 seconds, finds all appointments associated with the specified doctor, and decodes the results into an array of `models.Appointment` structs. Finally, it returns the appointments in the response as an array of `JSON` objects.

8. The `GetUserIDByEmail` function returns the ID of a user given their email. It extracts the email from the URL parameter, creates a new MongoDB context with a timeout of 100 seconds, finds the user with the specified email, and decodes the result into a `models.User` struct. Finally, it returns the user ID in the response as a JSON object.

9. The `DeleteAppointment` function deletes an appointment based on its ID. It first extracts the appointmentID from the URL parameter and converts it to a MongoDB ObjectID. Then, it creates a new MongoDB context with a timeout of 100 seconds and deletes the appointment associated with the appointment ID. If an appointment was deleted, it returns a success message in the response as a JSON object. If not, it returns an error indicating that the appointment was not found.

10. The ApproveDenyAppointment function approves or denies an appointment based on the request data. It first extracts the appointmentID from the URL parameter and the IsApproved field from the request body. If the request data is invalid, it returns an error. Then, it converts the appointmentID to a MongoDB ObjectID and checks if it's valid. If not, it returns an error indicating that the appointment ID is invalid. Next, it sets up a filter based on the appointmentID and an update operation to change the isApproved field of the appointment according to the request data. It then attempts to find the appointment with the specified filter and apply the update. If there's an error during this process, it returns an error message indicating that there was a problem updating the appointment. If the appointment was not found, it returns an error message stating that the appointment was not found. Otherwise, it returns a success message in the response as a JSON object, indicating that the appointment was updated successfully.



### File: connection_test.go

This file contains unit tests for the database connection, user creation, appointment creation, and retrieving user properties. It tests whether the connection is established successfully, whether the database collections are created, and whether queries to the database return expected results. The Go file contains the following test functions:

- `TestMongoDBConnection`: tests whether the application can connect to MongoDB successfully.
- `TestCreateUser`: tests whether a user can be created through the `routes.CreateUser` API endpoint.
- `TestCreateAppointment`: tests whether an appointment can be created through the `routes.CreateAppointment` API endpoint.
- `TestGetUserProperties`: tests whether user properties can be retrieved through the `routes.GetUserProperties` API endpoint.

#### `TestMongoDBConnection`

The first step of the `TestMongoDBConnection` test function is to set up MongoDB client options using the `options.Client().ApplyURI()` function, which takes a connection string as an argument. In this case, the connection string is `"mongodb+srv://cen3031:cen3031@cluster0.j5xkmde.mongodb.net/?retrxyWrites=true&w=majority"`.

Next, the test function creates a MongoDB client using the `mongo.Connect()` function, passing in the `clientOptions` variable and a `context.Background()` context. If an error occurs while creating the client, the `assert.NoError(t, err)` function will fail the test.

The third step is to check whether the connection to MongoDB is successful using the `client.Ping()` function, which takes a context and options as arguments. If an error occurs while pinging the server, the `assert.NoError(t, err)` function will fail the test.

Finally, the test disconnects the MongoDB client using the client.`Disconnect()` function, passing in a `context.Background()` context. If an error occurs while disconnecting the client, the `assert.NoError(t, err)` function will fail the test.
Overall, this test function ensures that the application can connect to the MongoDB server and perform basic operations, such as pinging the server and disconnecting from it.

#### `TestCreateUser`

The `TestCreateUser` test function tests whether a user can be created through the `routes.CreateUser` API endpoint. The test function does the following:

1. Creates a MongoDB client and a `userCollection` variable for the "users" collection.
2. Creates a `gin` router and adds the `routes.CreateUser` API endpoint to it.
3. Creates a JSON string representing a new user.
4. Sends a `POST` request to the `routes.CreateUser` endpoint with the JSON string as the request body.
5. Checks that the response status code is `http.StatusOK`.
6. Checks that the user was created by querying the `userCollection` for the newly created user with the email "newuser@example.com".
7. Deletes the test user from the `userCollection`.

#### `TestCreateAppointment`

The `TestCreateAppointment` test function tests whether an appointment can be created through the `routes.CreateAppointment` API endpoint. The test function does the following:

1. Creates a MongoDB client and an `appointmentCollection` variable for the "appointments" collection.
2. Creates a `gin` router and adds the `routes.CreateAppointment` API endpoint to it.
3. Creates a JSON string representing a new appointment.
4. Sends a `POST` request to the `routes.CreateAppointment` endpoint with the JSON string as the request body.
5. Checks that the response status code is `http.StatusOK`.
6. Checks that the appointment was created by querying the `appointmentCollection` for the newly created appointment with the date "2023-04-15T10:30:00Z".
7. Deletes the test appointment from the appointmentCollection.

### `TestGetUserProperties`
The `TestGetUserProperties` test function tests whether user properties can be retrieved through the routes.GetUserProperties API endpoint. The test function does the following:

1. Creates a MongoDB client and a userCollection variable for the "users" collection.
2. Creates a gin router and adds the routes.GetUserProperties API endpoint to it.
3. Creates a test user using the createTestUser helper function.
4. Creates a test user token using the createTestUserToken helper function.
5. Sends a GET request to the routes.GetUserProperties endpoint with the test user token in the Authorization header.
6. Checks that the response status code is http.StatusOK.
7. Unmarshals the response body into a map of user properties.
8. Asserts that the retrieved user properties match the properties of the test user created in step 3.
9. Deletes the test user from the userCollection.

### `TestCreateUserInvalidData`
The `TestCreateUserInvalidData` test function tests the behavior of the routes.CreateUser API endpoint when it is called with invalid data. The function does the following:

1. Creates a MongoDB client using the mongo.NewClient function and passing the connection string "mongodb+srv://cen3031:cen3031@cluster0.j5xkmde.mongodb.net/?retrxyWrites=true&w=majority".
2. Connects to the MongoDB server using the client.Connect function.
3. Creates a gin router and adds the routes.CreateUser API endpoint to it.
4. Creates a JSON string representing an invalid user with empty values for all fields.
5. Sends a POST request to the routes.CreateUser endpoint with the JSON string as the request body.
6. Checks that the response status code is http.StatusBadRequest.

### `TestGetAllDoctors`
The `TestGetAllDoctors` test function tests the behavior of the routes.GetAllDoctors API endpoint, which returns all doctor users in the database. The function does the following:

1. Creates a MongoDB client using the mongo.NewClient function and passing the connection string "mongodb+srv://cen3031:cen3031@cluster0.j5xkmde.mongodb.net/?retrxyWrites=true&w=majority".
2. Connects to the MongoDB server using the client.Connect function.
3. Creates a userCollection variable for the "users" collection.
4. Creates a gin router and adds the routes.GetAllDoctors API endpoint to it.
5. Calls the createTestDoctor helper function twice to create two test doctor users in the database.
6. Sends a GET request to the routes.GetAllDoctors endpoint.
7. Checks that the response status code is http.StatusOK.
8. Unmarshals the response body into a GetAllDoctorsResponse struct.
9. Checks that the two test doctor users are present in the response.
10. Calls the deleteTestUser helper function to delete the test doctor users from the database.
