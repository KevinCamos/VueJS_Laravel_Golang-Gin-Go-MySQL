package users

import (
	"starbars/common"
	"github.com/gin-gonic/gin"
	"github.com/satori/go.uuid"
	"fmt"
	
	// "github.com/gothinkster/golang-gin-realworld-example-app/common"
)
type RegisterSerializer struct {
	c 		*gin.Context
}
type RegisterResponse struct {
	ID    		uuid.UUID	`json:"id"`
	Name 		string  `json:"name"`
	Email    	string  `json:"email"`
	Appointment string 	`json:"appointment"`
	Token    string  `json:"token"`
}

/* Serialización para un usuario individual, tras registrarse o login, emite TOKEN */
func (self *RegisterSerializer) Response() RegisterResponse {
	myUserModel := self.c.MustGet("my_user_model").(UserModel)
	user := RegisterResponse{
		ID : 			myUserModel.ID,
		Name : 			myUserModel.Name,
		Email:    		myUserModel.Email,
		Appointment:    myUserModel.Appointment,
		Token:    common.GenToken(myUserModel.ID),
	}
	return user

}







/* SERIALIZACIÓN CADA USUARIO SIN TOKEN*/

type UserResponse struct {
	ID    		uuid.UUID	`json:"id"`
	Name 		string  `json:"name"`
	Email    	string  `json:"email"`
	Appointment string 	`json:"appointment"`
}


type UserSerializer struct {
	c 		*gin.Context
}

/* Serialización para un usuario individual, también se llama a esta serialización desde la serialización de muchos usuarios */
func (self *UserSerializer) Response() UserResponse {
	myUserModel := self.c.MustGet("my_user_model").(UserModel)
	user := UserResponse{
		ID : 			myUserModel.ID,
		Name : 			myUserModel.Name,
		Email:    		myUserModel.Email,
		Appointment:    myUserModel.Appointment,
	}
	return user

}





/* SERIALIZACIÓN DE MÚLTIPLES USUARIOS */
type UsersSerializer struct {
	c        *gin.Context
	Users 	[]UserModel
}
/* Esta respuesta obtendrá los datos de UsersSerializer, realizará un bucle de su array (Users UserModel[])
 y realizará una serialización responiendo con el serializador individual definido anteriormente  */
func (self *UsersSerializer) Response() []UserResponse {
	response := []UserResponse{}

	fmt.Println(len( self.Users), "usuarios")
	for _, user := range self.Users {

		self.c.Set("my_user_model", user)
		 serializer := UserSerializer{self.c}
		response = append(response, serializer.Response())
	}
	
	return response
}