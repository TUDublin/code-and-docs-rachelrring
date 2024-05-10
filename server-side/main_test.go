package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// Setup and Teardown
type TestSuite struct {
	router *gin.Engine
}

func (suite *TestSuite) SetupTest() {
	gin.SetMode(gin.TestMode)
	suite.router = gin.Default()
	suite.router.GET("/hs067", getHS067)
	suite.router.GET("/hs067Region", getHS067Region)
	suite.router.GET("/hs208", getHS208)
	suite.router.GET("/hs208OverView", getHS208OverView)
}

func TestMain(m *testing.M) {
	m.Run()
}

func TestHS067(t *testing.T) {
	suite := &TestSuite{}
	suite.SetupTest()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/hs067", nil)
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
	req, _ := http.NewRequest("GET", "/hs067Region", nil)
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
	req, _ := http.NewRequest("GET", "/hs208", nil)
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
	req, _ := http.NewRequest("GET", "/hs208OverView", nil)
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