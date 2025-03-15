import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/DetailProductPage/HeroDetail";
import ProductDetail from "../components/DetailProductPage/ProductDetail";
import useAuthStore from "../stores/useAuthStore";
import StickyCtaButton from "../components/StickyCtaButton";
import { useNavigate } from "react-router";
import { Toast } from "../utils/function/toast";

const DetailProductPage = () => {
    const navigate = useNavigate();
    const { token } = useAuthStore();

    useEffect(() => {
        if (!token) {
            Toast.fire({
                icon: "warning",
                title: "Anda harus login terlebih dahulu",
            })
            navigate("/login");
        }
    }, [token, navigate]); // Tambahkan dependensi untuk memastikan `useEffect` berjalan dengan benar

    return (
        <div className="bg-secondary ">
            <Navbar active="Shopping" />
            <div className="min-h-screen ">
                <Hero />
                <ProductDetail />
            </div>
            <Footer />
            <StickyCtaButton />
        </div>
    );
};

export default DetailProductPage;
