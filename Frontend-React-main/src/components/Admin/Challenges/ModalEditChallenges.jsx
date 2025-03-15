import { useEffect, useState } from "react";
import useProductForm from "../../../hooks/useProductForm";
import imageBg from "../../../assets/svg/admin-icon/image.svg";
import api from "../../../services/api";
import { Toast } from "../../../utils/function/toast";

const ModalEditChallenges = ({ selectedChallenge, fetchChallenges }) => {
    const { impacts } = useProductForm();
    const [loading, setLoading] = useState(false);
    const [categoryImpact1, setCategoryImpact1] = useState("");

    const [data, setData] = useState({
        id: "",
        category_impact: "",
        coin: "",
        description: "",
        difficulty: "",
        DurationDays: "",
        exp: "",
        title: "",
    });

    useEffect(() => {
        if (selectedChallenge) {
            const impact1 = selectedChallenge.categories?.[0]?.impact_category?.name ? impacts.find((impact) => impact.name === selectedChallenge.categories[0].impact_category.name)?.id : "";

            setCategoryImpact1(impact1 || "");

            setData({
                id: selectedChallenge.id || "",
                ImpactCategories: impact1 || "",
                coin: selectedChallenge.coin || "",
                description: selectedChallenge.description || "",
                difficulty: selectedChallenge.difficulty || "",
                DurationDays: selectedChallenge.duration_days || "",
                exp: selectedChallenge.exp || "",
                title: selectedChallenge.title || "",
            });
        }
    }, [selectedChallenge, impacts]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            ...data,
            ImpactCategories: Array.isArray(data.ImpactCategories) ? data.ImpactCategories : [data.ImpactCategories],
        };
        console.log(updatedData);
        try {
            const response = await api.put(`/admin/challenges/${data.id}`, updatedData);
            console.log(response);
            if (response.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Edit Data Tantangan Berhasil!",
                });
                document.getElementById("my_modal_14").close();
                fetchChallenges();
            }
        } catch (error) {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: "Edit Data Tantangan Gagal!",
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "category_impact") {
            setCategoryImpact1(value); // Update category impact dropdown
        }

        setData((prevData) => ({
            ...prevData,
            [name]: value || "", // Update nilai state
        }));
    };

    return (
        <dialog id="my_modal_14" className="modal">
            <form className="modal-box" onSubmit={handleSubmit}>
                <div className="flex flex-row items-center gap-11">
                    <h1 className="font-bold text-[#404040] text-base">Foto Tantangan</h1>
                    <div className="flex flex-row items-center gap-8 ">
                        <div className={`border border-[#E5E7EB] rounded-2xl ${selectedChallenge?.challenge_img ? "w-[120px] h-[120px] object-cover rounded-2xl" : "p-8"}`}>
                            <img src={selectedChallenge?.challenge_img || imageBg} className="object-cover rounded-2xl w-full h-full" alt="Preview" />
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
                        value={data.title}
                    />
                </div>

                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_58%]">Kesulitan</h1>
                    <select className="select w-full max-w-xs border border-[#E5E7EB]" id="category-label" value={data.difficulty} name="difficulty" onChange={handleChange}>
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
                    <select className="select w-full max-w-xs border border-slate-300" id="category-impact" name="category_impact" value={categoryImpact1} onChange={handleChange}>
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
                        value={data.exp}
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
                        value={data.coin}
                    />
                </div>

                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Durasi (Hari)</h1>
                    <input
                        type="number"
                        name="DurationDays"
                        className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                        placeholder="Durasi Tantangan"
                        onChange={handleChange}
                        value={data.duration_days}
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
                        value={data.description}
                    ></textarea>
                </div>

                <div className="flex flex-row items-center justify-end gap-4 mb-4">
                    <span
                        className="btn btn-outline btn-success !text-[#2E7D32] border border-[#2E7D32] hover:!bg-[#2E7D32] hover:!text-white"
                        disabled={loading}
                        onClick={() => document.getElementById("my_modal_14").close()}
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

export default ModalEditChallenges;
