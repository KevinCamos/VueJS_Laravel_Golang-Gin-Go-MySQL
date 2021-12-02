package users

import (
	"fmt"
	"net/http"
	"starbars/config"
	"github.com/gin-gonic/gin"
)

func UserRegister(c *gin.Context) {
	userModelValidator := NewUserModelValidator()
	if err := userModelValidator.Bind(c); err != nil {
		
		c.JSON(http.StatusUnprocessableEntity,gin.H{
			"error": "400"})
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


func GetAllUsers(c *gin.Context) {
	var user []UserModel

	if err := config.DB.Find(&user).Error; err != nil {
		fmt.Println("entra", "error")
		c.AbortWithStatus(http.StatusNotFound)
	} 
		fmt.Println("entra", user)
	serializer := UsersSerializer{c, user}
	c.JSON(http.StatusCreated, serializer.Response())
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
