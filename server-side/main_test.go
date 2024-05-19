package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

const hs067 = "/hs067"
const hs067Region = "/hs067Region"
const hs208 = "/hs208"
const hs208OverView = "/hs208OverView"
const hs208Recommendations = "/hs208Recommendations"

type TestSuite struct {
	router *gin.Engine
}

func (suite *TestSuite) SetupTest() {
	gin.SetMode(gin.TestMode)
	suite.router = gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With"}
	config.ExposeHeaders = []string{"Content-Length", "Content-Disposition"}
	suite.router.Use(cors.New(config))

	suite.router.GET(hs067, getHS067)
	suite.router.GET(hs067Region, getHS067Region)
	suite.router.GET(hs208, getHS208)
	suite.router.GET(hs208OverView, getHS208OverView)
	suite.router.GET(hs208Recommendations, getHS208Recommendations)
}

func TestMain(m *testing.M) {
	m.Run()
}

func TestHS067(t *testing.T) {
	suite := &TestSuite{}
	suite.SetupTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", hs067, nil)
	suite.router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "Employees-wages/salaries")
	assert.Contains(t, w.Body.String(), "Self-employed income")
	assert.Contains(t, w.Body.String(), "Retirement pensions")
	assert.NotContains(t, w.Body.String(), "C02196V02652")
}

func TestHS067Region(t *testing.T) {
	suite := &TestSuite{}
	suite.SetupTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", hs067Region, nil)
	suite.router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "Employees-wages/salaries")
	assert.Contains(t, w.Body.String(), "Self-employed income")
	assert.NotContains(t, w.Body.String(), "C02196V02652")
}

func TestHS208(t *testing.T) {
	suite := &TestSuite{}
	suite.SetupTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", hs208, nil)
	suite.router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	assert.Contains(t, w.Body.String(), "00.00.00.00 Total average weekly household expenditure")
	assert.Contains(t, w.Body.String(), "01.01.16 Takeaway food brought/delivered to home")
	assert.Contains(t, w.Body.String(), "02.03 Tobacco")

	assert.NotContains(t, w.Body.String(), "C03387V04072")
	assert.NotContains(t, w.Body.String(), "01 Total food")
	assert.NotContains(t, w.Body.String(), "02 Total drink and tobacco")
	assert.NotContains(t, w.Body.String(), "03 Total clothing and footwear")
}

func TestHS208OverView(t *testing.T) {
	suite := &TestSuite{}
	suite.SetupTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", hs208OverView, nil)
	suite.router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	assert.Contains(t, w.Body.String(), "01 Total food")
	assert.Contains(t, w.Body.String(), "02 Total drink and tobacco")
	assert.Contains(t, w.Body.String(), "03 Total clothing and footwear")
	assert.Contains(t, w.Body.String(), "00.00.00.00 Total average weekly household expenditure")

	assert.NotContains(t, w.Body.String(), "01.01.16 Takeaway food brought/delivered to home")
	assert.NotContains(t, w.Body.String(), "02.03 Tobacco")
	assert.NotContains(t, w.Body.String(), "C03387V04072")
}

func TestOnlyAllowGETHeaders(t *testing.T) {
	suite := &TestSuite{}
	suite.SetupTest()

	methods := []string{"POST", "PUT", "DELETE", "PATCH"}
	paths := []string{hs067, hs067Region, hs208, hs208OverView}

	for _, path := range paths {
		for _, method := range methods {
			w := httptest.NewRecorder()
			req, _ := http.NewRequest(method, path, nil)
			suite.router.ServeHTTP(w, req)

			assert.Equal(t, http.StatusNotFound, w.Code, "Method %s should not be allowed for %s", method, path)
		}
	}

	for _, path := range paths {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", path, nil)
		suite.router.ServeHTTP(w, req)

		assert.NotEqual(t, http.StatusNotFound, w.Code, "GET should be allowed for %s", path)
	}
}

func TestHS208Recommendations(t *testing.T) {
	suite := &TestSuite{}
	suite.SetupTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", hs208Recommendations, nil)
	suite.router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	assert.Contains(t, w.Body.String(), "05.04 Mortgage payment (primary dwelling)")
	assert.Contains(t, w.Body.String(), "05.01 Rent paid for primary dwelling")
	assert.Contains(t, w.Body.String(), "00.00.00.00 Total average weekly household expenditure")
	assert.Contains(t, w.Body.String(), "01.01.16 Takeaway food brought/delivered to home")
	assert.Contains(t, w.Body.String(), "02.03 Tobacco")
	assert.Contains(t, w.Body.String(), "01 Total food")

	assert.NotContains(t, w.Body.String(), "C03387V04072")
}
