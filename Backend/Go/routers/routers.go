package routers

import (
	"starbars/users"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)


func InitRouter() *gin.Engine {

	r := gin.Default()
	r.Use(cors.Default())

	v1 := r.Group("/api")
	users.UserRouterNoAuth(v1.Group("/users"))


	v1.Use(users.AuthMiddleware(true))
	users.UserRouter(v1.Group("/user"))


	return r

}