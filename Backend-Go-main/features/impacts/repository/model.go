package repository

import "gorm.io/gorm"

type ImpactCategory struct {
	*gorm.Model
	ID          string `gorm:"primary_key;type:varchar(50);not null;column:id"`
	Name        string `gorm:"type:varchar(255);not null;column:name"`
	ImpactPoint int    `gorm:"type:int;not null;column:impact_point"`
	Description string `gorm:"type:TEXT;column:description"`
}

func (ImpactCategory) TableName() string {
	return "impact_categories"
}
