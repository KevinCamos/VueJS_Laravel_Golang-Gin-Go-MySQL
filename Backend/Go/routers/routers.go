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

	users.UserRegister(v1.Group("/users"))

	return r

}


/* package routers

import (

	"starbars/users"
	"github.com/gin-gonic/gin"
	"net/http"


)
// CORS Middleware
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

	r := gin.New()
	r.Use(CORS) 
	v1 := r.Group("/api")



	users.UserRegister(v1.Group("/users"))

	return r

} */