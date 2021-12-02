package users
import (
	"fmt"
	"starbars/common"
	 "github.com/gin-gonic/gin"
)


type UserModelValidator struct {
	// User struct {
		Name string `form:"name" json:"name" binding:"required,min=3,max=255"`
		Email string `form:"email" json:"email" binding:"required,email"`
		Phone string `form:"phone" json:"phone" binding:"omitempty,min=9,max=20"`
		Address string `form:"address" json:"address" binding:"omitempty,min=4,max=255"`
		Appointment string `form:"appointment" json:"appointment" binding:"required,min=4,max=25"`
	// } `json:"user"`
	userModel UserModel `json:"-"`
}

func NewUserModelValidator() UserModelValidator {
	return UserModelValidator{}
}


func (self *UserModelValidator) Bind(c *gin.Context) error {
	err := common.Bind(c, self)
	if err != nil {
		return err
	}

	fmt.Println(self)
	fmt.Println(self)

	self.userModel.Name = self.Name
	self.userModel.Email = self.Email
	self.userModel.Phone = self.Phone
	self.userModel.Address = self.Address
	self.userModel.Appointment = self.Appointment

	fmt.Println(self)
	return nil
}
 
