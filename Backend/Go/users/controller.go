package users

import (
	"fmt"
	"net/http"
	"starbars/config"
	"starbars/common"
	"github.com/gin-gonic/gin"
	"errors"

	// "net/url"
	
)

func UserRegister(c *gin.Context) {
	userModelValidator := NewUserModelValidator()
	if err := userModelValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity,gin.H{
			"error": "400"})
		return
	}


	err := CheckFindOneUser(&UserModel{Email: userModelValidator.userModel.Email})
	if err == nil {
		c.JSON(http.StatusForbidden, common.NewError("Registrer", errors.New("Este usuario ya se encuentra registrado")))
		return
	}


	if err := SaveOne(&userModelValidator.userModel); err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}
	fmt.Println( " Guardat?")
	c.Set("my_user_model", userModelValidator.userModel)
	serializer := RegisterSerializer{c}
	c.JSON(http.StatusCreated, serializer.Response())

}


func UserLogin(c *gin.Context) {


	loginValidator := NewLoginValidator()
	if err := loginValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, err)
		return
	}

	fmt.Println(loginValidator.Email, loginValidator.userModel, loginValidator)
	userModel, err := FindOneUser(&UserModel{Email: loginValidator.userModel.Email})

	if err != nil {
		c.JSON(http.StatusForbidden, common.NewError("login", errors.New("Not Registered email or invalid password")))
		return
	}

	if userModel.checkPassword(loginValidator.Password) != nil {
		c.JSON(http.StatusForbidden,common.NewError("login", errors.New("Not Registered email or invalid password")))
		return
	}
	var jsonData = []byte(`{
		"email": "`+loginValidator.Email+`",
		"password": "`+loginValidator.Password+`"
	}`)
	
	c.Set("my_user_model", userModel)
	myUserModel := c.MustGet("my_user_model").(UserModel)

	appointment:=myUserModel.Appointment
	if appointment == "gerente" {
		if data:= postForm(jsonData); data != true {
			c.JSON(http.StatusNotFound, gin.H{"message": "no authorized"})
			return
		}
		serializer := RegisterSerializer{c}
		c.JSON(http.StatusOK, gin.H{"user": serializer.Response()})
		return
	}else{
		c.JSON(http.StatusNotFound, gin.H{"message": "no authorized"})

		}
	}


func GetAllUsers(c *gin.Context) {
	var user []UserModel

	if err := config.DB.Find(&user).Error; err != nil {
		fmt.Println("entra", "error")
		c.AbortWithStatus(http.StatusNotFound)
	} 
		fmt.Println("entra", user)
	serializer := UsersSerializer{c, user}
	// console.log(serializer.Response())
	c.JSON(http.StatusCreated, serializer.Response())
}
func GetUserByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var user UserModel
	if err := config.DB.Where("id = ?", id).First(&user).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	c.Set("my_user_model", user)
	// serializer := RegisterSerializer{c}
	serializer := UserSerializer{c}
	c.JSON(http.StatusCreated, serializer.Response())

}
func UpdateUser(c *gin.Context) {
	id := c.Params.ByName("id")
	fmt.Println("id", id)

	var user UserModel
	if err := config.DB.Where("id = ?", id).First(&user).Error; err != nil {
		fmt.Println("errorput1", "errorput1")

		c.AbortWithStatus(http.StatusNotFound)
	}
	// c.BindJSON(&user)
	c.Set("my_user_model", user)
	serializer := UserSerializer{c}
	c.JSON(http.StatusCreated, serializer.Response())
	
	// c.JSON(http.StatusOK, user)

	if err := config.DB.Save(&user);	 err != nil {
		fmt.Println("errorput2", "errorput2")

		 c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, user)
	}
}
func DeleteUser(c *gin.Context) {
	var user UserModel
	id := c.Params.ByName("id")
	if err :=config.DB.Where("id = ?", id).Delete(user).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status":  gin.H{
			"id: ": id,
			"status": "Eliminado con éxito",
			},
			"code":http.StatusOK,
			})
		}
}
