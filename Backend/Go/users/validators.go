package users
import (

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
		Password string `form:"password" json:"password" binding:"required,min=4,max=255"`	
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
	self.userModel.Name = self.Name
	self.userModel.Email = self.Email
	self.userModel.Phone = self.Phone
	self.userModel.Address = self.Address
	self.userModel.Appointment = self.Appointment

	if self.Password != common.NBRandomPassword {
		self.userModel.setPassword(self.Password)
	}else{
		self.userModel.setPassword(self.Name+"123"/* common.getPassword(self.Name) */)
	}
	return nil
}



type LoginValidator struct {
		Email    string `form:"email" json:"email" binding:"required,email"`
		Password string `form:"password"json:"password" binding:"required,min=8,max=255"`
	userModel UserModel `json:"-"`
}

// You can put the default value of a Validator here
func NewLoginValidator() LoginValidator {
	loginValidator := LoginValidator{}
	return loginValidator
}
func (self *LoginValidator) Bind(c *gin.Context) error {
	err := common.Bind(c, self)
	if err != nil {
		return err
	}

	self.userModel.Email = self.Email
	return nil
}