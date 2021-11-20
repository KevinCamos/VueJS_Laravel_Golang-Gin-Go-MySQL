package users
import (
	// "errors"
	// "github.com/jinzhu/gorm"
	// "starbars/common"
	// // "golang.org/x/crypto/bcrypt"
)


type UserModel struct {
	Id      uint   `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
	Active bool `json:"active"`
/* 	Date_Active string `json:"date_active"` 
	Date_Inactive string `json:"date_inactive"`*/
	Appointemnt string `json:"appointemnt"`
}


func (b *UserModel) TableName() string {
	return "user"
}

