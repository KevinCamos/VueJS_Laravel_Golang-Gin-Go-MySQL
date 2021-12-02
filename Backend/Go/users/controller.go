package users

import (
	"fmt"
	"net/http"
	"starbars/config"
	"github.com/gin-gonic/gin"
)

func UserCreate(c *gin.Context) {
	userModelValidator := NewUserModelValidator()
	if err := userModelValidator.Bind(c); err != nil {
		
		c.JSON(http.StatusUnprocessableEntity,gin.H{
			"error": "400"})
		return
	}
	// fmt.Println(&userModelValidator)
	// fmt.Println(&userModelValidator.userModel)

	if err := SaveOne(&userModelValidator.userModel); err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}
	fmt.Println( " Guardat?")
	c.Set("my_user_model", userModelValidator.userModel)
	serializer := UserSerializer{c}
	c.JSON(http.StatusCreated, serializer.Response())

	
	// c.JSON(http.StatusCreated, gin.H{"user": serializer.Response()})

	/* Respuesta sin serializar */
	//  c.JSON(http.StatusOK, userModelValidator.userModel)
}


func GetAllUsers(c *gin.Context) {
	var user []UserModel
	// err = Models.GetAllUsers(&user)
	if err := config.DB.Find(&user).Error; err != nil {
		fmt.Println("entra", "error")

		c.AbortWithStatus(http.StatusNotFound)
	} 
		fmt.Println("entra", user)

		c.JSON(http.StatusOK, user)
	
}
func GetUserByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var user UserModel
	if err := config.DB.Where("id = ?", id).First(&user).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}
		c.JSON(http.StatusOK, user)
	
}
func UpdateUser(c *gin.Context) {
	id := c.Params.ByName("id")
	fmt.Println("id", id)

	var user UserModel
	if err := config.DB.Where("id = ?", id).First(&user).Error; err != nil {
		fmt.Println("errorput1", "errorput1")

		c.AbortWithStatus(http.StatusNotFound)
	}
	c.BindJSON(&user)
	c.JSON(http.StatusOK, user)

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
