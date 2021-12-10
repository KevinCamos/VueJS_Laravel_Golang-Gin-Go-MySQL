package users


import (
	"starbars/common"
"log"
	"fmt"
	"net/http"
    "net/url"
	"encoding/json"

)




	func postForm(data url.Values) {
		fmt.Println(data)
		fmt.Println(data)
		fmt.Println(common.URLLaravel+"login")

/* Los datos se envían con PostForm. */
		resp, err := http.PostForm(common.URLLaravel+"login", data)
		if err != nil {
			fmt.Println("NIL")
			log.Fatal(err)
		}
		
/* Decodificamos el cuerpo de respuesta en un mapa. */
		var res map[string]interface{}

		json.NewDecoder(resp.Body).Decode(&res)
/* pintem el formulari */
fmt.Println(res["form"])
fmt.Println(res)

	}


