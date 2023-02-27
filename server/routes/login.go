package routes

import (
    "context"
    "fmt"
    "net/http"
    "time"

    "server/models"

    "github.com/gin-gonic/gin"
    "github.com/go-playground/validator/v10"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var userCollection *mongo.Collection = OpenCollection(Client, "users")
var validate = validator.New()

func Login(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

    var loginData struct {
        Email    string `json:"email" validate:"required,email"`
        Password string `json:"password" validate:"required"`
    }

    if err := c.ShouldBindJSON(&loginData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    validationErr := validate.Struct(loginData)
    if validationErr != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
        return
    }

    var user models.User
    err := userCollection.FindOne(ctx, bson.M{"email": loginData.Email, "password": loginData.Password}).Decode(&user)
    if err != nil {
        if err == mongo.ErrNoDocuments {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password."})
            return
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
    }

    token, err := GenerateToken(user.ID.Hex())
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token."})
        return
    }

    c.SetCookie("token", token, 60*60*24*7, "/", "", false, true)
    c.JSON(http.StatusOK, gin.H{"message": "Login successful."})

    defer cancel()
}

func GenerateToken(userID string) (string, error) {
    expirationTime := time.Now().Add(7 * 24 * time.Hour)
    claims := &models.Claims{
        UserID: userID,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: expirationTime.Unix(),
        },
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte("secret"))
}
