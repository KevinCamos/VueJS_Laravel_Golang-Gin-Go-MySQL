package users

import (
	// "errors"

	"github.com/gin-gonic/gin"
	// "strconv"
)

func UserRouter(router *gin.RouterGroup) {

	/* POST */
	router.GET("/checkAdmin", CheckAdmin)

	/* POST */
	router.POST("/", UserRegister)

	/* GET */
	router.GET("/", GetAllUsers)
	router.GET(":id", GetUserByID)

	/* PUT */
	router.PUT(":id", UpdateUser)

	/* DELETE */
	router.DELETE(":id", DeleteUser)
}



func UserRouterNoAuth(router *gin.RouterGroup) {
	/* POST */
	router.POST("/login", UserLogin)
	router.GET("/prueba", prueba)

}
