package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/saurabh/gin-golang-react/api/controller"
)

func JWTAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		controller.ValidateToken(c)
		c.Next()
	}
}
