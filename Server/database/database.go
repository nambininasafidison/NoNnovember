package server

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() (*gorm.DB, error) {
	err := godotenv.Load()
	if err != nil {
		err = fmt.Errorf("error reading .env file")
		return nil, err
	}
	dbuser := os.Getenv("DB_USER")
	dbpassword := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	dsn := fmt.Sprintf("host=localhost user=%v password=%v dbname=%v port=5432 sslmode=disable", dbuser, dbpassword, dbname)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err == nil {
		return db, nil
	} else {
		return nil, err
	}
}
