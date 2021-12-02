package common

import (
	"fmt"
	"gorm.io/gorm"
	"starbars/config"
	"gorm.io/driver/mysql"

	_ "github.com/go-sql-driver/mysql"
)


type Database struct {
	*gorm.DB
}

var DB *gorm.DB

var err error

func Init() *gorm.DB {
	config.DB, err =gorm.Open(mysql.New(mysql.Config{
  DSN:config.DbURL(config.BuildDBConfig()), 
}))// data source name, refer https://github.com/go-sql-driver/mysql#dsn-data-source-name
	if err != nil {
		fmt.Println("Status:", err)
	}
	fmt.Println("Status:", "entra")
	DB = config.DB
	return config.DB

}

// Using this function to get a connection, you can create your connection pool here.
func GetDB() *gorm.DB {
	return DB
}