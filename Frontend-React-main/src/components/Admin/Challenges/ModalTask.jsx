import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Toast } from "../../../utils/function/toast";

const ModalTask = ({ challenge }) => {
    const [formData, setFormData] = useState({
        challenge_id: "",
        name: "",
        day_number: 1,
        task_description: "",
    });

    const fetchLastDay = async () => {
        try {
            const response = await api.get(`/admin/challenges/${challenge?.id}/tasks`);

            const tasks = response.data.data;

            const lastDay = tasks?.length > 0 ? Math.max(...tasks?.map((task) => task.day_number)) : 0;
            setCurrentDay(lastDay + 1); // Hari selanjutnya
            setFormData((prev) => ({
                ...prev,
                day_number: lastDay + 1,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (challenge?.id) {
            setFormData((prev) => ({
                ...prev,
                challenge_id: challenge.id,
            }));
            fetchLastDay();
        }
    }, [challenge]);

    const [currentDay, setCurrentDay] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentDay > challenge?.duration_days) {
            Toast.fire({
                icon: "warning",
                title: "Semua Misi Sudah Ter-isi",
            });
            document.getElementById("my_modal_12").close();
            return;
        }

        console.log(formData);

        try {
            const response = await api.post("/admin/challenges/tasks", formData);
            console.log(response);
            if (response.status === 201) {
                Toast.fire({
                    icon: "success",
                    title: `Sukses Menambahkan Misi Hari Ke-${currentDay}!`,
                });

                setFormData((prev) => ({
                    ...prev,
                    day_number: currentDay + 1,
                    name: "",
                    task_description: "",
                }));
                setCurrentDay((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <dialog id="my_modal_12" className="modal modal-bottom sm:modal-middle">
            <form className="modal-box" onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Hari</h1>
                    <input
                        type="text"
                        name="day_number"
                        className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                        placeholder="Hari"
                        disabled
                        onChange={handleChange}
                        value={formData.day_number}
                    />
                </div>
                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Nama Misi</h1>
                    <input
                        type="text"
                        name="name"
                        className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                        placeholder="Nama Misi"
                        onChange={handleChange}
                        value={formData.name}
                    />
                </div>
                <div className="flex flex-row items-center justify-between my-4">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Deskripsi Misi</h1>
                    <input
                        type="text"
                        name="task_description"
                        className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                        placeholder="Deskripsi Misi"
                        onChange={handleChange}
                        value={formData.task_description}
                    />
                </div>
                <div className="flex flex-row items-center justify-end gap-4 mb-4">
                    <button
                        className="btn btn-success border border-[#2E7D32] btn-outline !text-[#2E7D32] hover:!bg-[#2E7D32] hover:!text-white"
                        onClick={() => document.getElementById("my_modal_12").close()}
                    >
                        Tutup
                    </button>
                    <button type="submit" className="btn btn-success !text-white bg-[#2E7D32] border border-[#2E7D32]">
                        Submit Misi
                    </button>
                </div>
            </form>
        </dialog>
    );
};

export default ModalTask;
