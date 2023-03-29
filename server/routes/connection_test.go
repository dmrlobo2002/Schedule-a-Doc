package routes_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	// "bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"server/models"
	"server/routes"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
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

// Helper function to create a test JWT token
func createTestJWT(email string) string {
	// Create a new JWT token with the given email
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
	})

	// Sign the token
	tokenString, _ := token.SignedString([]byte("buttface"))
	return tokenString
}

func TestGetUserProperties(t *testing.T) {
	// Set up the MongoDB client
	client, _ := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:6001"))
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_ = client.Connect(ctx)

	// Replace this with the correct name for your database and collection
	userCollection := client.Database("cluster0").Collection("Users")

	// Create a sample user
	email := "test@example.com"
	phoneNumber := "1234567890"
	firstName := "John"
	lastName := "Doe"
	isDoctor := false

	sampleUser := models.User{
		ID:          primitive.NewObjectID(),
		Email:       &email,
		PhoneNumber: &phoneNumber,
		FirstName:   &firstName,
		LastName:    &lastName,
		IsDoctor:    &isDoctor,
	}
	_, insertErr := userCollection.InsertOne(ctx, sampleUser)
	if insertErr != nil {
		t.Errorf("Failed to delete sample user: %v", insertErr)
	}
	// Set up the Gin router
	router := gin.Default()
	router.GET("/user-properties", routes.GetUserProperties)

	tests := []struct {
		name               string
		authHeader         string
		expectedStatusCode int
		expectedError      string
	}{
		{
			name:               "Valid JWT token",
			authHeader:         "Bearer " + createTestJWT("test@example.com"),
			expectedStatusCode: http.StatusOK,
			expectedError:      "",
		},
		{
			name:               "Missing JWT token",
			authHeader:         "",
			expectedStatusCode: http.StatusUnauthorized,
			expectedError:      "Failed to parse JWT token",
		},
		{
			name:               "Invalid JWT token",
			authHeader:         "Bearer invalid_token",
			expectedStatusCode: http.StatusUnauthorized,
			expectedError:      "Invalid JWT token",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			request, _ := http.NewRequest("GET", "/user-properties", nil)
			request.Header.Set("Authorization", test.authHeader)
			response := httptest.NewRecorder()

			router.ServeHTTP(response, request)

			if response.Code != test.expectedStatusCode {
				t.Errorf("Expected status code %d, got %d", test.expectedStatusCode, response.Code)
			}

			if test.expectedError != "" {
				var responseBody map[string]interface{}
				json.NewDecoder(response.Body).Decode(&responseBody)
				errorMessage := responseBody["error"].(string)
				if !strings.Contains(errorMessage, test.expectedError) {
					t.Errorf("Expected error message to contain '%s', got '%s'", test.expectedError, errorMessage)
				}
			}
		})
	}

	// Clean up the sample user
	_, err := userCollection.DeleteOne(ctx, bson.M{"email": sampleUser.Email})
	if err != nil {
		t.Errorf("Failed to delete sample user: %v", err)
	}
}
