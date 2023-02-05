package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Appointment struct {
	ID         primitive.ObjectID `bson:"_id"`
	Date       *string            `json:"date"`
	Category   *string            `json:"category"`
	Patient    primitive.ObjectID `bson:"_patientID"`
	Doctor     primitive.ObjectID `bson:"_doctorID"`
	isApproved *bool              `json:"isDoctor"`
}
