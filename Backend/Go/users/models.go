package users
import (
	"gorm.io/gorm"
	"github.com/satori/go.uuid"
	"starbars/common"
	"fmt"
)


type UserModel struct {
	ID     		uuid.UUID 	`gorm:"column:id;type:uuid;primary_key;json:"id""`
	Name   		 string		`json:"name"`
	Email  		 string		`json:"email"`
	Phone  		 string		`json:"phone"`
	Address		 string		`json:"address"`
	Appointment  string 	`json:"appointment"`
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


  // You could input an UserModel which will be saved in database returning with error info
// 	if err := SaveOne(&userModel); err != nil { ... }
func SaveOne(data interface{}) error {
	db := common.GetDB()
	err := db.Save(data).Error
	
	return err
}