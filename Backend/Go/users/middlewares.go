package users

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
	"starbars/common"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"fmt"
	// "github.com/satori/go.uuid"
	"reflect"
	
)

// Strips 'TOKEN ' prefix from token string
func stripBearerPrefixFromTokenString(tok string) (string, error) {
	// Should be a bearer token
	fmt.Println(strings.ToUpper(tok[0:7]))

	if len(tok) > 6 && strings.ToUpper(tok[0:7]) == "BEARER " {
		fmt.Println("TOKEN!!")
		return tok[7:], nil
	}
	fmt.Println("NO EMPIEZA POR TOKEN")

	return tok, nil
}

// Extract  token from Authorization header
// Uses PostExtractionFilter to strip "TOKEN " prefix from header
var AuthorizationHeaderExtractor = &request.PostExtractionFilter{

	request.HeaderExtractor{"Authorization"},
	stripBearerPrefixFromTokenString,
}

// Extractor for OAuth2 access tokens.  Looks in 'Authorization'
// header then 'access_token' argument for a token.
var MyAuth2Extractor = &request.MultiExtractor{
	AuthorizationHeaderExtractor,
	request.ArgumentExtractor{"access_token"},
}

// A helper to write user_id and user_model to the context
func UpdateContextUserModel(c *gin.Context, my_user_id string) {
	var myUserModel UserModel
	if my_user_id != "0" {
		db := common.GetDB()
		db.First(&myUserModel, my_user_id)
	}
	c.Set("my_user_id", my_user_id)
	c.Set("my_user_model", myUserModel)
}

// You can custom middlewares yourself as the doc: https://github.com/gin-gonic/gin#custom-middleware
//  r.Use(AuthMiddleware(true))
func AuthMiddleware(auto401 bool) gin.HandlerFunc {

	return func(c *gin.Context) {
		fmt.Println("1")
		UpdateContextUserModel(c, "0")
		token, err := request.ParseFromRequest(c.Request, MyAuth2Extractor, func(token *jwt.Token) (interface{}, error) {
			b := ([]byte(common.NBSecretPassword))
			fmt.Println(b)
			fmt.Println([]byte(common.NBSecretPassword))

			return b, nil
		})
		fmt.Println("2")

		if err != nil {
			fmt.Println("3")

			if auto401 {
				fmt.Println("error")

				c.AbortWithError(http.StatusUnauthorized, err)
			}
			return
		}
		fmt.Println("4")

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			fmt.Println("claims")
			fmt.Println(claims)
			fmt.Println(claims["appointment"])
			fmt.Println(reflect.TypeOf(claims["appointment"]))
			
			// my_user_id := claims["id"]

			if claims["appointment"] != "gerente"  {
				fmt.Println("error")

				c.AbortWithError(http.StatusUnauthorized,err)
			} else{
				fmt.Println("ES GERENT!")

			}

			// fmt.Println(my_user_id)

			//fmt.Println(my_user_id,claims["id"])
			// UpdateContextUserModel(c, my_user_id)
		}
	}
}