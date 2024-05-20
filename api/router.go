package api

import (
	"github.com/gin-gonic/gin"
	"github.com/saurabh/gin-golang-react/api/controller"
)

type Router interface {
	SetupRouter(router *gin.Engine)
}

type router struct{}

func NewRouter() Router {
	return &router{}
}

// SetupRouter configuration router information
func (r *router) SetupRouter(router *gin.Engine) {
	var (
		healthController controller.HealthController = controller.NewHealthController()
	)

	// Setup route group for the API
	api := router.Group("/api")
	{
		v1 := api.Group("/v1")
		// healthcheck
		v1.GET("/healthcheck", healthController.Check)

		v1.POST("/login", controller.Login)
		v1.POST("/register", controller.Register)

	}
}
