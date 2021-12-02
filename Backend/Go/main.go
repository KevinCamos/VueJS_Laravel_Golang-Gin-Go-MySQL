package main

import (
	"starbars/config"
	"gorm.io/gorm"
	"starbars/routers"
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
	routersInit := routers.InitRouter()	
 	routersInit.Run(":8040")
}