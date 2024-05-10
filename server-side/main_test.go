// package main

// import (
// 	"net/http"
// 	"net/http/httptest"
// 	"testing"

// 	"github.com/gin-gonic/gin"
// 	"github.com/stretchr/testify/assert"
// )

// func TestGetHS067(t *testing.T) {
// 	gin.SetMode(gin.TestMode)

// 	r := gin.Default()
// 	r.GET("/hs067", getHS067)

// 	w := httptest.NewRecorder()
// 	req, _ := http.NewRequest("GET", "/hs067", nil)
// 	r.ServeHTTP(w, req)

// 	assert.Equal(t, http.StatusOK, w.Code)
// 	assert.Contains(t, w.Body.String(), "Employees-wages/salaries")
// 	assert.Contains(t, w.Body.String(), "Self-employed income")
// 	assert.Contains(t, w.Body.String(), "Retirement pensions")
// 	assert.NotContains(t, w.Body.String(), "C02196V02652")
// }

// func TestGetHS067Region(t *testing.T) {
// 	gin.SetMode(gin.TestMode)

// 	r := gin.Default()
// 	r.GET("/hs067Region", getHS067Region)

// 	w := httptest.NewRecorder()
// 	req, _ := http.NewRequest("GET", "/hs067", nil)
// 	r.ServeHTTP(w, req)

// 	assert.Equal(t, http.StatusOK, w.Code)
// 	assert.Contains(t, w.Body.String(), "Employees-wages/salaries")
// 	assert.Contains(t, w.Body.String(), "Self-employed income")
// 	assert.NotContains(t, w.Body.String(), "C02196V02652")
// }

package main

import (
	"fmt"
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
}

func (suite *TestSuite) TearDownTest() {
	fmt.Print("teardown")
}

func TestMain(m *testing.M) {
	// Set up here if needed
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

	suite.TearDownTest()
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

	suite.TearDownTest()
}
