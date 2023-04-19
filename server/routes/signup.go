package routes

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	//"strconv"

	"server/models"

	"go.mongodb.org/mongo-driver/bson"

	// "github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var validate = validator.New()

var userCollection *mongo.Collection = OpenCollection(Client, "users")
var appointmentCollection *mongo.Collection = OpenCollection(Client, "appointments")

// create a user
func CreateUser(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	var user models.User

	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	validationErr := validate.Struct(user)
	if validationErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
		fmt.Println(validationErr)
		return
	}
	user.ID = primitive.NewObjectID()

	result, insertErr := userCollection.InsertOne(ctx, user)
	if insertErr != nil {
		msg := fmt.Sprintf("user item was not created")
		c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
		fmt.Println(insertErr)
		return
	}
	defer cancel()

	c.JSON(http.StatusOK, result)
}

func CreateAppointment(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	var appointment models.Appointment

	if err := c.BindJSON(&appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	validationErr := validate.Struct(appointment)
	if validationErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
		fmt.Println(validationErr)
		return
	}
	appointment.ID = primitive.NewObjectID()
	//this is default
	appXYZ := false
	appointment.Approved = &appXYZ

	result, insertErr := appointmentCollection.InsertOne(ctx, appointment)
	if insertErr != nil {
		msg := fmt.Sprintf("user item was not created")
		c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
		fmt.Println(insertErr)
		return
	}
	defer cancel()

	c.JSON(http.StatusOK, result)
}

func Login(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error binding the incoming JSON request data to a User struct:": err.Error()})
		return
	}
	// Check if the user exists, decode the result into a Go struct.
	var existingUser models.User
	err := userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&existingUser)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User with this email does not exist"})
		return
	}
	// Check if the password is correct (remeber to dereference *string)
	if *user.Password != *existingUser.Password {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password is incorrect"})
		return
	}
	// Generate a JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": user.Email,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})
	// Sign and encode the token
	tokenString, err := token.SignedString([]byte("buttface"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}
	defer cancel()
	// Return the token in the response
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

func GetUserProperties(c *gin.Context) {
	// Get the JWT token from the Authorization header
	authHeader := c.GetHeader("Authorization")
	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	// Parse the JWT token to get the email
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte("buttface"), nil
	})
	// checks if there was an error parsing the JWT token
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to parse JWT token"})
		return
	}
	// gets the claims from the JWT token. Claims are pieces of information encoded in token representing  user's data related to the token
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid JWT token"})
		return
	}
	// extracts the email address from the claims.
	email, ok := claims["email"].(string) //assert to string
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to get email from JWT token"})
		return
	}
	// Create a new MongoDB context with a timeout of 100 seconds.
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	// Find the user by email and decode the result into a Go struct
	var user models.User
	err = userCollection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find user"})
		return
	}
	// Return the user properties in the response
	c.JSON(http.StatusOK, gin.H{
		"email":       user.Email,
		"phoneNumber": user.PhoneNumber,
		"firstName":   user.FirstName,
		"lastName":    user.LastName,
		"isDoctor":    user.IsDoctor,
		"_id":         user.ID.Hex(), // Add this line to include the user's _id
	})

}

func GetAllDoctors(c *gin.Context) {
	// Create a new MongoDB context with a timeout of 100 seconds
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	// Find all users where isDoctor is true
	cursor, err := userCollection.Find(ctx, bson.M{"isdoctor": true})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find doctors"})
		return
	}
	defer cursor.Close(ctx)

	// Iterate through the cursor to decode the results
	var doctors []models.User
	for cursor.Next(ctx) {
		var doctor models.User
		err := cursor.Decode(&doctor)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode doctor"})
			return
		}
		doctors = append(doctors, doctor)
	}

	// Log the number of doctors found
	log.Printf("Found %d doctors", len(doctors))

	// Return the doctors in the response
	c.JSON(http.StatusOK, gin.H{"doctors": doctors})
}

