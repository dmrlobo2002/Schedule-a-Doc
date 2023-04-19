## Project Name:

Schedule-a-Doc

## Description:

The "Schedule-a-Doc" group will create a webapp that would ideally be used by a doctor's office and its clients. It will be organized as follows:

### Clients:

From this webapp, clients can create an appointment for a specific date and time based on the doctor's availability, see upcoming appointments, and find doctors based on their needs i.e. a client with a sore throat can find an ear-nose-throat specialist via the webapp by selecting "Ear nose and throat" when searching for doctors. It is then up to the doctor to approve or deny the request.

Doctors will be able to set appointments with patients, approve/deny pending appointments, and view patient prescriptions.

The webapp will store whether a user is a doctor or a patient via the backend based on the user's credentials. Permissions will be distributed as such, and each will see different pages depending on who the user is.

## Members

#### Backend

Daniel Lobo

Franco Krepel

### Frontend

Richard Mercado

Divyanshi Saini

## How to Run Our Application

1. Clone the repo using `git clone https://github.com/dmrlobo2002/Schedule-a-Doc.git`
2. Open the new directory created after cloning in two terminal windows
3. Ensure that GO and Node.js are installed on your computer
4. In the other terminal window where you are at the root directory of the cloned repo, type `cd server`
5. In the other terminal window where you are at the root directory of the cloned repo, type `cd frontend`

### Instructions for Running the Backend - Server Directory

The follow should be run in the terminal window where you ran `cd server`

1. In the terminal, run `go mod tidy`
2. In the terminal, run `go build main.go`
3. In the terminal, run `go run main.go`
4. The Golang backend should now be running

### Instructions for Running the Frontend - Frontend Directory

The follow should be run in the terminal window where you ran `cd frontend`

1. In the terminal, run `npm install react-scripts --save`
2. In the terminal, run `npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser`
3. In the terminal, run `npm install react-calendar`
4. In the terminal, run `npm start`
5. The frontend should now be running at `http://localhost:3000/`
