import React, { useState, useEffect, useCallback } from "react";
import Card from "../Card";
import Pagination from "../Pagination";
import api from "../../services/api";
import { truncateContent } from "../../hooks/useTruncates";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";

const Catalog = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    const categories = ["Baju", "Sepatu", "Sandal", "Perabot", "Tas", "Aksesoris"];

    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true);

            // Construct query parameters
            const params = new URLSearchParams();

            // Add page parameter
            params.append("pages", currentPage);

            // Add search parameter if exists
            if (searchQuery.trim()) {
                params.append("search", searchQuery.trim());
            }

            // Add sort parameter if exists
            if (sortOrder) {
                let sortParam = "";
                switch (sortOrder) {
                    case "a-to-z":
                        sortParam = "name_asc";
                        break;
                    case "z-to-a":
                        sortParam = "name_desc";
                        break;
                    case "newest":
                        sortParam = "time_desc";
                        break;
                    case "oldest":
                        sortParam = "time_asc";
                        break;
                    default:
                        break;
                }

                if (sortParam) {
                    params.append("sort", sortParam);
                }
            }

            // Determine the appropriate endpoint based on category selection
            let endpoint = selectedCategory ? `/products/categories/${selectedCategory}?${params.toString()}` : `/products?${params.toString()}`;

            // Fetch products with constructed parameters
            const response = await api.get(endpoint);

            // Update state with response data
            console.log(response);
            setProducts(response.data.data || []);
            setTotalPages(response.data.metadata.TotalPage || 0);
            setTotalProducts(response.data.metadata.TotalProducts || 0);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setIsLoading(false);
            setProducts([]);
            setTotalPages(0);
            setTotalProducts(0);
        }
    }, [currentPage, searchQuery, selectedCategory, sortOrder]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to first page on new search
        fetchProducts();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSortOrder("");
        setCurrentPage(1);
    };

    return (
        <div className="md:w-[1280px] w-full mx-auto">
            <div className="bg-[#FAFAFA] border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 md:w-full w-fit ml-3 md:mx-auto mt-10">
                <form onSubmit={handleSearch} className="flex md:flex-row flex-col items-end">
                    <div className="md:w-[353px] w-[330px] mb-4 md:mb-0">
                        <label htmlFor="search" className="block text-base font-bold mb-2">
                            Cari Produk
                        </label>
                        <input
                            id="search"
                            type="text"
                            placeholder="Cari Produk"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                        />
                    </div>

                    <div className="md:w-[353px] w-[330px] md:ml-10 mb-4 md:mb-0">
                        <label htmlFor="category-select" className="block text-base font-bold mb-2">
                            Kategori
                        </label>
                        <select
                            id="category-select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="py-3 px-4 block w-full rounded-lg text-sm border outline-none bg-white placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-blue-500"
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:w-[353px] w-[330px] mx-0 md:mx-5 mb-4 md:mb-0">
                        <label htmlFor="sort-select" className="block text-base font-bold mb-2">
                            Urutkan
                        </label>
                        <select
                            id="sort-select"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="py-3 px-4 block w-full rounded-lg text-sm border outline-none bg-white placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-blue-500"
                        >
                            <option value="">Pilih Urutan</option>
                            <option value="a-to-z">Nama: A ke Z</option>
                            <option value="z-to-a">Nama: Z ke A</option>
                            <option value="newest">Terbaru</option>
                            <option value="oldest">Terlama</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button type="submit" className="md:w-[45px] md:h-[45px] w-[165px] h-[52px] bg-primary rounded-lg flex items-center justify-center">
                            <Search className="w-5 h-5 text-white" />
                        </button>
                        {(searchQuery || selectedCategory || sortOrder) && (
                            <button type="button" onClick={handleResetFilters} className="md:w-[45px] md:h-[45px] w-[165px] h-[52px] bg-red-500 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <p className="text-xl py-10">
                Menampilkan {products.length} dari {totalProducts} hasil
            </p>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
            ) : products.length > 0 ? (
                <div className="flex flex-wrap">
                    {products.map((product) => (
                        <div key={product.product_id} className="w-1/2 sm:w-1/3 px-2 sm:px-5 mb-5">
                            <Card
                                image={product.images[0]?.image_url || "/default-product.png"}
                                name={product.name}
                                description={truncateContent(product.description, 100)}
                                price={product.price.toLocaleString("id-ID")}
                                link={`/detail-produk/${product.product_id}`}
                                product={product}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-10 min-h-[300px]">Tidak ada produk yang ditemukan.</div>
            )}

            {!isLoading && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
        </div>
    );
};

export default Catalog;
