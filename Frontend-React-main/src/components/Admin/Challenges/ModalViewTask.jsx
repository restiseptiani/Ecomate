const ModalViewTask = ({ tasks, challenge, setTasks }) => {
    return (
        <dialog id="my_modal_13" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {tasks
                    ?.sort((a, b) => a.day_number - b.day_number)
                    .map((task) => (
                        <div className="flex flex-col justify-between my-4" key={task.id}>
                            <h1 className="font-bold text-[#404040] text-base flex-[1_55%] mb-2 underline">Misi Hari Ke-{task?.day_number}</h1>
                            <label htmlFor="misi-name" className="text-sm text-[#404040] font-medium">
                                Nama Misi
                            </label>
                            <input
                                id="misi-name"
                                type="text"
                                name="title"
                                value={task?.name || "name tidak tersedia"}
                                className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm mb-4"
                                placeholder="Nama Misi"
                                disabled
                            />
                            <label htmlFor="misi-name" className="text-sm text-[#404040] font-medium">
                                Deskripsi Misi
                            </label>
                            <textarea
                                type="text"
                                name="description"
                                className="py-3 px-4 h-28 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                                placeholder="Deskripsi Misi"
                                value={task?.task_description || "Deskripsi tidak Tersedia"}
                                disabled
                            />
                        </div>
                    ))}

                <div className="flex flex-row items-center justify-end gap-4 mb-4">
                    <button
                        className="btn btn-success border border-[#2E7D32] btn-outline !text-[#2E7D32] hover:!bg-[#2E7D32] hover:!text-white"
                        onClick={() => {
                            document.getElementById("my_modal_13").close();
                            setTasks(null);
                            document.getElementById("my_modal_11").showModal();
                        }}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalViewTask;
