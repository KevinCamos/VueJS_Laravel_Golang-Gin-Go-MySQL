package routers

import (

	"starbars/users"
	"github.com/gin-gonic/gin"

)


func InitRouter() *gin.Engine {

	r := gin.New()
	v1 := r.Group("/api")



	users.UserRegister(v1.Group("/users"))

	return r

}