import { useEffect, useState } from "react";
import api from "../services/api";
import { Toast } from "../utils/function/toast";
import { useNavigate } from "react-router";
import useCartStore from "../stores/useCartStore";
import useUserStore, { loadUserData } from "../stores/useUserStore";

const useCart = () => {
    const { products, setProducts, clearProducts } = useCartStore();

    // State untuk total harga keranjang
    const [totalPrice, setTotalPrice] = useState(0);

    // State untuk produk yang tercentang
    const [checkedProducts, setCheckedProducts] = useState([]);

    // State untuk jumlah kuantitas setiap produk
    const [quantities, setQuantities] = useState({});

    // State untuk mengelola status 'select all' (pilih semua)
    const [selectAll, setSelectAll] = useState(false);

    // State untuk menyimpan daftar produk yang ada di keranjang
    // const [products, setProducts] = useState([]);

    // State untuk discount potongan koin bang
    const [useCoin, setUseCoin] = useState(false);
    const [estimatedPrice, setEstimatedPrice] = useState(totalPrice);
    const user = useUserStore((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await api.get("/cart");
                const cartData = response.data.data.items;
                setProducts(cartData);

                const initialQuantities = cartData.reduce((acc, product) => {
                    acc[product.product.product_id] = product.quantity || 1;
                    return acc;
                }, {});
                setQuantities(initialQuantities);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCart();
    }, [setProducts]);

    // Fungsi untuk mengubah status checkbox (tercentang atau tidak)
    const handleCheckboxChange = (isChecked, product) => {
        const quantity = quantities[product.product.product_id] || 1;
        if (isChecked) {
            // Menambahkan produk ke daftar produk yang tercentang
            const newCheckedProducts = [...checkedProducts, product];
            setCheckedProducts(newCheckedProducts);
            setTotalPrice((prev) => prev + quantity * parseInt(product.product.price)); // Update total harga

            // Menandai 'select all' jika semua produk tercentang
            if (newCheckedProducts.length === products.length) {
                setSelectAll(true);
            }
        } else {
            // Menghapus produk dari daftar yang tercentang
            const newCheckedProducts = checkedProducts.filter((p) => p.product.product_id !== product.product.product_id);
            setCheckedProducts(newCheckedProducts);
            setTotalPrice((prev) => prev - quantity * parseInt(product.product.price)); // Update total harga

            setSelectAll(false); // Reset 'select all' jika ada produk yang tidak tercentang
        }
    };

    // Fungsi untuk mengubah kuantitas produk
    const handleQuantitiesChange = async (product, change) => {
        setQuantities((prev) => {
            const newQuantity = (prev[product.product.product_id] || 1) + change;

            if (newQuantity < 1) return prev; // Tidak mengizinkan kuantitas kurang dari 1

            // Update total harga jika produk tercentang
            if (checkedProducts.some((p) => p.product.product_id === product.product.product_id)) {
                setTotalPrice((prevTotal) => prevTotal + change * parseInt(product.product.price));
            }
            return { ...prev, [product.product.product_id]: newQuantity };
        });

        if (change < 0) {
            // Mengecek jika perubahan menyebabkan quantity menjadi 0 atau kurang
            if ((quantities[product.product.product_id] || 1) + change < 1) {
                return; // Jangan kirim request jika quantity < 1
            }
        }

        try {
            const bodyRequest = {
                product_id: product.product.product_id,
                quantity: change,
                type: change > 0 ? "increment" : "decrement",
            };

            const response = await api.put("/cart", bodyRequest);
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    // Fungsi untuk memilih atau menghapus semua produk
    const handleSelectAll = (isChecked) => {
        setSelectAll(isChecked);
        if (isChecked) {
            // Jika 'select all' aktif, pilih semua produk dan hitung total harga
            setCheckedProducts(products);
            const total = products.reduce((sum, product) => sum + (quantities[product.product.product_id] || 1) * parseInt(product.product.price), 0);
            setTotalPrice(total);
        } else {
            // Jika 'select all' tidak aktif, kosongkan daftar yang tercentang
            setCheckedProducts([]);
            setTotalPrice(0);
        }
    };

    // Fungsi untuk menghapus produk dari keranjang
    const handleDeleteProduct = async (productId) => {
        try {
            const response = await api.delete(`/cart/${productId}`);
            console.log(response.data.message);

            // Menghapus produk dari daftar produk dan yang tercentang
            const updatedProducts = products.filter((product) => product.product.product_id !== productId);
            setProducts(updatedProducts);
            setCheckedProducts((prev) => prev.filter((product) => product.product.product_id !== productId));

            // Menghapus kuantitas produk yang dihapus
            setQuantities((prev) => {
                const updatedQuantities = { ...prev };
                delete updatedQuantities[productId]; // Menghapus kuantitas produk
                return updatedQuantities;
            });

            // Mengupdate total harga setelah penghapusan produk
            const updatedTotalPrice = updatedProducts.reduce((sum, product) => {
                if (checkedProducts.some((p) => p.product.product_id === product.product.product_id)) {
                    return sum + (quantities[product.product.product_id] || 1) * parseInt(product.product.price);
                }
                return sum;
            }, 0);
            setTotalPrice(updatedTotalPrice);

            // Menonaktifkan 'select all' jika tidak ada produk lagi
            if (updatedProducts.length === 0) {
                setSelectAll(false);
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: error,
            });
        }
    };

    // Logic Pototngan harga by coin
    useEffect(() => {
        loadUserData("/users/profile");
        // Hitung estimasi harga setelah diskon koin
        if (useCoin) {
            const maxCoinDiscount = totalPrice * 0.8; // Maksimal 80% dari total harga
            const coinDiscount = Math.min(user.coin, maxCoinDiscount); // Diskon berdasarkan koin yang dimiliki
            setEstimatedPrice(totalPrice - coinDiscount);
        } else {
            setEstimatedPrice(totalPrice); // Harga normal jika toggle mati
        }
    }, [useCoin, totalPrice]);

    // Tombol ketika user klik checkout
    const handleCheckout = async () => {
        const data = {
            cart_ids: checkedProducts.map((check) => check.id),
            using_coin: useCoin,
        };

        try {
            const response = await api.post("/transactions", data);
            if (response.status === 200) {
                navigate(`/payment/${response.data.data.id}`, { state: { cart_ids: data.cart_ids, transaction: response.data.data } });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        totalPrice, // Total harga keranjang
        checkedProducts, // Daftar produk yang tercentang
        quantities, // Kuantitas produk
        selectAll, // Status 'select all'
        products, // Daftar produk yang ada
        handleCheckboxChange, // Fungsi untuk mengubah status checkbox
        handleQuantitiesChange, // Fungsi untuk mengubah kuantitas
        handleSelectAll, // Fungsi untuk memilih semua produk
        handleDeleteProduct, // Fungsi untuk menghapus produk
        handleCheckout,
        useCoin, // Return useCoin dan estimatedPrice dari hook
        setUseCoin, // Fungsi untuk toggle useCoin
        user,
        estimatedPrice, //Estimasi Coin jika diskon atau tidak
    };
};

export default useCart;
