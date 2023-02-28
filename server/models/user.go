package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID          primitive.ObjectID `bson:"_id"`
	Email       *string            `json:"email"`
	PhoneNumber *string            `json:"phoneNumber"`
	Password    *string            `json:"password"`
	FirstName   *string            `json:"firstName"`
	LastName    *string            `json:"lastName"`
	IsDoctor    *bool              `json:"isDoctor"`
}
