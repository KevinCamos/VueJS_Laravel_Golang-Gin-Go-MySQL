package users
import (
	"fmt"
	"starbars/common"
	 "github.com/gin-gonic/gin"

)


type UserModelValidator struct {
	User struct {
		
		Name string `form:"name" json:"name" binding:"required,min=3,max=255"`
		Email string `form:"email" json:"email" binding:"required,email"`
		Phone string `form:"phone" json:"phone" binding:"omitempty,min=9,max=20"`
		Address string `form:"address" json:"address" binding:"omitempty,min=4,max=255"`
		Appointment string `form:"appointment" json:"appointment" binding:"required,min=4,max=25"`
	} `json:"user"`
	userModel UserModel `json:"-"`
}

func NewUserModelValidator() UserModelValidator {
	return UserModelValidator{}
}


func (self *UserModelValidator) Bind(c *gin.Context) error {
	err := common.Bind(c, self)
	if err != nil {
		fmt.Println("Error en bind-validators")
		return err
	}

	fmt.Println(self)
	fmt.Println(self.User)
	// fmt.Println(self.Name)
	// fmt.println(self.User. )

	self.userModel.Name = self.User.Name
	self.userModel.Email = self.User.Email
	self.userModel.Phone = self.User.Phone
	self.userModel.Address = self.User.Address
	self.userModel.Appointment = self.User.Appointment

	fmt.Println(self)
	return nil
}
 
