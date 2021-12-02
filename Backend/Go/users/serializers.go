package users

import (
	"github.com/gin-gonic/gin"
	"github.com/satori/go.uuid"

	// "github.com/gothinkster/golang-gin-realworld-example-app/common"
)
type UserSerializer struct {
	c *gin.Context
}

type UserResponse struct {
	ID    		uuid.UUID	`json:"id"`
	Name 		string  `json:"name"`
	Email    	string  `json:"email"`
	Appointment string 	`json:"appointment"`
	// Token    string  `json:"token"`
}

func (self *UserSerializer) Response() UserResponse {
	myUserModel := self.c.MustGet("my_user_model").(UserModel)
	user := UserResponse{
		ID : 			myUserModel.ID,
		Name : 			myUserModel.Name,
		Email:    		myUserModel.Email,
		Appointment:    myUserModel.Appointment,

		// Bio:      myUserModel.Bio,
		// Image:    myUserModel.Image,
		// Token:    common.GenToken(myUserModel.ID),
	}
	return user

}