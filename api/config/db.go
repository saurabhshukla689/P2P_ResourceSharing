package config

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/saurabh/gin-golang-react/api/models"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "root:528491@tcp(127.0.0.1:3306)/dbwebapp?charset=utf8mb4&parseTime=True&loc=Local"
	database, err := gorm.Open("mysql", dsn)

	if err != nil {
		fmt.Println("failed to connect to DB")
	}

	database.AutoMigrate(&models.User{})

	DB = database
}
