package users
import (
	"starbars/common"
	
	"gorm.io/gorm"
	"github.com/satori/go.uuid"
	"golang.org/x/crypto/bcrypt"
	"errors"
	"fmt"
)


type UserModel struct {
	ID     		uuid.UUID 	`gorm:"column:id;type:uuid;primary_key;json:"id""`
	Name   		 string		`json:"name"`
	Email  		 string		`json:"email"`
	Phone  		 string		`json:"phone"`
	Address		 string		`json:"address"`
	Appointment  string 	`json:"appointment"`
	PasswordHash string  	`gorm:"column:password;not null"`

}


func (b *UserModel) TableName() string {
	return "user"
}

// BeforeCreate will set a UUID rather than numeric ID.
func (userModel *UserModel) BeforeCreate(tx *gorm.DB) (err error) {
	// UUID version 4
	userModel.ID = uuid.NewV4()
	fmt.Println("------------------------1")
	fmt.Println(userModel.ID)
	fmt.Println("------------------------1")
	return
  }



// What's bcrypt? https://en.wikipedia.org/wiki/Bcrypt
// Golang bcrypt doc: https://godoc.org/golang.org/x/crypto/bcrypt
// You can change the value in bcrypt.DefaultCost to adjust the security index.
// 	err := userModel.setPassword("password0")
func (u *UserModel) setPassword(password string) error {
	if len(password) == 0 {
		return errors.New("password should not be empty!")
	}
	bytePassword := []byte(password)
	// Make sure the second param `bcrypt generator cost` between [4, 32)
	passwordHash, _ := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
	u.PasswordHash = string(passwordHash)
	return nil
}



  // You could input an UserModel which will be saved in database returning with error info
// 	if err := SaveOne(&userModel); err != nil { ... }
func SaveOne(data interface{}) error {
	db := common.GetDB()
	err := db.Save(data).Error
	
	return err
}


