package routes_test

import (
	"context"
	"testing"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"github.com/stretchr/testify/assert"
)

func TestMongoDBConnection(t *testing.T) {
	// Set up MongoDB client options
	clientOptions := options.Client().ApplyURI("mongodb+srv://cen3031:cen3031@cluster0.j5xkmde.mongodb.net/?retrxyWrites=true&w=majority")

	// Create MongoDB client
	client, err := mongo.Connect(context.Background(), clientOptions)
	assert.NoError(t, err)

	// Check connection
	err = client.Ping(context.Background(), nil)
	assert.NoError(t, err)

	// Disconnect MongoDB client
	err = client.Disconnect(context.Background())
	assert.NoError(t, err)
}
