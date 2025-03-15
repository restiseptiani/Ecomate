import { useState } from "react";
import imageBg from "../../../assets/svg/admin-icon/image.svg";
import { Upload } from "lucide-react";
import InputForm from "../../Login/InputForm";
import useProductForm from "../../../hooks/useProductForm";
import api from "../../../services/api";
import { Toast } from "../../../utils/function/toast";

const ModalChallenges = () => {
    const { impacts } = useProductForm();

    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        difficulty: "",
        category_impact: "",
        exp: "",
        coin: "",
        duration_days: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            const file = files[0];
            if (file) {
                setImage(file);
                const previewUrl = URL.createObjectURL(file);
                setImagePreview(previewUrl);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(formData);

        try {
            setLoading(true);
            const data = new FormData();
            data.append("challenge_img", image);
            data.append("title", formData.title);
            data.append("difficulty", formData.difficulty);
            data.append("description", formData.description);
            data.append("duration_days", formData.duration_days);
            data.append("exp", formData.exp);
            data.append("coin", formData.coin);

            if (formData.category_impact) {
                data.append("category_impact", formData.category_impact);
            }

            // Debugging: lihat FormData setelah di-append
            console.log("Data yang akan dikirim:", Array.from(data.entries()));

            const response = await api.post("/admin/challenges", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                Toast.fire({
                    icon: "success",
                    title: "Sukses Menambahkan Challeges!",
                });
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog id="my_modal_10" className="modal modal-bottom sm:modal-middle">
            <form className="modal-box" onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base">Foto Produk</h1>
                    <div className="flex flex-row items-center gap-8 ">
                        <div className={`border border-[#E5E7EB] rounded-2xl ${imagePreview ? "w-[120px] h-[120px] object-cover rounded-2xl" : "p-8"}`}>
                            <img src={imagePreview ? imagePreview : imageBg} className="object-cover rounded-2xl w-full h-full" alt="Preview" />
                        </div>
                        <div>
                            <label htmlFor="file-upload" className="btn btn-success !text-white bg-[#2E7D32] border border-[#2E7D32] flex items-center gap-2">
                                <Upload />
                                Tambah Foto
                            </label>
                            <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Judul</h1>
                    <input
                        type="text"
                        name="title"
                        className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                        placeholder="Judul Tantangan"
                        onChange={handleChange}
                        value={formData.title}
                    />
                </div>

                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_58%]">Kesulitan</h1>
                    <select className="select w-full max-w-xs border border-[#E5E7EB]" id="category-label" value={formData.difficulty} name="difficulty" onChange={handleChange}>
                        <option disabled value="">
                            Tingkat Kesulitan
                        </option>
                        <option value="Mudah">Mudah</option>
                        <option value="Menengah">Menengah</option>
                        <option value="Sulit">Sulit</option>
                    </select>
                </div>

                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_58%]">Kategori Efek</h1>
                    <select className="select w-full max-w-xs border border-slate-300" id="category-impact" name="category_impact" value={formData.category_impact} onChange={handleChange}>
                        <option disabled value="">
                            Dampak Terhadap Lingkungan
                        </option>
                        {impacts.map((impact) => (
                            <option key={impact.id} value={impact.id}>
                                {impact.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Exp</h1>
                    <input
                        type="number"
                        name="exp"
                        className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                        placeholder="Exp"
                        onChange={handleChange}
                        value={formData.exp}
                    />
                </div>

                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Coin</h1>
                    <input
                        type="number"
                        name="coin"
                        className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                        placeholder="Jumlah Koin"
                        onChange={handleChange}
                        value={formData.coin}
                    />
                </div>

                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Durasi (Hari)</h1>
                    <input
                        type="number"
                        name="duration_days"
                        className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                        placeholder="Durasi Tantangan"
                        onChange={handleChange}
                        value={formData.duration_days}
                    />
                </div>

                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Deskripsi</h1>
                    <textarea
                        name="description"
                        id="description"
                        className="textarea textarea-bordered w-full"
                        placeholder="Deskripsi Tantangan"
                        onChange={handleChange}
                        value={formData.description}
                    ></textarea>
                </div>

                <div className="flex flex-row items-center justify-end gap-4 mb-4">
                    <span
                        className="btn btn-outline btn-success !text-[#2E7D32] border border-[#2E7D32] hover:!bg-[#2E7D32] hover:!text-white"
                        disabled={loading}
                        onClick={() => document.getElementById("my_modal_10").close()}
                    >
                        Batalkan
                    </span>
                    <button type="submit" className="btn btn-success !text-white bg-[#2E7D32] border border-[#2E7D32]" disabled={loading}>
                        {loading ? <span className="loading loading-spinner text-success"></span> : "Simpan Tantangan"}
                    </button>
                </div>
            </form>
        </dialog>
    );
};

export default ModalChallenges;
