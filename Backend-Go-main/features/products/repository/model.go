package repository

import (
	impactcategory "greenenvironment/features/impacts/repository"
	users "greenenvironment/features/users/repository"

	"gorm.io/gorm"
)

type Product struct {
	*gorm.Model
	ID               string                  `gorm:"primary_key;type:varchar(50);not null;column:id"`
	Name             string                  `gorm:"type:varchar(255);not null;column:name;index:,class:FULLTEXT,option:WITH PARSER ngram VISIBLE"`
	Description      string                  `gorm:"type:varchar(255);column:description"`
	Price            float64                 `gorm:"type:float;not null;column:price"`
	Coin             int                     `gorm:"type:int;not null;column:coin"`
	Stock            int                     `gorm:"type:int;not null;column:stock"`
	Category         string                  `gorm:"type:varchar(255);not null;column:category"`
	Images           []ProductImage          `gorm:"foreignKey:ProductID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	ImpactCategories []ProductImpactCategory `gorm:"foreignKey:ProductID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type ProductImage struct {
	*gorm.Model
	ID        string  `gorm:"primary_key;type:varchar(50);not null;column:id"`
	ProductID string  `gorm:"type:varchar(50);not null;column:product_id"`
	AlbumsURL string  `gorm:"type:varchar(255);not null;column:albums_url"`
	Product   Product `gorm:"foreignKey:ProductID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type ProductImpactCategory struct {
	*gorm.Model
	ID               string                        `gorm:"primary_key;type:varchar(50);not null;column:id"`
	ProductID        string                        `gorm:"type:varchar(50);not null;column:product_id"`
	ImpactCategoryID string                        `gorm:"type:varchar(50);not null;column:impact_category_id"`
	Product          Product                       `gorm:"foreignKey:ProductID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	ImpactCategory   impactcategory.ImpactCategory `gorm:"foreignKey:ImpactCategoryID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type ProductLog struct {
	*gorm.Model
	ID        string     `gorm:"primary_key;type:varchar(50);not null;column:id"`
	UserID    string     `gorm:"type:varchar(50);not null;column:user_id"`
	ProductID string     `gorm:"type:varchar(50);not null;column:product_id"`
	User      users.User `gorm:"foreignKey:UserID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Product   Product    `gorm:"foreignKey:ProductID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
