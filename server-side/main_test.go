package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestGetHS067(t *testing.T) {
	gin.SetMode(gin.TestMode)

	r := gin.Default()
	r.GET("/hs067", getHS067)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/hs067", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "Employees-wages/salaries")
}
