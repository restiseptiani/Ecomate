import { useForm } from "react-hook-form";
import InputForm from "../Login/InputForm";
import "preline";
import api from "../../services/api";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { Toast } from "../../utils/function/toast";
const AddProducts = () => {
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

    const token = useAuthStore.getState().token;

    // Fetching Dampak Product
    useEffect(() => {
        const fetchImpact = async () => {
            try {
                const response = await api.get("/impacts");
                setImpacts(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchImpact();
    }, []);

    // handle change image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const onSubmit = async (data) => {
        try {
            ["price", "coin", "stock"].forEach((key) => {
                data[key] = parseInt(data[key], 10);
            });

            let imageUrl = data.images; // Dapatkan URL gambar dari data form sebelumnya

            if (image) {
                const formData = new FormData();
                formData.append("image", image);

                // Mengupload gambar dan mendapatkan URL
                const response = await api.post("/media/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                imageUrl = response.data.data.image_url; // Dapatkan URL gambar dari server
                setValue("image_url", imageUrl); // Masukkan URL gambar ke form
            }

            if (!Array.isArray(data.images)) {
                data.images = [];
            }
            data.images.push(imageUrl);

            if (!Array.isArray(data.category_impact)) {
                data.category_impact = [data.category_impact];
            }

            if (imageUrl) {
                try {
                    const response = await api.post("/products", data);
                    if (response.status == 201) {
                        console.log(response);
                        Toast.fire({
                            icon: "success",
                            title: "Gacor Kang Products Bisa dimasukin",
                        });
                        reset();
                        setImagePreview(null);
                    } else {
                        console.warn(response);
                        Toast.fire({
                            icon: "error",
                            title: "Login Gagal",
                        });
                    }
                } catch (error) {
                    Toast.fire({
                        icon: "error",
                        title: { error },
                    });
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-row justify-center items-center gap-16">
            <div className="border-l border-slate-500 pl-24">
                <h1>Upload Product Ges</h1>
                <br />
                <br />

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row  gap-11">
                    <div>
                        <InputForm
                            id="name-label"
                            label="Nama Product"
                            type="text"
                            register={register("name", {
                                required: "Silahkan masukkan impact yang valid.",
                            })}
                            error={errors.name?.message}
                            placeholder="Nama Product"
                        />

                        <InputForm
                            id="price-label"
                            label="price"
                            type="number"
                            register={register("price", {
                                required: "Silahkan masukkan price yang valid.",
                            })}
                            error={errors.price?.message}
                            placeholder="price"
                        />

                        <InputForm
                            id="stock-label"
                            label="stock"
                            type="number"
                            register={register("stock", {
                                required: "Silahkan masukkan stock yang valid.",
                            })}
                            error={errors.stock?.message}
                            placeholder="stock"
                        />

                        <InputForm
                            id="coin-label"
                            label="coin"
                            type="number"
                            register={register("coin", {
                                required: "Silahkan masukkan coin yang valid.",
                            })}
                            error={errors.coin?.message}
                            placeholder="coin"
                        />
                    </div>

                    <div>
                        <div>
                            <label htmlFor="category-label" className="block text-base font-bold mb-2 text-[#27272A] border-slate-300">
                                Category Product
                            </label>
                            <select
                                className="select w-full max-w-xs border border-slate-300"
                                id="category-label"
                                {...register("category_product", {
                                    required: "Silakan pilih kategori produk.",
                                })}
                            >
                                <option disabled selected>
                                    Pilih Kategori
                                </option>
                                <option defaultValue="Baju">Baju</option>
                                <option defaultValue="Sepatu">Sepatu</option>
                                <option defaultValue="Sandal">Sandal</option>
                                <option defaultValue="Perabot">Perabot</option>
                                <option defaultValue="Tas">Tas</option>
                                <option defaultValue="Aksesoris">Aksesoris</option>
                            </select>

                            {errors.category && <p className="text-[#EF4444] text-xs mt-2">{errors.category.message}</p>}
                        </div>

                        <InputForm
                            id="desc-label"
                            label="Description"
                            type="text"
                            register={register("description", {
                                required: "Silahkan masukkan impact_point yang valid.",
                            })}
                            error={errors.description?.message}
                            placeholder="Description"
                        />

                        <div>
                            <label htmlFor="category-impact" className="block text-base font-bold mb-2 text-[#27272A]">
                                Category Impact
                            </label>
                            <select
                                className="select w-full max-w-xs border border-slate-300"
                                id="category-impact"
                                {...register("category_impact", {
                                    required: "Silakan pilih impact yang valid.",
                                })}
                            >
                                <option disabled selected>
                                    Dampak Terhadap Lingkungan
                                </option>
                                {impacts.map((impact) => (
                                    <option key={impact.id} value={impact.id}>
                                        {impact.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="category-impact" className="block text-base font-bold mb-2 text-[#27272A] ">
                                Image Product
                            </label>

                            <input type="file" id="file-upload" className="file-input file-input-bordered file-input-success w-full max-w-xs" accept="image/*" onChange={handleImageChange} />

                            <div>
                                {imagePreview && (
                                    <div className="mt-4">
                                        <h3>Preview Gambar:</h3>
                                        <img src={imagePreview} alt="Preview" className="w-64 h-64 object-cover mt-2" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <br />
                        <br />
                        <button type="submit" className="btn btn-success">
                            Simpan product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProducts;
