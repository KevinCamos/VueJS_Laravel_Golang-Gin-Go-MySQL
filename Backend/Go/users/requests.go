package users


import (
	"starbars/common"
	"fmt"
	"net/http"
	"bytes"
	// "io/ioutil"
)

	func postForm(jsonData []byte)bool {

		fmt.Println(common.URLLaravel+"login")
		
		url:=common.URLLaravel+"auth"
      
		request, err:= http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
		request.Header.Set("Content-Type", "application/json; charset=UTF-8")
		client := &http.Client{}
		response, err := client.Do(request)
		if err != nil {
			panic(err)
		}
		defer response.Body.Close()

		fmt.Println("response Status:", response.Status)
		fmt.Println("http.Status", http.StatusOK)
		// fmt.Println("response Headers:", response.Header)
		// fmt.Println("response Headers:", response.Body)
		// body, _ := ioutil.ReadAll(response.Body)
		// fmt.Println("response Body:", string(body))

		
		if(response.Status == "200 OK"){
			/* AÇÒ NO VA, HI HAURIA QUE COMPROBAR SI TORNA ALGO O QUÉ */
			fmt.Println("TOT OK" )
			return true
		}else{
			fmt.Println("FAIL" )
			// err:= nil!=error
			return false
		}
		
	

	}


