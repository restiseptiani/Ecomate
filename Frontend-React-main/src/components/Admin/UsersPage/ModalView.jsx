import imageBg from "../../../assets/svg/admin-icon/image.svg";
import InputForm from "../../Login/InputForm";

const ModalView = ({ selectedUser }) => {
    return (
        <dialog id="my_modal_22" className="modal">
            <div className="modal-box">
                <div className="flex flex-row items-center gap-[75px]">
                    <h1 className="font-bold text-[#404040] text-base">Foto Produk</h1>
                    <div className="flex flex-row items-center gap-8 ">
                        <div className={`border border-[#E5E7EB] rounded-2xl ${!selectedUser?.avatar_url && "p-8"}`}>
                            <img
                                src={selectedUser?.avatar_url ? selectedUser?.avatar_url : imageBg}
                                className={selectedUser?.avatar_url && "w-[120px] h-[120px] object-cover rounded-2xl"}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Username</h1>
                    <InputForm id="name-label" type="text" defaultValue={selectedUser?.username} disabled={true} placeholder="Username" />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Nama</h1>
                    <InputForm id="name-label" type="text" defaultValue={selectedUser?.name} disabled={true} placeholder="Nama" />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">Email</h1>
                    <InputForm id="name-label" type="text" defaultValue={selectedUser?.email} disabled={true} placeholder="Email" />
                </div>
                <div className="flex flex-row items-center justify-end gap-28 mb-4">
                    <h1 className="font-bold text-[#404040] text-base">Alamat</h1>
                    <textarea className={`textarea textarea-bordered flex-[1_70%]`} disabled placeholder="Alamat" defaultValue={selectedUser?.address}></textarea>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_55%]">No telepon</h1>
                    <InputForm id="name-label" type="text" defaultValue={selectedUser?.phone} disabled={true} placeholder="Phone" />
                </div>
                <div className="flex flex-row ">
                    <h1 className="font-bold text-[#404040] text-base ">Jenis Kelamin</h1>
                    <input type="radio" name="gender" id="male" className="radio radio-success ml-16 mr-2" checked disabled={true} />
                    {selectedUser?.gender}
                </div>
                <div className="flex flex-row items-center justify-end gap-4 mb-4">
                    <button
                        className="btn btn-outline btn-success !text-[#2E7D32] border border-[#2E7D32] hover:!bg-[#2E7D32] hover:!text-white"
                        onClick={() => document.getElementById("my_modal_22").close()}
                    >
                        Kembali
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalView;
