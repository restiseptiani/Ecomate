package seeds

import (
	"greenenvironment/features/admin"
	"greenenvironment/helper"

	"gorm.io/gorm"
)

func CreateAdminLogin(db *gorm.DB, admin admin.Admin) error {
	hashedPassword, err := helper.HashPassword(admin.Password)
	if err != nil {
		return err
	}
	admin.Password = hashedPassword
	return db.Where("id = ?", admin.ID).FirstOrCreate(&admin).Error
}
