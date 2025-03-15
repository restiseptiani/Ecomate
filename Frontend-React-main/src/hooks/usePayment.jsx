import { useNavigate } from "react-router";
import api from "../services/api";
import { Toast } from "../utils/function/toast";
import { useState } from "react";

const usePayment = (snapToken, checkedProducts) => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        if (window.snap) {
            setIsProcessing(true);
            window.snap.pay(snapToken, {
                onSuccess: async (result) => {
                    try {
                        const productIds = checkedProducts.map((product) => product.product.product_id);

                        // Hapus produk dari keranjang
                        await Promise.all(
                            productIds.map((id) =>
                                api.delete(`/cart/${id}`).catch((err) => {
                                    console.error(`Gagal menghapus produk dengan ID: ${id}`, err);
                                }),
                            ),
                        );

                        Toast.fire({
                            icon: "success",
                            title: "Pembayaran Berhasil",
                        });

                        navigate("/profile/pesanan");
                        window.scrollTo(0, 0);
                    } catch (error) {
                        console.log(error);
                        Toast.fire({
                            icon: "error",
                            title: "Gagal menghapus produk",
                        });
                    } finally {
                        setIsProcessing(false);
                    }
                },
                onPending: (result) => {
                    console.log("Pending:", result);
                    Toast.fire({
                        icon: "warning",
                        title: "Pembayaran Pending",
                    });
                },
                onError: (result) => {
                    console.error("Error:", result);
                    Toast.fire({
                        icon: "error",
                        title: "Pembayaran Gagal",
                    });
                },
                onClose: () => {
                    Toast.fire({
                        icon: "info",
                        title: "Kamu menutup pop-up pembayaran",
                    });
                },
            });
        } else {
            Toast.fire({
                icon: "error",
                title: "Snap tidak tersedia!",
            });
        }
    };

    return {
        handlePayment,
        isProcessing,
    };
};

export default usePayment;
