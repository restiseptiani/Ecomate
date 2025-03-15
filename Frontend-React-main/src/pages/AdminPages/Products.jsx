import "preline";
import Header from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";
import useSideBarStore from "../../stores/useSideBarStore";
import eye from "../../assets/svg/admin-icon/eye.svg";
import pencil from "../../assets/svg/admin-icon/pencil.svg";
import trash from "../../assets/svg/admin-icon/trash.svg";
import arrowUpDown from "../../assets/svg/admin-icon/arrows-up-down.svg";
import arrow from "../../assets/svg/admin-icon/arrow-right.svg";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router";
import ModalProduct from "../../components/Admin/ProductPage/ModalProduct";
import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { truncateText } from "../../utils/function/truncateText";
import { formatToIDR } from "../../utils/function/formatToIdr";
import { Toast } from "../../utils/function/toast";
import ModalDelete from "../../components/Admin/ProductPage/ModalDelete";
import useProductForm from "../../hooks/useProductForm";
import ModalView from "../../components/Admin/ProductPage/ModalView";
import ModalEdit from "../../components/Admin/ProductPage/ModalEdit";
import _ from "lodash";

const Products = () => {
    const { isOpen: sidebarOpen } = useSideBarStore();
    const [products, setProducts] = useState([]);
    const [metadata, setMetadata] = useState({});
    const [selectedPage, setSelectedPage] = useState(1);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editProduct, setEditProduct] = useState(null);

    const [sortOrder, setSortOrder] = useState("asc");

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products?pages=${selectedPage}`);
            setProducts(response.data.data);
            setMetadata(response.data.metadata);
        } catch (error) {
            console.log(error);
        }
    };

    const { selectedProduct, handleShowModal } = useProductForm(fetchProduct);

    const pages = Array.from({ length: metadata.TotalPage }, (_, index) => index + 1);

    const handlePageChange = (e) => {
        setSelectedPage(Number(e.target.value));
    };

    const handlePrevPage = () => {
        if (selectedPage > 1) {
            setSelectedPage(selectedPage - 1);
        }
    };

    const handleNextPage = () => {
        if (selectedPage < metadata.TotalPage) {
            setSelectedPage(selectedPage + 1);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/products/${deleteProduct}`);
            Toast.fire({
                icon: "success",
                title: "Sukses hapus data product",
            });
            fetchProduct();
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Hapus Data Gagal!",
            });
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [selectedPage]);

    const handleEdit = (product) => {
        setEditProduct(product);
        document.getElementById("my_modal_2").showModal();
    };

    const fetchSearchResults = async (term) => {
        if (!term) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await api.get(`/products?search=${term}`);
            const { status, data } = response.data;

            if (status && data) {
                setSearchResults(data);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        }
    };

    const debounceFetch = useCallback(_.debounce(fetchSearchResults, 1000), []);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        debounceFetch(term); // Memanggil fungsi yang sudah di-debounce
    };

    return (
        <div>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => sidebarOpen(!sidebarOpen)} active="Produk" />
            <div className={`transition-all duration-300 ${sidebarOpen ? "ml-[260px]" : "ml-28"}`}>
                <Header />

                <div className="bg-secondary min-h-screen">
                    {/* Table Section */}
                    <div className="max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="font-bold text-2xl text-[#4B5563] mb-4">Produk</h1>
                                <p className="text-base mb-8 text-[#4B5563]">
                                    <Link to="/admin/dashboard" className="cursor-pointer">
                                        Dashboard
                                    </Link>
                                    <img src={arrow} alt="Arrow Right" className="inline-block w-1 h-3 mx-2 " /> <strong className="cursor-pointer">Produk</strong>
                                </p>
                            </div>
                            <ModalProduct fetchProduct={() => fetchProduct()} />
                        </div>
                        {/* Card */}
                        <div className="p-3 rounded-lg bg-white border border-[#E5E7EB]">
                            <div className="pb-3">
                                <div className="relative w-[372px]">
                                    <input
                                        type="text"
                                        placeholder="Cari Produk"
                                        className="border ps-11 border-gray-300 rounded-lg h-[40px] px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <Search className="w-6 h-6 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="-m-1.5 overflow-x-auto">
                                    <div className="p-1.5 min-w-full inline-block align-middle">
                                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                            {/* Table */}
                                            <table className="w-full divide-y divide-[#E5E7EB] rounded-xl">
                                                <thead className="bg-[#ECF8ED]">
                                                    <tr>
                                                        <th scope="col" className="ps-6 py-3 text-start">
                                                            <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                                                                <input
                                                                    type="checkbox"
                                                                    className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                                    id="hs-at-with-checkboxes-main"
                                                                />
                                                                <span className="sr-only">Checkbox</span>
                                                            </label>
                                                        </th>

                                                        {["ID", "Produk", "Kategori", "Stok", "Harga", "Ditambahkan", "Aksi"].map((title, index) => (
                                                            <th scope="col" className={`${index === 0 ? "pe-6" : "px-6"} py-3 text-start`} key={index}>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-xs font-bold uppercase tracking-wide text-[#2E7D32]">{title}</span>
                                                                    {/* {index > 0 && index < 6 && (
                                                                        <button>
                                                                            <img src={arrowUpDown} alt="arrow-filter-icon" />
                                                                        </button>
                                                                    )} */}
                                                                </div>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {(searchTerm && searchResults.length > 0 ? searchResults : products).map((product) => (
                                                        <tr key={product.product_id}>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="ps-6 py-2">
                                                                    <label htmlFor="hs-at-with-checkboxes-1" className="flex">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                                            id="hs-at-with-checkboxes-1"
                                                                        />
                                                                        <span className="sr-only">Checkbox</span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="pe-6 py-2">
                                                                    <p className="text-sm font-medium text-[#1F2937] cursor-pointer" title={product.product_id}>
                                                                        {truncateText(product.product_id, 5)}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-2 flex items-center gap-x-2">
                                                                    <img className="inline-block size-[38px] rounded-full w-6 h-6" src={product.images[0].image_url} alt="Avatar" />
                                                                    <span className="text-sm font-medium text-[#1F2937] decoration-2">{product.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-2">
                                                                    <span className="text-sm font-medium text-[#1F2937]">{product.category_product}</span>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-2">
                                                                    <p className="text-sm font-medium text-[#1F2937]">{product.stock}</p>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-2">
                                                                    <p className="text-sm font-medium text-[#1F2937]">{formatToIDR(product.price)}</p>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-2">
                                                                    <p className="text-sm font-medium text-[#1F2937]">{product.created_at}</p>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="py-2">
                                                                    <div className="flex items-center gap-x-2">
                                                                        <button
                                                                            onClick={() => {
                                                                                handleShowModal(product);
                                                                            }}
                                                                        >
                                                                            <img src={eye} alt="eye-icon" />
                                                                        </button>
                                                                        <button onClick={() => handleEdit(product)}>
                                                                            <img src={pencil} alt="pencil-icon" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => {
                                                                                document.getElementById("my_modal_3").showModal();
                                                                                setDeleteProduct(product.product_id);
                                                                            }}
                                                                        >
                                                                            <img src={trash} alt="trash-icon" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {((searchTerm && searchResults.length === 0) || (!searchTerm && products.length === 0)) && (
                                                        <tr>
                                                            <td colSpan={6} className="text-center py-4">
                                                                No data available
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>

                                            {/* End Table */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ModalDelete handleDelete={() => handleDelete(selectedProduct)} title="Hapus Produk" subtitle="Apa kamu yakin ingin menghapus produk ini?" />
                            <ModalView selectedProduct={selectedProduct} />
                            <ModalEdit selectedProduct={editProduct} fetchProduct={() => fetchProduct()} />

                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center">
                                <div className="max-w-sm space-y-3">
                                    <select
                                        value={selectedPage}
                                        onChange={handlePageChange}
                                        className="py-2 px-3 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        {pages.map((page) => (
                                            <option value={page} key={page}>
                                                {page}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <div className="inline-flex gap-x-2">
                                        <button
                                            type="button"
                                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={handlePrevPage}
                                            disabled={selectedPage === 1}
                                        >
                                            <svg
                                                className="shrink-0 size-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m15 18-6-6 6-6" />
                                            </svg>
                                            Prev
                                        </button>
                                        <button
                                            type="button"
                                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={handleNextPage}
                                            disabled={selectedPage === metadata.TotalPage}
                                        >
                                            Next
                                            <svg
                                                className="shrink-0 size-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Card */}
                    </div>
                    {/* End Table Section */}
                </div>
            </div>
        </div>
    );
};

export default Products;
