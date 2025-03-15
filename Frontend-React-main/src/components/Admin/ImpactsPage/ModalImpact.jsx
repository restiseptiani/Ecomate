import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Toast } from "../../../utils/function/toast";

const ModalImpact = ({ fetchImpact, selectedImpact, setSelectedImpact }) => {
    const [formData, setFormData] = useState({
        description: "",
        impact_point: "",
        name: "",
    });

    // useEffect untuk mengupdate formData saat selectedImpact berubah
    useEffect(() => {
        if (selectedImpact) {
            setFormData({
                description: selectedImpact.description || "",
                impact_point: selectedImpact.impact_point || "",
                name: selectedImpact.name || "",
            });
        } else {
            // Reset formData jika selectedImpact null
            setFormData({
                description: "",
                impact_point: "",
                name: "",
            });
        }
    }, [selectedImpact]);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            impact_point: parseInt(formData.impact_point, 10) || 0, // Menangani kasus jika nilai impact_point tidak valid
        };

        try {
            setLoading(true);
            const response = await api.post("/impacts", updatedFormData);
            if (response.status === 201) {
                Toast.fire({
                    icon: "success",
                    title: "Sukses Menambahkan Kategori Efek!",
                });

                setFormData((prev) => ({
                    ...prev,
                    description: "",
                    impact_point: "",
                    name: "",
                }));
                fetchImpact();
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
    };

    const handleCloseModal = () => {
        setSelectedImpact(null);
        document.getElementById("my_modal_impact").close();
    };
    return (
        <dialog id="my_modal_impact" className="modal modal-bottom sm:modal-middle">
            <form className="modal-box" onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Nama Kategori Efek</h1>
                    <input
                        type="text"
                        name="name"
                        className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                        placeholder="Nama Efek"
                        onChange={handleChange}
                        value={formData.name}
                        disabled={selectedImpact}
                    />
                </div>

                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Impact Point</h1>
                    <input
                        type="number"
                        name="impact_point"
                        className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                        placeholder="Impact Point"
                        onChange={handleChange}
                        value={formData.impact_point}
                        disabled={selectedImpact}
                    />
                </div>

                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Deskripsi</h1>
                    <textarea
                        name="description"
                        id="description"
                        className="textarea textarea-bordered w-full"
                        placeholder="Deskripsi"
                        onChange={handleChange}
                        value={formData.description}
                        disabled={selectedImpact}
                    ></textarea>
                </div>

                <div className="flex flex-row items-center justify-end gap-4 mb-4">
                    <span className="btn btn-outline btn-success !text-[#2E7D32] border border-[#2E7D32] hover:!bg-[#2E7D32] hover:!text-white" disabled={loading} onClick={handleCloseModal}>
                        {selectedImpact ? "Tutup" : "Batalkan"}
                    </span>
                    {!selectedImpact && (
                        <button type="submit" className="btn btn-success !text-white bg-[#2E7D32] border border-[#2E7D32]" disabled={loading}>
                            {loading ? <span className="loading loading-spinner text-success"></span> : "Tambah Kategori"}
                        </button>
                    )}
                </div>
            </form>
        </dialog>
    );
};

export default ModalImpact;
