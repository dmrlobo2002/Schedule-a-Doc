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

	router := gin.New()
	router.Use(gin.Logger())

	router.Use(cors.Default())

	// these are the endpoints
	//C
	router.POST("/signup", routes.CreateUser)
	router.POST("/appointment", routes.CreateAppointment)
	//R
	
	//U
	
	//D

	//this runs the server and allows it to listen to requests.
	router.Run(":" + port)
}
