package routes_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"encoding/json"
    "github.com/dgrijalva/jwt-go"


	// "bytes"
	"server/models"
//	"github.com/joho/godotenv"
	"server/routes"
	"strings"
	"time"
	"net/http"
    "net/http/httptest"

    "github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/bson"
)

func TestMongoDBConnection(t *testing.T) {
	// Set up MongoDB client options
	clientOptions := options.Client().ApplyURI("mongodb+srv://cen3031:cen3031@cluster0.j5xkmde.mongodb.net/?retrxyWrites=true&w=majority")

	// Create MongoDB client
	client, err := mongo.Connect(context.Background(), clientOptions)
	assert.NoError(t, err)

	// Check connection
	err = client.Ping(context.Background(), nil)
	assert.NoError(t, err)

	// Disconnect MongoDB client
	err = client.Disconnect(context.Background())
	assert.NoError(t, err)
}

func createTestUser(t *testing.T, userCollection *mongo.Collection) models.User {
	email := "testuser@example.com"
	phoneNumber := "1234567890"
	firstName := "Jane"
	lastName := "Doe"
	password := "password123"
	isDoctor := false

	user := models.User{
		ID:          primitive.NewObjectID(),
		Email:       &email,
		PhoneNumber: &phoneNumber,
		FirstName:   &firstName,
		LastName:    &lastName,
		Password:    &password,
		IsDoctor:    &isDoctor,
	}

	_, insertErr := userCollection.InsertOne(context.Background(), user)
	if insertErr != nil {
		t.Fatalf("Failed to create test user: %v", insertErr)
	}

	return user
}

// Helper function to delete a test user
func deleteTestUser(t *testing.T, userCollection *mongo.Collection, user models.User) {
	_, err := userCollection.DeleteOne(context.Background(), bson.M{"_id": user.ID})
	if err != nil {
		t.Fatalf("Failed to delete test user: %v", err)
	}
}

func TestCreateUser(t *testing.T) {
	client, _ := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://cen3031:cen3031@cluster0.j5xkmde.mongodb.net/?retrxyWrites=true&w=majority"))

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_ = client.Connect(ctx)
	userCollection := client.Database("cluster0").Collection("users")

	router := gin.Default()
	router.POST("/create-user", routes.CreateUser)

	newUser := `{
		"email": "newuser@example.com",
		"phoneNumber": "1234567890",
		"firstName": "Alice",
		"lastName": "Cooper",
		"password": "password123",
		"isDoctor": false
	}`

	request, _ := http.NewRequest("POST", "/create-user", strings.NewReader(newUser))
	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, response.Code)
	}

	var createdUser models.User
	err := userCollection.FindOne(ctx, bson.M{"email": "newuser@example.com"}).Decode(&createdUser)
	if err != nil {
		t.Errorf("Failed to find created user: %v", err)
	}

	deleteTestUser(t, userCollection, createdUser)
}


func TestCreateAppointment(t *testing.T) {
	client, _ := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://cen3031:cen3031@cluster0.j5xkmde.mongodb.net/?retrxyWrites=true&w=majority"))

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_ = client.Connect(ctx)
	appointmentCollection := client.Database("cluster0").Collection("appointments")

	router := gin.Default()
	router.POST("/create-appointment", routes.CreateAppointment)

	newAppointment := `{
		"date": "2023-04-15T10:30:00Z",
		"category": "Regular Checkup",
		"patientID": "60d4d4b4ff1b2e5b6a5d6d5c",
		"doctorID": "60d4d4b4ff1b2e5b6a5d6d5d",
		"isApproved": false
	}`
	

	request, _ := http.NewRequest("POST", "/create-appointment", strings.NewReader(newAppointment))
	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, response.Code)
	}

	var createdAppointment models.Appointment
	err := appointmentCollection.FindOne(ctx, bson.M{"date": "2023-04-15T10:30:00Z"}).Decode(&createdAppointment)
	if err != nil {
    t.Errorf("Failed to find created appointment: %v. Appointment ID: %v", err, createdAppointment.ID.Hex())
	}


	_, err = appointmentCollection.DeleteOne(context.Background(), bson.M{"_id": createdAppointment.ID})
	if err != nil {
		t.Fatalf("Failed to delete test appointment: %v", err)
	}
}

