package users

import (
	"fmt"
	"net/http"
	"starbars/config"
	"github.com/gin-gonic/gin"
	// "starbars/common"
)

func UserCreate(c *gin.Context) {
	// var user UserModel
	userModelValidator := NewUserModelValidator()
	if err := userModelValidator.Bind(c); err != nil {
		fmt.Println("Pasa per ací")

		c.JSON(http.StatusUnprocessableEntity,err)
		return
	}

	fmt.Println("Pasa per ací")
	fmt.Println(&userModelValidator)
	fmt.Println(&userModelValidator.userModel)

	// c.BindJSON(&user)
/* 	if err := config.DB.Create(&userModelValidator.userModel).Error; err != nil {
		fmt.Println(err.Error(), "Ací hi ha un error, routers.go de users")
		c.AbortWithStatus(http.StatusNotFound)
	} */
	if err := SaveOne(&userModelValidator.userModel); err != nil {
		fmt.Println(err.Error(), "ERROR VALIDATOR")
		c.AbortWithStatus(http.StatusNotFound)
	}


	fmt.Println( " Guardat?")
	c.Set("my_user_model", userModelValidator.userModel)
	serializer := UserSerializer{c}
	c.JSON(http.StatusCreated, gin.H{"user": serializer.Response()})

	
	c.JSON(http.StatusOK, userModelValidator.userModel)
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
	var user UserModel
	if err := config.DB.Where("id = ?", id).First(&user).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}
	c.BindJSON(&user)

	if err := config.DB.Save(user);	 err != nil {
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