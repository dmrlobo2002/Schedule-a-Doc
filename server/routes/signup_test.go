package routes_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"server/routes"
	"server/models"

	"github.com/stretchr/testify/assert"
)
func pointerToString(s string) *string {
    return &s
}

func pointerToBool(b bool) *bool {
    return &b
}

func TestSignUp(t *testing.T) {
	// Create a new router
	router := routes.SetupRouter()

	// Create a new user
	user := models.User{
		Email:       pointerToString("testuser@example.com"),
		PhoneNumber: nil,
		Password:    pointerToString("1234567890"),
		FirstName:   pointerToString("Test"),
		LastName:    pointerToString("User"),
		IsDoctor:    pointerToBool(false),
	}

	// Marshal the user into JSON
	userJSON, err := json.Marshal(user)
	if err != nil {
		t.Error(err)
	}

	// Create a new POST request to the /signup endpoint with the user JSON as the body
	req, err := http.NewRequest("POST", "/signup", bytes.NewBuffer(userJSON))
	if err != nil {
		t.Error(err)
	}

	// Set the Content-Type header to application/json
	req.Header.Set("Content-Type", "application/json")

	// Create a new response recorder
	rec := httptest.NewRecorder()

	// Perform the request
	router.ServeHTTP(rec, req)

	// Check the status code is 200 OK
	assert.Equal(t, http.StatusOK, rec.Code)

	// Unmarshal the response body into a map
	var response map[string]interface{}
	err = json.Unmarshal(rec.Body.Bytes(), &response)
	if err != nil {
		t.Error(err)
	}

	// Check the response contains a valid MongoDB object ID
	_, err = models.ToObjectID(response["InsertedID"].(string))
	assert.NoError(t, err)
}

func TestLogin(t *testing.T) {
	// Create a new router
	router := routes.SetupRouter()

	// Create a new user to log in
	user := models.User{
		Email:       "testuser@example.com",
		Password:    "testpassword",
	}

	// Marshal the user into JSON
	userJSON, err := json.Marshal(user)
	if err != nil {
		t.Error(err)
	}

	// Create a new POST request to the /login endpoint with the user JSON as the body
	req, err := http.NewRequest("POST", "/login", bytes.NewBuffer(userJSON))
	if err != nil {
		t.Error(err)
	}

	// Set the Content-Type header to application/json
	req.Header.Set("Content-Type", "application/json")

	// Create a new response recorder
	rec := httptest.NewRecorder()

	// Perform the request
	router.ServeHTTP(rec, req)

	// Check the status code is 200 OK
	assert.Equal(t, http.StatusOK, rec.Code)

	// Unmarshal the response body into a map
	var response map[string]interface{}
	err = json.Unmarshal(rec.Body.Bytes(), &response)
	if err != nil {
		t.Error(err)
	}

	// Check the response contains a token
	assert.NotEmpty(t, response["token"])
}
