package users
import (
	
	"starbars/common"
	 "github.com/gin-gonic/gin"
)


type UserModelValidator struct {
	User struct {
		Name string `form:"name" json:"name" binding:"exists,alphanum,min=4,max=255"`
		Email string `form:"email" json:"email" binding:"exists,email"`
		Phone string `form:"phone" json:"phone" binding:"exists"`
		Address string `form:"address" json:"adress" binding:"min=4,max=255"`

		// Password string `form:"password" json:"password" binding:"exists,min=5,max=20"`
		Active bool `form:"active" json:"active" binding:"exists"`
		Appointemnt string `form:"appointment" json:"appointment" binding:"min=4,max=25"`
	} `json:"user"`
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

	self.userModel.Email = self.User.Email
	return nil
}
