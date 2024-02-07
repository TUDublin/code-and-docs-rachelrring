package main

import (
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

// album represents data about a record album.
type album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

// albums slice to seed record album data.
var albums = []album{
	{ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func main() {
	router := gin.Default()
	router.GET("/albums", getAlbums)
	router.GET("/data", getCSOData)

	router.Run("localhost:8080")
}

// getAlbums responds with the list of all albums as JSON.
func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

func getCSOData(c *gin.Context) {
	url := "https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.ReadDataset/EHQ04/JSON-stat/2.0/en"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	}
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	}
	defer res.Body.Close()
	body, readErr := ioutil.ReadAll(res.Body)
	if readErr != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	}
	myString := string(body[:])
	c.String(http.StatusOK, myString)
}
