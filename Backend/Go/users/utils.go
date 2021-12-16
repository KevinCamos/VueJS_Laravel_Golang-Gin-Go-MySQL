package users

import (
	"net/http"
	"github.com/gin-gonic/gin"
)


func CheckInLaravel(c *gin.Context){
	
	myUserModel := c.MustGet("my_user_model").(UserModel)
	var jsonData = []byte(`{
		"email": "`+myUserModel.Email+`"
	}`)
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