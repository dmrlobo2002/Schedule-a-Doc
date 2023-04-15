package main

import (
	"os"

	"server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		port = "8000"
	}

	// router := gin.New()
	// router.Use(gin.Logger())
	// router.Use(cors.Default())

	//server is not configured to allow cross-origin requests from your frontend application.
	//need to configure your server to allow cross-origin requests with the Authorization header.
	//this is for using authorization header when GET request using token info

	router := gin.Default()
	// Set up CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowHeaders = []string{"Authorization", "Content-Type"}
	router.Use(cors.New(config))

	// these are the endpoints
	//C
	router.POST("/signup", routes.CreateUser)
	router.POST("/login", routes.Login)
	router.POST("/createAppointmnet", routes.CreateAppointment)
	//R
	router.GET("/user-properties", routes.GetUserProperties)
	router.GET("/doctors", routes.GetAllDoctors)
	router.GET("/appointments/:doctorID", routes.GetAppointmentsByDoctor)
	router.GET("/users/:userID", routes.GetUsersByID)

	//U
	router.PATCH("/appointments/:id/status", routes.ApproveDenyAppointment)

	//D

	//this runs the server and allows it to listen to requests.
	router.Run(":" + port)
}
