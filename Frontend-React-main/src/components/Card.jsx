import React from "react";
import { Link, useNavigate } from "react-router";
import shoppingCart from "../assets/svg/shopping-cart.svg";
import ButtonPayment from "./PaymentPage/ButtonPayment";
import api from "../services/api";
import { Toast } from "../utils/function/toast";
const Card = ({ image, name, description, price, link, product }) => {
    const handleClick = async (product) => {
        try {
            await api.post("/cart", { product_id: product.product_id, quantity: 1 });
            Toast.fire({
                icon: "success",
                title: `${product.name} berhasil ditambahkan ke Keranjang`,
            });
        } catch (error) {
            console.log(error);

            Toast.fire({
                icon: "error",
                title: `${product.name} gagal ditambahkan ke Keranjang`,
            });
        }
    };

    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center bg-white shadow-lg rounded-xl w-full">
            {/* Tinggi kartu */}
            <div className="cursor-pointer" onClick={() => navigate(`/detail-produk/${product.product_id}`)}>
                <img src={image} alt={name} className="w-full h-[150px] md:h-[200px] object-cover rounded-t-xl" />
            </div>
            <div className="mt-4 md:h-[243px] h-[180px]  p-5 pt-0">
                <div className="flex justify-between items-center  cursor-pointer" onClick={() => navigate(`/detail-produk/${product.product_id}`)}>
                    <h1 className="mt-1 text-sm font-bold text-[#1F2937] md:text-[18px] cursor-pointer">Rp. {price}</h1>
                    <span className="text-base text-[#1F2937]">
                        <span className="text-xl text-yellow-500 mr-2">★</span>4/5
                    </span>
                </div>
                <p className="text-sm text-gray-600 font-semibold py-3 md:min-h-[40px] min-h-[64px]" onClick={() => navigate(`/detail-produk/${product.product_id}`)}>
                    {name}
                </p>
                <p className="mt-1 hidden md:flex text-sm md:text-base min-h-[72px] text-gray-500">{description}</p>
                <div className="flex-row flex ">
                    {/* <ButtonPayment
                        className="text-white  bg-primary text-xs md:text-[15px] mt-5 w-[150px] md:w-[131px] h-[46px] rounded-xl font-bold hover:bg-[#1B4B1E]"
                        title="Beli Sekarang"
                        onClick={() => handleClick(product)}
                    /> */}
                    <a
                        href={link}
                        className="text-white bg-primary text-xs md:text-[15px] mt-5 w-[150px] md:w-[131px] h-[46px] rounded-xl font-bold hover:bg-[#1B4B1E] flex items-center justify-center "
                    >
                        <p className="p-2 md:p-0 text-center">Beli Sekarang</p>
                    </a>
                    <button
                        onClick={() => handleClick(product)}
                        className="text-primary text-sm md:text-[15px] mt-5 w-[110px] md:w-[131px] h-[46px] rounded-xl font-bold flex items-center justify-center hover:text-[#1B4B1E]"
                    >
                        <img src={shoppingCart} alt="beli" className="text-primary mr-2 h-7 hover:text-[#1B4B1E]" />
                        <p className="hidden md:flex">Keranjang</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
