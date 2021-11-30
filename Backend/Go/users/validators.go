package users
import (
	"fmt"
	"starbars/common"
	 "github.com/gin-gonic/gin"
	//  "github.com/go-playground/validator/v10"

)


type UserModelValidator struct {
	User struct {
		Name string `form:"name" json:"name" binding:"required,min=3,max=255"`
		Email string `form:"email" json:"email" binding:"required,email"`
		Phone string `form:"phone" json:"phone" binding:"omitempty,min=9,max=20"`
		Address string `form:"address" json:"address" binding:"omitempty,min=4,max=255"`
		Appointment string `form:"appointment" json:"appointment" binding:"required,min=4,max=25"`
	} `json:"user"`
	UserModel UserModel `json:"-"`
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

	fmt.Println("Entra al bind del validador")
	fmt.Println(self)
	fmt.Println(self.User)
	// fmt.Println(self.Name)
	// fmt.println(self.User. )

	self.UserModel.Name = self.User.Name
	self.UserModel.Email = self.User.Email
	self.UserModel.Phone = self.User.Phone
	self.UserModel.Address = self.User.Address
	self.UserModel.Appointment = self.User.Appointment

	fmt.Println(self)
	return nil
}
 
