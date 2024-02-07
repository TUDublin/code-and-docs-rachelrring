package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type dataCSO struct {
	Class     string `json:"class"`
	Dimension struct {
		STATISTIC struct {
			Category struct {
				Index []string `json:"index"`
				Label struct {
					EHQ04C01 string `json:"EHQ04C01"`
					EHQ04C02 string `json:"EHQ04C02"`
					EHQ04C03 string `json:"EHQ04C03"`
					EHQ04C04 string `json:"EHQ04C04"`
					EHQ04C05 string `json:"EHQ04C05"`
					EHQ04C06 string `json:"EHQ04C06"`
					EHQ04C07 string `json:"EHQ04C07"`
					EHQ04S1  string `json:"EHQ04S1"`
					EHQ04S2  string `json:"EHQ04S2"`
					EHQ04S3  string `json:"EHQ04S3"`
					EHQ04S4  string `json:"EHQ04S4"`
					EHQ04S5  string `json:"EHQ04S5"`
					EHQ04S6  string `json:"EHQ04S6"`
					EHQ04S7  string `json:"EHQ04S7"`
				} `json:"label"`
				Unit struct {
					EHQ04C01 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04C01"`
					EHQ04C02 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04C02"`
					EHQ04C03 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04C03"`
					EHQ04C04 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04C04"`
					EHQ04C05 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04C05"`
					EHQ04C06 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04C06"`
					EHQ04C07 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04C07"`
					EHQ04S1 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04S1"`
					EHQ04S2 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04S2"`
					EHQ04S3 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04S3"`
					EHQ04S4 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04S4"`
					EHQ04S5 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04S5"`
					EHQ04S6 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04S6"`
					EHQ04S7 struct {
						Decimals int    `json:"decimals"`
						Label    string `json:"label"`
						Position string `json:"position"`
					} `json:"EHQ04S7"`
				} `json:"unit"`
			} `json:"category"`
			Label string `json:"label"`
		} `json:"STATISTIC"`
		TLISTQ1 struct {
			Category struct {
				Index []string `json:"index"`
				Label struct {
					Num20081 string `json:"20081"`
					Num20082 string `json:"20082"`
					Num20083 string `json:"20083"`
					Num20084 string `json:"20084"`
					Num20091 string `json:"20091"`
					Num20092 string `json:"20092"`
					Num20093 string `json:"20093"`
					Num20094 string `json:"20094"`
					Num20101 string `json:"20101"`
					Num20102 string `json:"20102"`
					Num20103 string `json:"20103"`
					Num20104 string `json:"20104"`
					Num20111 string `json:"20111"`
					Num20112 string `json:"20112"`
					Num20113 string `json:"20113"`
					Num20114 string `json:"20114"`
					Num20121 string `json:"20121"`
					Num20122 string `json:"20122"`
					Num20123 string `json:"20123"`
					Num20124 string `json:"20124"`
					Num20131 string `json:"20131"`
					Num20132 string `json:"20132"`
					Num20133 string `json:"20133"`
					Num20134 string `json:"20134"`
					Num20141 string `json:"20141"`
					Num20142 string `json:"20142"`
					Num20143 string `json:"20143"`
					Num20144 string `json:"20144"`
					Num20151 string `json:"20151"`
					Num20152 string `json:"20152"`
					Num20153 string `json:"20153"`
					Num20154 string `json:"20154"`
					Num20161 string `json:"20161"`
					Num20162 string `json:"20162"`
					Num20163 string `json:"20163"`
					Num20164 string `json:"20164"`
					Num20171 string `json:"20171"`
					Num20172 string `json:"20172"`
					Num20173 string `json:"20173"`
					Num20174 string `json:"20174"`
					Num20181 string `json:"20181"`
					Num20182 string `json:"20182"`
					Num20183 string `json:"20183"`
					Num20184 string `json:"20184"`
					Num20191 string `json:"20191"`
					Num20192 string `json:"20192"`
					Num20193 string `json:"20193"`
					Num20194 string `json:"20194"`
					Num20201 string `json:"20201"`
					Num20202 string `json:"20202"`
					Num20203 string `json:"20203"`
					Num20204 string `json:"20204"`
					Num20211 string `json:"20211"`
					Num20212 string `json:"20212"`
					Num20213 string `json:"20213"`
					Num20214 string `json:"20214"`
					Num20221 string `json:"20221"`
					Num20222 string `json:"20222"`
					Num20223 string `json:"20223"`
					Num20224 string `json:"20224"`
					Num20231 string `json:"20231"`
					Num20232 string `json:"20232"`
					Num20233 string `json:"20233"`
				} `json:"label"`
			} `json:"category"`
			Label string `json:"label"`
		} `json:"TLIST(Q1)"`
		C02398V02889 struct {
			Category struct {
				Index []string `json:"index"`
				Label struct {
					Num299 string `json:"299"`
					Num321 string `json:"321"`
					Num441 string `json:"441"`
				} `json:"label"`
			} `json:"category"`
			Label string `json:"label"`
		} `json:"C02398V02889"`
		C02665V03225 struct {
			Category struct {
				Index []string `json:"index"`
				Label struct {
					NAMING_FAILED string `json:"-"`
					F             string `json:"F"`
					G             string `json:"G"`
					H             string `json:"H"`
					I             string `json:"I"`
					J             string `json:"J"`
					M             string `json:"M"`
					N             string `json:"N"`
					O             string `json:"O"`
					P             string `json:"P"`
					Q             string `json:"Q"`
					Y0900         string `json:"Y0900"`
					Y3500         string `json:"Y3500"`
					Y7500         string `json:"Y7500"`
				} `json:"label"`
			} `json:"category"`
			Label string `json:"label"`
		} `json:"C02665V03225"`
	} `json:"dimension"`
	Extension struct {
		Matrix   string   `json:"matrix"`
		Reasons  []string `json:"reasons"`
		Language struct {
			Code string `json:"code"`
			Name string `json:"name"`
		} `json:"language"`
		Elimination struct {
			C02398V02889 interface{} `json:"C02398V02889"`
			C02665V03225 string      `json:"C02665V03225"`
		} `json:"elimination"`
		Contact struct {
			Name  string `json:"name"`
			Email string `json:"email"`
			Phone string `json:"phone"`
		} `json:"contact"`
		Subject struct {
			Code  int    `json:"code"`
			Value string `json:"value"`
		} `json:"subject"`
		Product struct {
			Code  string `json:"code"`
			Value string `json:"value"`
		} `json:"product"`
		Official  bool `json:"official"`
		Copyright struct {
			Name string `json:"name"`
			Code string `json:"code"`
			Href string `json:"href"`
		} `json:"copyright"`
		Exceptional  bool `json:"exceptional"`
		Reservation  bool `json:"reservation"`
		Archive      bool `json:"archive"`
		Experimental bool `json:"experimental"`
		Analytical   bool `json:"analytical"`
	} `json:"extension"`
	Href  string   `json:"href"`
	ID    []string `json:"id"`
	Label string   `json:"label"`
	Link  struct {
		Alternate []struct {
			Type string `json:"type"`
			Href string `json:"href"`
		} `json:"alternate"`
	} `json:"link"`
	Note []string `json:"note"`
	Role struct {
		Metric []string `json:"metric"`
		Time   []string `json:"time"`
	} `json:"role"`
	Size    []int         `json:"size"`
	Updated time.Time     `json:"updated"`
	Value   []interface{} `json:"value"`
	Version string        `json:"version"`
}

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
	var d dataCSO
	err = json.Unmarshal(body, &d)
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	}
	c.IndentedJSON(http.StatusOK, d)
}
