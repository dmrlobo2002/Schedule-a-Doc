package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Appointment struct {
	Date     *string            `json:"date"`
	Category *string            `json:"category"`
	Patient  primitive.ObjectID `bson:"_id"`
	Doctor   primitive.ObjectID `bson:"_id"`
}
