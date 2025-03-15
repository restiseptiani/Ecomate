import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";
import { Toast } from "../utils/function/toast";

const useProductForm = (fetchProduct) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm();

    const [impacts, setImpacts] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchImpacts = async () => {
            try {
                const response = await api.get("/impacts");
                setImpacts(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchImpacts();
    }, []);

    const handleModal = () => {
        document.getElementById("my_modal_5").showModal();
        setSelectedProduct(null);
        reset();
    };

    const closeModal = () => {
        document.getElementById("my_modal_5").close();
        setSelectedProduct(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const onSubmit = async (data) => {
        if (!image) {
            Toast.fire({
                icon: "error",
                title: "Gambar Belum di Upload!",
            });
            return;
        }

        // Buat array category_impact
        const selectedImpacts = [];
        if (data.category_impact) {
            selectedImpacts.push(data.category_impact);
        }
        if (data.category_impact_2) {
            selectedImpacts.push(data.category_impact_2);
        }

        // Persiapkan data yang akan dikirim ke API
        const processedData = {
            ...data,
            category_impact: selectedImpacts, // Pastikan category_impact dalam bentuk array
        };

        // Hapus field yang tidak diperlukan
        delete processedData.category_impact_2;

        // Konversi field numerik
        ["price", "coin", "stock"].forEach((key) => {
            processedData[key] = parseInt(processedData[key], 10);
        });

        try {
            setLoading(true);
            let imageUrl = processedData.images; // URL gambar dari form

            if (image) {
                const formData = new FormData();
                formData.append("image", image);

                // Upload gambar dan dapatkan URL dari server
                const response = await api.post("/media/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                imageUrl = response.data.data.image_url; // URL gambar dari response server
                setValue("image_url", imageUrl); // Simpan URL gambar ke form
            }

            // Pastikan field images adalah array
            if (!Array.isArray(processedData.images)) {
                processedData.images = [];
            }
            processedData.images.push(imageUrl);

            // Kirim data ke API
            const response = await api.post("/products", processedData);
            if (response.status === 201) {
                Toast.fire({
                    icon: "success",
                    title: "Produk berhasil ditambahkan!",
                });
                reset();
                closeModal();
                setImagePreview(null);
                if (fetchProduct) {
                    fetchProduct();
                }
            } else {
                console.warn(response);
                Toast.fire({
                    icon: "error",
                    title: "Terjadi kesalahan saat menambahkan produk.",
                });
            }
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: "Terjadi kesalahan saat mengunggah data.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        document.getElementById("my_modal_1").showModal();
    };

    return {
        register,
        handleSubmit,
        setValue,
        errors,
        reset,
        impacts,
        imagePreview,
        handleImageChange,
        loading,
        handleModal,
        closeModal,
        onSubmit,
        handleShowModal,
        selectedProduct,
    };
};

export default useProductForm;
