package routers

import (
	"starbars/users"
	// "time"
	// "github.com/gin-contrib/cors"
	"net/http"
	"github.com/gin-gonic/gin"
)
/* https://asanchez.dev/blog/cors-golang-options/ */
func CORS(c *gin.Context) {

	// First, we add the headers with need to enable CORS
	// Make sure to adjust these headers to your needs
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "*")
	c.Header("Access-Control-Allow-Headers", "*")
	c.Header("Content-Type", "application/json")

	// Second, we handle the OPTIONS problem
	if c.Request.Method != "OPTIONS" {	
		c.Next()
	} else {   
		// Everytime we receive an OPTIONS request, 
		// we just return an HTTP 200 Status Code
		// Like this, Angular can now do the real 
		// request using any other method than OPTIONS
		c.AbortWithStatus(http.StatusOK)
	}
}
func InitRouter() *gin.Engine {

	r := gin.Default()
	r.Use(CORS) 


	v1 := r.Group("/api")
	users.UserRouterNoAuth(v1.Group("/users"))


	v1.Use(users.AuthMiddleware(true))
	users.UserRouter(v1.Group("/user"))


	return r

} 