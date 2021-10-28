package main

import (
	"github.com/schwd/sa-64-example/backend/controller/refer"

	"github.com/schwd/sa-64-example/backend/entity"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	// Refer Routes
	r.GET("/refers", controller.ListRefer)
	r.GET("/refer/:id", controller.GetRefer)
	r.POST("/refers", controller.CreateRefer)
	r.PATCH("/refers", controller.UpdateRefer)
	r.DELETE("/refers/:id", controller.DeleteRefer)

	// Doctor Routes
	r.GET("/doctors", controller.ListDoctors)
	r.GET("/doctor/:id", controller.GetDoctor)
	r.POST("/doctors", controller.CreateDoctor)
	r.PATCH("/doctors", controller.UpdateDoctor)
	r.DELETE("/doctors/:id", controller.DeleteDoctor)

	// Disease Routes
	r.GET("/hospitals", controller.ListHospitals)
	r.GET("/hospitals/:id", controller.GetHospital)
	r.POST("/hospitals", controller.CreateHospital)
	r.PATCH("/hospitals", controller.UpdateHospital)
	r.DELETE("/hospitals/:id", controller.DeleteHospital)

	// MedicalRecord Routes
	r.GET("/medical_records", controller.ListMedicalRecords)
	r.GET("/medical_record/:id", controller.GetMedicalRecord)
	r.POST("/medical_records", controller.CreateMedicalRecord)
	r.PATCH("/medical_records", controller.UpdateMedicalRecord)
	r.DELETE("/medical_records/:id", controller.DeleteMedicalRecord)

	r.GET("/diseases", controller.ListDiseases)
	r.GET("/disease/:id", controller.GetDisease)
	r.POST("/diseases", controller.CreateDisease)
	r.PATCH("/diseases", controller.UpdateDisease)
	r.DELETE("/diseases/:id", controller.DeleteDisease)

	r.Run()

	
}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {
  
	  c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
  
	  c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
  
	  c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
  
	  c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
  
  
	  if c.Request.Method == "OPTIONS" {
  
		c.AbortWithStatus(204)
  
		return
  
	  }
  
  
	  c.Next()
  
	}
  
  }
