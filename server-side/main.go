package main

import (
	"encoding/csv"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"POST", "GET", "PUT", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"}
	config.ExposeHeaders = []string{"Content-Length"}

	router.Use(cors.New(config))

	// router.GET("/CSOdata", getCSOData)
	// router.GET("/averageEarnings", getNAverageEarnings2015)

	router.GET("/averageEarnings", getAvgWeeklyHouseholdIncome)

	router.Run("localhost:8070")
}

func getAvgWeeklyHouseholdIncome(c *gin.Context) {
	file, err := os.Open("./CSOData/HS235_AverageWeeklyHouseholdIncome.csv")
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	defer file.Close()

	reader := csv.NewReader(file)
	reader.Comma = ','
	reader.LazyQuotes = true

	records, err := reader.ReadAll()
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	var avgIncome AvgEarningsResponse
	var tmp float64
	for _, record := range records {
		if record[5] == "Employees-wages/salaries" {
			tmp, err = strconv.ParseFloat(record[9], 64)
			if err != nil {
				c.AbortWithError(http.StatusBadRequest, err)
				return
			}
			avgIncome.EmployeesWages = tmp
			continue
		} else if record[5] == "Self-employed income" {
			tmp, err = strconv.ParseFloat(record[9], 64)
			if err != nil {
				c.AbortWithError(http.StatusBadRequest, err)
				return
			}
			avgIncome.SelfEmployeed = tmp
			continue
		} else if record[5] == "Retirement pensions" {
			tmp, err = strconv.ParseFloat(record[9], 64)
			if err != nil {
				c.AbortWithError(http.StatusBadRequest, err)
				return
			}
			avgIncome.RetirementPension = tmp
			continue
		} else if record[5] == "Child benefit" {
			tmp, err = strconv.ParseFloat(record[9], 64)
			if err != nil {
				c.AbortWithError(http.StatusBadRequest, err)
				return
			}
			avgIncome.ChildBenefit = tmp
			continue
		} else if record[5] == "Investment income" {
			tmp, err = strconv.ParseFloat(record[9], 64)
			if err != nil {
				c.AbortWithError(http.StatusBadRequest, err)
				return
			}
			avgIncome.InvestmentIncome = tmp
			continue
		}
	}

	c.IndentedJSON(http.StatusOK, avgIncome)
}

// I had planned to request the data from CSO directly, however the documentation provided by them is not great and
//  I can't get a struct that the response will correctly unmarshall in to.

// I am leaving these two endpoint functions here to show that I had put a substantial amount of work in to trying to figure it out.

// func getCSOData(c *gin.Context) {
// 	url := "https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.ReadDataset/EHQ04/JSON-stat/2.0/en"
// 	req, err := http.NewRequest("GET", url, nil)
// 	if err != nil {
// 		c.AbortWithError(http.StatusBadRequest, err)
// 	}
// 	res, err := http.DefaultClient.Do(req)
// 	if err != nil {
// 		c.AbortWithError(http.StatusBadRequest, err)
// 	}
// 	defer res.Body.Close()
// 	body, readErr := ioutil.ReadAll(res.Body)
// 	if readErr != nil {
// 		c.AbortWithError(http.StatusBadRequest, err)
// 	}
// 	var d dataCSO
// 	err = json.Unmarshal(body, &d)
// 	if err != nil {
// 		c.AbortWithError(http.StatusBadRequest, err)
// 	}
// 	c.IndentedJSON(http.StatusOK, d)
// }

// func getNAverageEarnings2015(c *gin.Context) {
// 	url := "https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.ReadDataset/HS067/JSON-stat/1.0/en"

// 	resp, err := http.Get(url)
// 	if err != nil {
// 		c.AbortWithError(http.StatusBadRequest, err)
// 		return
// 	}

// 	defer resp.Body.Close()

// 	body, err := ioutil.ReadAll(resp.Body)
// 	if err != nil {
// 		c.AbortWithError(http.StatusInternalServerError, err)
// 		return
// 	}

// 	var data Data
// 	err = json.Unmarshal(body, &data)
// 	if err != nil {
// 		c.AbortWithError(http.StatusInternalServerError, err)
// 		return
// 	}
// 	sum := 0.0
// 	count := 0
// 	for _, value := range data.Dataset.Value {
// 		sum += value
// 		count++
// 	}
// 	var average float64
// 	if count > 0 {
// 		average = sum / float64(count)
// 	}

// 	r := AvgResponse{
// 		Message:      "Success",
// 		DataReturned: data,
// 		AvgEarnings:  average,
// 	}

// 	c.IndentedJSON(http.StatusOK, r)
// }
