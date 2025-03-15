package repository

import (
	"greenenvironment/constant"
	"greenenvironment/features/products"

	"gorm.io/gorm"
)

type ProductRepository struct {
	DB *gorm.DB
}

func NewProductRepository(db *gorm.DB) products.ProductRepositoryInterface {
	return &ProductRepository{DB: db}
}

func (pr *ProductRepository) Create(product products.Product) error {
	newProduct := Product{
		ID:          product.ID,
		Name:        product.Name,
		Coin:        product.Coin,
		Description: product.Description,
		Price:       product.Price,
		Stock:       product.Stock,
		Category:    product.Category,
	}

	for _, image := range product.Images {
		newProduct.Images = append(newProduct.Images, ProductImage{
			ID:        image.ID,
			ProductID: newProduct.ID,
			AlbumsURL: image.AlbumsURL,
		})
	}

	for _, impactCategory := range product.ImpactCategories {
		newProduct.ImpactCategories = append(newProduct.ImpactCategories, ProductImpactCategory{
			ID:               impactCategory.ID,
			ProductID:        newProduct.ID,
			ImpactCategoryID: impactCategory.ImpactCategoryID,
		})
	}

	err := pr.DB.Create(&newProduct).Error
	if err != nil {
		return constant.ErrCreateProduct
	}
	return nil
}

func (pr *ProductRepository) GetAllByPage(page int, search string, sort string) ([]products.Product, int, error) {
	var productDataData []products.Product

	var totalProductData int64

	query := pr.DB.Model(&Product{}).Where("deleted_at IS NULL")
	if search != "" {
		query = query.Where("name LIKE ?", "%"+search+"%")
	}

	err := query.Count(&totalProductData).Error
	if err != nil {
		return nil, 0, constant.ErrProductEmpty
	}

	productDataPerPage := 20
	totalPages := int((totalProductData + int64(productDataPerPage) - 1) / int64(productDataPerPage))

	switch sort {
	case "name_asc":
		query = query.Order("name ASC")
	case "name_desc":
		query = query.Order("name DESC")
	case "time_asc":
		query = query.Order("created_at ASC")
	case "time_desc":
		query = query.Order("created_at DESC")
	default:
		query = query.Order("created_at DESC")
	}

	response := query.Preload("Images").Preload("ImpactCategories.ImpactCategory").
		Offset((page - 1) * productDataPerPage).Limit(productDataPerPage).
		Find(&productDataData)

	if response.Error != nil {
		return nil, 0, constant.ErrGetProduct
	}

	if response.RowsAffected == 0 {
		return nil, 0, constant.ErrProductEmpty
	}

	return productDataData, totalPages, nil
}

func (pr *ProductRepository) GetById(id string) (products.Product, error) {
	var product products.Product

	err := pr.DB.Model(&Product{}).Preload("Images").Preload("ImpactCategories.ImpactCategory").Where("id = ?", id).Take(&product).Error

	if err != nil {
		return products.Product{}, constant.ErrProductEmpty
	}

	return product, nil

}

func (pr *ProductRepository) Update(productData products.Product) error {
	tx := pr.DB.Begin()
	err := tx.Where("product_id = ?", productData.ID).Delete(products.ProductImage{})
	if err.Error != nil {
		tx.Rollback()
		return err.Error
	}
	err = tx.Where("product_id = ?", productData.ID).Delete(products.ProductImpactCategory{})
	if err.Error != nil {
		tx.Rollback()
		return err.Error
	}

	err = tx.Model(&Product{}).Where("id = ?", productData.ID).Updates(&productData)
	if err.Error != nil {
		tx.Rollback()
		return constant.ErrUpdateProduct
	}

	if len(productData.Images) > 0 {
		if err := tx.Create(&productData.Images).Error; err != nil {
			tx.Rollback()
			return err
		}
	}
	if len(productData.ImpactCategories) > 0 {
		if err := tx.Create(&productData.ImpactCategories).Error; err != nil {
			tx.Rollback()
			return err
		}
	}
	return tx.Commit().Error
}

func (pr *ProductRepository) Delete(id string) error {
	tx := pr.DB.Begin()

	if err := tx.Where("product_id = ?", id).Delete(&ProductImage{}).Error; err != nil {
		tx.Rollback()
		return constant.ErrDeleteProduct
	}

	if err := tx.Where("product_id = ?", id).Delete(&ProductImpactCategory{}).Error; err != nil {
		tx.Rollback()
		return constant.ErrDeleteProduct
	}

	if err := tx.Where("id = ?", id).Delete(&Product{}).Error; err != nil {
		tx.Rollback()
		return constant.ErrDeleteProduct
	}

	return tx.Commit().Error
}

func (pr *ProductRepository) GetByCategory(categoryName string, page int, search string, sort string) ([]products.Product, int, error) {
	var products []products.Product

	var totalProductData int64

	query := pr.DB.Model(&Product{}).Where("category = ? AND deleted_at IS NULL", categoryName)

	if search != "" {
		query = query.Where("name LIKE ?", "%"+search+"%")
	}

	err := query.Count(&totalProductData).Error
	if err != nil {
		return nil, 0, constant.ErrProductEmpty
	}

	productDataPerPage := 20
	totalPages := int((totalProductData + int64(productDataPerPage) - 1) / int64(productDataPerPage))

	switch sort {
	case "name_asc":
		query = query.Order("name ASC")
	case "name_desc":
		query = query.Order("name DESC")
	case "time_asc":
		query = query.Order("created_at ASC")
	case "time_desc":
		query = query.Order("created_at DESC")
	default:
		query = query.Order("created_at DESC") // Default sort by newest
	}

	tx := query.Preload("Images").
		Preload("ImpactCategories.ImpactCategory").
		Offset((page - 1) * productDataPerPage).
		Limit(productDataPerPage).
		Find(&products)

	if tx.Error != nil {
		return nil, 0, constant.ErrGetProduct
	}

	return products, totalPages, nil
}

func (gr *ProductRepository) GetTotalProduct() (int, error) {
	var totalProduct int64
	err := gr.DB.Table("products").Where("deleted_at IS NULL").Count(&totalProduct).Error
	if err != nil {
		return 0, err
	}
	return int(totalProduct), nil

}
