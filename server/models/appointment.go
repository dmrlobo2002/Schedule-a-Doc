package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Appointment struct {
	ID         primitive.ObjectID `bson:"_id"`
	Date       *string            `json:"date"`
	Category   *string            `json:"category"`
	Patient    primitive.ObjectID `bson:"_patientID" json:"patientID"`
	Doctor     primitive.ObjectID `bson:"_doctorID" json:"doctorID"`
	Approved *bool              `bson:"isApproved" json:"isApproved"`
}

