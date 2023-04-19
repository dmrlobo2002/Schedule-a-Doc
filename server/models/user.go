package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID          primitive.ObjectID `bson:"_id"`
	Email       *string            `json:"email" binding:"required,email"`
	PhoneNumber *string            `json:"phoneNumber" binding:"required"`
	Password    *string            `json:"password" binding:"required"`
	FirstName   *string            `json:"firstName" binding:"required"`
	LastName    *string            `json:"lastName" binding:"required"`
	IsDoctor    *bool              `json:"isDoctor"`
}

