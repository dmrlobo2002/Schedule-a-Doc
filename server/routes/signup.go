package routes

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

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

	//DOUBLE CHECK TO SEE IF WE NEED TO CREATE A CONTEXT W TIMEOUT HERE AS WELL

	// Get the JWT token from the Authorization header
	authHeader := c.GetHeader("Authorization")
	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	// Parse the JWT token to get the email
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte("buttface"), nil
	})
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to parse JWT token"})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid JWT token"})
		return
	}

	email, ok := claims["email"].(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to get email from JWT token"})
		return
	}

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
	c.JSON(http.StatusOK, gin.H{"email": user.Email, "phoneNumber": user.PhoneNumber, "firstName": user.FirstName, "lastName": user.LastName, "isDoctor": user.IsDoctor})
}

// get a user from ID
// func GetUserById(c *gin.Context) {
// 	userID := c.Params.ByName("userId")
// 	docID, _ := primitive.ObjectIDFromHex(userID)
// 	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
// 	var user bson.M
// 	if err := userCollection.FindOne(ctx, bson.M{"_id": docID}).Decode(&user); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	defer cancel()
// 	fmt.Println(user)
// 	c.JSON(http.StatusOK, user)
// }

// type Claims struct {
//     Email    string `json:"email"`
//     IsDoctor bool   `json:"isDoctor"`
//     jwt.StandardClaims
// }
// func generateToken(user *models.User) (string, error) {
// 	expirationTime := time.Now().Add(24 *time.Hour)
// 	claims := &Claims{
// 		Email: *user.Email,
// 		IsDoctor: *user.IsDoctor,
// 		StandardClaims: jwt.StandardClaims{
// 			ExpiresAt: expirationTime.Unix(),
// 		},
// 	}
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
// 	tokenString, err := token.SignedString([]byte("butt"))
// 	if err != nil {
// 		return "error in token gener", err
// 	}
// 	return tokenString, nil
// }

// func LoginHandler(c *gin.Context) {
// 	var user models.User
// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error in loginHandler": err.Error()})
// 		return
// 	}

// 	// Query the database to find the user with the provided email
// 	foundUser, err:= findUserByEmail(user.Email)
// 	if err != nil {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalif Username or Password"})
// 		return
// 	}
// 	// Compare the provided password with the stored password
//     if *user.Password != *existingUser.Password {
// 			c.JSON(http.StatusBadRequest, gin.H{"error": "Password is incorrect"})
// 			return
// 		}
//     // Generate the JWT token
//     token, err := generateToken(foundUser)
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
//         return
//     }

//     // Return the token
//     c.JSON(http.StatusOK, gin.H{"token": token, "isDoctor": foundUser.IsDoctor})
// }
// func getUser(w http.ResponseWriter, r *http.Request) {
//     // Get the token from the Authorization header
//     authHeader := r.Header.Get("Authorization")
//     if authHeader == "" {
//         http.Error(w, "Missing authorization header", http.StatusBadRequest)
//         return
//     }
//     tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
//     if tokenStr == authHeader {
//         http.Error(w, "Invalid authorization header", http.StatusBadRequest)
//         return
//     }

//     // Verify the token and extract the user ID
//     claims, err := verifyToken(tokenStr)
//     if err != nil {
//         http.Error(w, "Invalid token", http.StatusUnauthorized)
//         return
//     }
//     userID := claims.UserID

//     // Fetch the user data from the database
//     user, err := getUserByID(userID)
//     if err != nil {
//         http.Error(w, "Failed to fetch user data", http.StatusInternalServerError)
//         return
//     }

//     // Return the user data as JSON
//     json.NewEncoder(w).Encode(user)
// }
