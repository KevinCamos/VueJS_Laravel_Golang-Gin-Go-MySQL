package main

import (
	"starbars/config"
	"starbars/routers"
	// "fmt"

	"github.com/jinzhu/gorm"
	// "github.com/gin-gonic/gin"
	
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
	routersInit := routers.InitRouter()	
	routersInit.Run(":8040")
   
	
}
