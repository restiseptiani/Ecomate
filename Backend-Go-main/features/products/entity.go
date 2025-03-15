package products

import (
	impactcategory "greenenvironment/features/impacts"
	"time"

	"github.com/labstack/echo/v4"
)

type Product struct {
	ID               string
	Name             string
	Description      string
	Price            float64
	Coin             int
	Stock            int
	Category         string
	CreatedAt        time.Time
	UpdatedAt        time.Time
	Images           []ProductImage
	ImpactCategories []ProductImpactCategory
}
type ProductImage struct {
	ID        string
	ProductID string
	AlbumsURL string
}
type ProductImpactCategory struct {
	ID               string
	ProductID        string
	ImpactCategoryID string
	ImpactCategory   impactcategory.ImpactCategory
}

type ImpactCategory struct {
	ID          string
	Name        string
	ImpactPoint int
	Description string
}

type ProductRepositoryInterface interface {
	Create(product Product) error
	GetAllByPage(page int, search string, sort string) ([]Product, int, error)
	GetById(id string) (Product, error)
	GetByCategory(categoryName string, page int, search string, sort string) ([]Product, int, error)
	Update(product Product) error
	Delete(productId string) error
	GetTotalProduct() (int, error)
}

type ProductControllerInterface interface {
	Create(c echo.Context) error
	GetAll(c echo.Context) error
	GetById(c echo.Context) error
	GetByCategory(c echo.Context) error
	Update(c echo.Context) error
	Delete(c echo.Context) error
}

type ProductServiceInterface interface {
	Create(product Product) error
	GetAllByPage(page int, search string, sort string) ([]Product, int, int, error)
	GetById(id string) (Product, error)
	GetByCategory(category string, page int, search string, sort string) ([]Product, int, int, error)
	Update(product Product) error
	Delete(productId string) error
}