func GetAppointmentsByDoctor(c *gin.Context) {
	// Get the doctorID from the URL parameter
	doctorID := c.Param("doctorID")

	// Convert the doctorID to a MongoDB ObjectID
	doctorObjectID, err := primitive.ObjectIDFromHex(doctorID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid doctor ID"})
		return
	}

	// Create a new MongoDB context with a timeout of 100 seconds
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	// Find the appointments associated with the doctor
	cursor, err := appointmentCollection.Find(ctx, bson.M{"_doctorID": doctorObjectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find appointments"})
		return
	}

	// Iterate through the cursor to decode the results
	var appointments []models.Appointment
	err = cursor.All(ctx, &appointments)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode appointments"})
		return
	}

	// Return the appointments in the response
	c.JSON(http.StatusOK, gin.H{"appointments": appointments})
}

// GetUserIDByEmail returns the ID of a user given their email
func GetUserIDByEmail(c *gin.Context) {
	// Get the email from the URL parameter
	email := c.Param("email")

	// Create a new MongoDB context with a timeout of 100 seconds
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	// Find the user by email and decode the result into a Go struct
	var user models.User
	err := userCollection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find user"})
		return
	}

	// Return the user ID in the response
	c.JSON(http.StatusOK, gin.H{"userID": user.ID.Hex()})
}

func GetUsersByID(c *gin.Context) {
	userID := c.Param("userID")
	// Convert the userID to a MongoDB ObjectID
	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Create a new MongoDB context with a timeout of 100 seconds
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	// Find the user associated with the user ID
	var user models.User
	err = userCollection.FindOne(ctx, bson.M{"_id": userObjectID}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find user"})
		return
	}

	fmt.Println("User fetched: ", user)

	// Return the user in the response
	c.JSON(http.StatusOK, gin.H{"user": user})
}

type ApprovalRequest struct {
	IsApproved bool `json:"isApproved"`
}

func ApproveDenyAppointment(c *gin.Context) {
	appointmentID := c.Param("id")

	var requestData struct {
		IsApproved bool `json:"isApproved"`
	}

	if err := c.BindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	appointmentObjectID, err := primitive.ObjectIDFromHex(appointmentID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid appointment ID"})
		return
	}

	filter := bson.M{"_id": appointmentObjectID}
	update := bson.M{"$set": bson.M{"isApproved": requestData.IsApproved}}

	var appointment models.Appointment
	err = appointmentCollection.FindOneAndUpdate(context.Background(), filter, update).Decode(&appointment)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating appointment"})
		return
	}

	if appointment.ID == primitive.NilObjectID {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Appointment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Appointment updated successfully"})
}

// DELETE

func DeleteAppointment(c *gin.Context) {
	// Get the appointmentID from the URL parameter
	appointmentID := c.Param("id")

	// Convert the appointmentID to a MongoDB ObjectID
	appointmentObjectID, err := primitive.ObjectIDFromHex(appointmentID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid appointment ID"})
		return
	}

	// Create a new MongoDB context with a timeout of 100 seconds
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	// Delete the appointment associated with the appointment ID
	result, err := appointmentCollection.DeleteOne(ctx, bson.M{"_id": appointmentObjectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete appointment"})
		return
	}

	// Check if an appointment was deleted
	if result.DeletedCount == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Appointment not found"})
		return
	}

	// Return a success message in the response
	c.JSON(http.StatusOK, gin.H{"message": "Appointment deleted successfully"})
}

// func GetAllDoctors(c *gin.Context) {
//     // Create a new MongoDB context with a timeout of 10 seconds
//     ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
//     defer cancel()

//     // Define a filter to find all users with isDoctor set to true
//     filter := bson.M{"isDoctor": true}

//     // Find all matching users
//     cur, err := userCollection.Find(ctx, filter)
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve doctors"})
//         return
//     }

//     // Iterate through the results and append them to a slice
//     var doctors []models.User
//     for cur.Next(ctx) {
//         var doctor models.User
//         err := cur.Decode(&doctor)
//         if err != nil {
//             c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode doctor data"})
//             return
//         }
//         doctors = append(doctors, doctor)
//     }

//     // Check if there were any decoding errors
//     if err := cur.Err(); err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve doctors"})
//         return
//     }

//     // Return the slice of doctors as a JSON response
//     c.JSON(http.StatusOK, gin.H{"doctors": doctors})
// }
