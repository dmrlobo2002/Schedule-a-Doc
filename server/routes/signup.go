package routes

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"server/models"
	"go.mongodb.org/mongo-driver/bson"
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
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	var result models.User
	if err := userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&result); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email"})
		return
	}

	if result.Password != user.Password {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid password"})
		return
	}

	// Create token
	tokenString, err := models.CreateToken(result)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create token"})
		return
	}

	defer cancel()
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}