func TestGetUserProperties(t *testing.T) {
	client, _ := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://cen3031:cen3031@cluster0.j5xkmde.mongodb.net/?retrxyWrites=true&w=majority"))

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_ = client.Connect(ctx)
	userCollection := client.Database("cluster0").Collection("users")

	router := gin.Default()
	router.GET("/user-properties", routes.GetUserProperties)

	testUser := createTestUser(t, userCollection)
	testUserToken := createTestUserToken(testUser)

	request, _ := http.NewRequest("GET", "/user-properties", nil)
	request.Header.Set("Authorization", "Bearer "+testUserToken)
	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, response.Code)
	}

	var userProperties map[string]interface{}
	if err := json.Unmarshal(response.Body.Bytes(), &userProperties); err != nil {
		t.Errorf("Failed to unmarshal response body: %v", err)
	}

	assert.Equal(t, *testUser.Email, userProperties["email"].(string))
	assert.Equal(t, *testUser.PhoneNumber, userProperties["phoneNumber"].(string))
	assert.Equal(t, *testUser.FirstName, userProperties["firstName"].(string))
	assert.Equal(t, *testUser.LastName, userProperties["lastName"].(string))
	assert.Equal(t, *testUser.IsDoctor, userProperties["isDoctor"].(bool))
	assert.Equal(t, testUser.ID.Hex(), userProperties["_id"].(string))

	deleteTestUser(t, userCollection, testUser)
}

func createTestUserToken(user models.User) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": user.Email,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte("buttface"))
	if err != nil {
		panic("Failed to create test user token")
	}

	return tokenString
}

func TestCreateUserInvalidData(t *testing.T) {
	client, _ := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://cen3031:cen3031@cluster0.j5xkmde.mongodb.net/?retrxyWrites=true&w=majority"))

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_ = client.Connect(ctx)
	//userCollection := client.Database("cluster0").Collection("users")

	router := gin.Default()
	router.POST("/create-user", routes.CreateUser)

	invalidUser := `{
		"email": "",
		"phoneNumber": "",
		"firstName": "",
		"lastName": "",
		"password": "",
		"isDoctor": false
	}`

	request, _ := http.NewRequest("POST", "/create-user", strings.NewReader(invalidUser))
	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	if response.Code != http.StatusBadRequest {
		t.Errorf("Expected status code %d, got %d", http.StatusBadRequest, response.Code)
	}
}

//Struct for func TestGetAllDocs
type GetAllDoctorsResponse struct {
	Doctors []models.User `json:"doctors"`
}


func TestGetAllDoctors(t *testing.T) {
    client, _ := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://cen3031:cen3031@cluster0.j5xkmde.mongodb.net/?retrxyWrites=true&w=majority"))

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    _ = client.Connect(ctx)
    userCollection := client.Database("cluster0").Collection("users")

    router := gin.Default()
    router.GET("/get-all-doctors", routes.GetAllDoctors)

    testDoctor1 := createTestDoctor(t, userCollection)
    testDoctor2 := createTestDoctor(t, userCollection)

    request, _ := http.NewRequest("GET", "/get-all-doctors", nil)
    response := httptest.NewRecorder()

    router.ServeHTTP(response, request)

    if response.Code != http.StatusOK {
        t.Errorf("Expected status code %d, got %d", http.StatusOK, response.Code)
    }

    var allDoctorsResponse GetAllDoctorsResponse
	if err := json.Unmarshal(response.Body.Bytes(), &allDoctorsResponse); err != nil {
		t.Errorf("Failed to unmarshal response body: %v", err)
	}

    // Check if the test doctors are present in the response
    foundTestDoctor1 := false
    foundTestDoctor2 := false
    for _, doctor := range allDoctorsResponse.Doctors {
        if doctor.ID == testDoctor1.ID {
            foundTestDoctor1 = true
        }
        if doctor.ID == testDoctor2.ID {
            foundTestDoctor2 = true
        }
    }

    if !foundTestDoctor1 {
        t.Error("Test doctor 1 not found in the response")
    }
    if !foundTestDoctor2 {
        t.Error("Test doctor 2 not found in the response")
    }

    // Clean up test data
    deleteTestUser(t, userCollection, testDoctor1)
    deleteTestUser(t, userCollection, testDoctor2)
}


func createTestDoctor(t *testing.T, userCollection *mongo.Collection) models.User {
	email := "testdoctor@example.com"
	phoneNumber := "1234567890"
	firstName := "John"
	lastName := "Smith"
	password := "password123"
	isDoctor := true

	doctor := models.User{
		ID:          primitive.NewObjectID(),
		Email:       &email,
		PhoneNumber: &phoneNumber,
		FirstName:   &firstName,
		LastName:    &lastName,
		Password:    &password,
		IsDoctor:    &isDoctor,
	}

	_, insertErr := userCollection.InsertOne(context.Background(), doctor)
	if insertErr != nil {
		t.Fatalf("Failed to create test doctor: %v", insertErr)
	}

	return doctor
}