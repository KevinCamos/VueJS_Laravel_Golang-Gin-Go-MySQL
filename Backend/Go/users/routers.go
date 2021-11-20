package users

import (
	// "errors"

	"github.com/gin-gonic/gin"
	// "strconv"
)

func UserRegister(router *gin.RouterGroup) {

	/* POST */
	router.POST("/", UserCreate)

	/* GET */
	router.GET("/", GetAllUsers)
	router.GET(":id", GetUserByID)

	/* PUT */
	router.PUT(":id", UpdateUser)

	/* DELETE */
	router.DELETE(":id", DeleteUser)
}
