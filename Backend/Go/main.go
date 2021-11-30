package main

import (
	"starbars/config"
	// "fmt"
	"github.com/jinzhu/gorm"
	"github.com/gin-gonic/gin"
	
	"starbars/common"
	"starbars/users"
) 

var err error
func Migrate(db *gorm.DB) {

	config.DB.AutoMigrate(&users.UserModel{})

}

func main() {
	db := common.Init()
	Migrate(db)
	defer db.Close()

	r := gin.Default()

	v1 := r.Group("/api")
	users.UserRegister(v1.Group("/users"))


	r.Run(":8040")

/* 	r := Routes.SetupRouter()
	//running
	r.Run() */
}
