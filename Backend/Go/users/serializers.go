package users

import (
	"github.com/gin-gonic/gin"

	// "github.com/gothinkster/golang-gin-realworld-example-app/common"
)
type UserSerializer struct {
	c *gin.Context
}

type UserResponse struct {
	Name string  `json:"name"`
	Email    string  `json:"email"`
	// Token    string  `json:"token"`
}

func (self *UserSerializer) Response() UserResponse {
	myUserModel := self.c.MustGet("my_user_model").(UserModel)
	user := UserResponse{
		Name : myUserModel.Name,
		Email:    myUserModel.Email,
		// Bio:      myUserModel.Bio,
		// Image:    myUserModel.Image,
		// Token:    common.GenToken(myUserModel.ID),
	}
	return user

}