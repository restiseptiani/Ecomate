import { useEffect, useState } from "react";
import api from "../../../services/api";
import ModalTask from "./ModalTask";
import ModalViewTask from "./ModalViewTask";

const ModalViewChallenges = ({ challenge }) => {
    const [tasks, setTasks] = useState(null);

    const fetchChallengeTask = async () => {
        try {
            const response = await api.get(`/admin/challenges/${challenge?.id}/tasks`);
            if (response.data.data !== null) {
                setTasks(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (challenge) {
            fetchChallengeTask();
        }
    }, [challenge]);

    const handleMisi = () => {
        document.getElementById("my_modal_11").close();
        document.getElementById("my_modal_12").showModal();
    };

    const handleViewMisi = () => {
        document.getElementById("my_modal_11").close();
        // Reset tasks each time modal is opened to ensure fresh fetch
        setTasks(null); // Clear tasks
        fetchChallengeTask(); // Fetch tasks
        document.getElementById("my_modal_13").showModal();
    };

    return (
        <>
            <dialog id="my_modal_11" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="flex flex-row items-center gap-[70px]">
                        <h1 className="font-bold text-[#404040] text-base">Foto Tantangan</h1>
                        <div className="flex flex-row items-center gap-8 ">
                            <div className={`border border-[#E5E7EB] rounded-2xl ${challenge?.challenge_img ? "w-[120px] h-[120px] object-cover rounded-2xl" : "p-8"}`}>
                                <img src={challenge?.challenge_img} className="object-cover rounded-2xl w-full h-full" alt="Preview" />
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
                            defaultValue={challenge?.title}
                            disabled
                        />
                    </div>

                    <div className="flex flex-row items-center justify-between my-4">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Kesulitan</h1>
                        <input
                            type="text"
                            name="title"
                            className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                            defaultValue={challenge?.difficulty}
                            disabled
                        />
                    </div>

                    <div className="flex flex-row items-center justify-between my-4">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Kategori Efek</h1>
                        <input
                            type="text"
                            name="title"
                            className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                            defaultValue={challenge?.categories[0].impact_category.name}
                            disabled
                        />
                    </div>

                    <div className="flex flex-row items-center justify-between my-4">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Exp</h1>
                        <input
                            type="number"
                            name="exp"
                            className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                            placeholder="Exp"
                            defaultValue={challenge?.exp}
                            disabled
                        />
                    </div>

                    <div className="flex flex-row items-center justify-between my-4">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Coin</h1>
                        <input
                            type="number"
                            name="coin"
                            className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                            placeholder="Jumlah Koin"
                            defaultValue={challenge?.coin}
                            disabled
                        />
                    </div>

                    <div className="flex flex-row items-center justify-between my-4">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Durasi (Hari)</h1>
                        <input
                            type="number"
                            name="duration_days"
                            className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                            placeholder="Durasi Tantangan"
                            defaultValue={challenge?.duration_days}
                            disabled
                        />
                    </div>

                    <div className="flex flex-row items-center justify-between my-4">
                        <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Deskripsi</h1>
                        <textarea
                            name="description"
                            id="description"
                            className="textarea textarea-bordered w-full"
                            placeholder="Deskripsi Tantangan"
                            defaultValue={challenge?.description}
                            disabled
                        ></textarea>
                    </div>

                    <div className="flex flex-row items-center justify-end gap-4 mb-4">
                        <button
                            className="btn btn-success border border-[#2E7D32] btn-outline !text-[#2E7D32] hover:!bg-[#2E7D32] hover:!text-white"
                            onClick={() => document.getElementById("my_modal_11").close()}
                        >
                            Tutup
                        </button>
                        <button className="btn btn-success border border-[#2E7D32] btn-outline !text-[#2E7D32] hover:!bg-[#2E7D32] hover:!text-white" onClick={handleViewMisi}>
                            Lihat Misi
                        </button>
                        <button
                            className="btn btn-success !text-white bg-[#2E7D32] border border-[#2E7D32]"
                            onClick={handleMisi}
                            disabled={challenge?.deleted_at}
                        >
                            Tambah Misi
                        </button>
                    </div>
                </div>
            </dialog>
            <ModalTask challenge={challenge} />
            <ModalViewTask tasks={tasks} setTasks={setTasks} />
        </>
    );
};

export default ModalViewChallenges;
