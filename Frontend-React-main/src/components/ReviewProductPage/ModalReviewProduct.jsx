import { useEffect, useState } from "react";
import productUser from "../../assets/jpg/user.jpg";
import { truncateText } from "../../utils/function/truncateText";
import api from "../../services/api";
import { Toast } from "../../utils/function/toast";

const ModalReviewProduct = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rate, setRate] = useState(0);
    const [review, setReview] = useState("");
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProduct = async () => {
        try {
            const response = await api.get("/products");
            setProductData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleRateChange = (newRate) => {
        setRate(newRate);
    };

    const handleSubmit = async () => {
        const currentProduct = products[currentIndex];

        // Cari product_id berdasarkan product_name
        const matchedProduct = productData.find((product) => product.name === currentProduct?.product_name);

        if (!matchedProduct) {
            console.error("Product not found:", currentProduct.product_name);
            return;
        }

        const productId = matchedProduct.product_id;

        const payload = {
            product_id: productId,
            rate,
            review,
        };

        try {
            setLoading(true);
            const response = await api.post("/reviews", payload);

            if (response.status === 200 || response.status === 201) {
                Toast.fire({
                    icon: "success",
                    title: "Sukses Menilai Produk",
                });
            } else {
                console.warn(response);
            }
        } catch (error) {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: error,
            });
        } finally {
            setLoading(false);
        }

        setRate(0);
        setReview("");

        if (currentIndex < products.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            document.getElementById("my_modal_review").close();
        }
    };

    const currentProduct = products?.[currentIndex];

    return (
        <dialog id="my_modal_review" className="modal">
            <div className="modal-box w-11/12 max-w-2xl">
                <div className="border-b border-[#BEBEBE]">
                    <h1 className="text-2xl font-normal text-black px-16 pt-6 pb-9 ">Nilai Produk</h1>
                </div>
                <div className="px-16 pt-6 pb-9 flex flex-row items-center gap-6">
                    <div className="w-[104px] h-[97px]">
                        <img src={currentProduct?.product_image ? currentProduct?.product_image : productUser} alt="product_image" className="w-full h-full object-cover object-top rounded-xl" />
                    </div>
                    <div>
                        <h1 className="text-xl text-black font-semibold pb-3">{currentProduct?.product_name}</h1>
                        <h2 className="text-lg font-normal text-black">X {currentProduct?.product_quantity}</h2>
                    </div>
                </div>
                <div className="flex flex-row gap-[100px] border-b border-[#BEBEBE]  px-16 pb-9">
                    <h1 className="text-lg font-normal text-black">Kualitas Produk</h1>
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <input key={star} type="radio" name="rating" className={`mask mask-star-2 bg-[#2E7D32] ${rate >= star ? "checked" : ""}`} onClick={() => handleRateChange(star)} />
                        ))}
                    </div>
                </div>
                <div className="px-16 py-4 border-b border-[#BEBEBE] w-full">
                    <textarea className="textarea textarea-bordered w-full h-36" placeholder="Nilai Produk" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                </div>
                <div className="flex flex-row gap-8 pt-9 justify-end">
                    <button className="btn btn-outline !text-[#202020] !border-[#D8D8DA] hover:!text-white hover:!bg-[#2E7D32]" onClick={() => document.getElementById("my_modal_review").close()}>
                        Nanti Saja
                    </button>
                    <button className="btn btn-success !bg-[#2E7D32] !text-white" onClick={handleSubmit} disabled={loading}>
                        {currentIndex < products?.length - 1 ? "Lanjut" : "Selesai"}
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalReviewProduct;
