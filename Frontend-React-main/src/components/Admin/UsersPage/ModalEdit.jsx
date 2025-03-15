import React, { useState, useEffect } from "react";
import imageBg from "../../../assets/svg/admin-icon/image.svg";
import InputForm from "../../Login/InputForm";
import api from "../../../services/api";
import { Toast } from "../../../utils/function/toast";
const ModalView = ({ selectedUser }) => {
    const [data, setData] = useState({
        name:  "",
        address:  "",
        phone:  "",
        gender:  "male",
    });
    useEffect(() => {
        setData({
            name: selectedUser?.name ?? "",
            address: selectedUser?.address ?? "",
            phone: selectedUser?.phone ?? "",
            gender: selectedUser?.gender === "male" ? "male" : "female",
        });
    }, [selectedUser]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value || "", // Pastikan tidak ada undefined
        }));
    };
    
    const handleEdit = async () => {
        try {
            // Pastikan data tidak kosong dengan fallback ke data sebelumnya
            const payload = {
                address: data.address || selectedUser.address,
                gender: data.gender || selectedUser.gender,
                name: data.name || selectedUser.name,
                phone: data.phone || selectedUser.phone,
            };
    
            console.log("Payload yang dikirim:", payload);
            const response = await api.put(`/admin/users/${selectedUser.id}`, payload);
            Toast.fire({
                icon: "success",
                title: "Sukses memperbarui data",
            });
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error("Error response:", error.response);
            Toast.fire({
                icon: "error",
                title: "Gagal memperbarui data",
            });
            handleClose();
        }
    };
    
    const handleClose = () => {
        document.getElementById("my_modal_24").close();
    };
    return (
        <dialog id="my_modal_24" className="modal">
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

                <div className="flex flex-row items-center justify-between my-5">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_58%] ">Username</h1>
                    <input 
                        type="text"
                        name="username"
                        defaultValue={selectedUser?.username}
                        placeholder="Username"
                        disabled={true}
                        className="py-3   w-full ps-5 text-[#1F2937] font-medium 
                        bg-gray-100 rounded-lg text-sm border outline-none placeholder:text-[#6B7280] 
                        placeholder:font-semibold placeholder:text-sm"
                    />
                </div>
                <div className="flex flex-row items-center justify-between ">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_58%]">Nama</h1>
                    <input 
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        placeholder="Nama"
                        className="py-3   w-full ps-5 text-[#1F2937] font-medium 
                        bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] 
                        placeholder:font-semibold placeholder:text-sm"
                    />
                </div>
                <div className="flex flex-row items-center justify-between my-5">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_58%]">Email</h1>
                    <input 
                        type="text"
                        name="name"
                        defaultValue={selectedUser?.email}
                        disabled={true}
                        placeholder="Email"
                        className="py-3   w-full ps-5 text-[#1F2937] font-medium 
                        bg-gray-100 rounded-lg text-sm border outline-none placeholder:text-[#6B7280] 
                        placeholder:font-semibold placeholder:text-sm"
                    />
                    
                </div>
                <div className="flex flex-row items-center justify-end gap-28 mb-4">
                    <h1 className="font-bold text-[#404040] text-base">Alamat</h1>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Alamat"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-[#404040] text-base flex-[1_58%]">No telepon</h1>
                    <input
                        type="text"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        placeholder="No telepon"
                        className="py-3  w-full ps-5 text-[#1F2937] font-medium 
                        bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] 
                        placeholder:font-semibold placeholder:text-sm mb-5"
                    />
                </div>
                <div className="flex flex-row items-center space-x-4">
                <label className="text-xl w-32 py-3">Jenis Kelamin</label>
                <div className="flex items-center space-x-3">
                    <div className="flex">
                        <input
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            checked={data.gender === 'male'}
                            onChange={handleChange}
                            className="shrink-0 mt-0.5 radio radio-success"
                        />
                        <label 
                            htmlFor="male" 
                            className="text-md text-gray-500 ml-2"
                        >
                            Laki-laki
                        </label>
                        </div>
                        <div className="flex">
                            <input
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                checked={data.gender === 'female'}
                                onChange={handleChange}
                                className="shrink-0 mt-0.5 radio radio-success"
                            />
                            <label 
                                htmlFor="female" 
                                className="text-md text-gray-500 ml-2 dark:text-gray-400"
                            >
                                Perempuan
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end gap-4 mb-4 mt-5">
                    <button
                        className="btn btn-outline btn-success !text-primary border border-primary hover:!bg-primary hover:!text-white"
                        onClick={handleClose}
                    >
                        Batalkan
                    </button>
                    <button
                        className="btn btn-outline btn-success !text-white border !bg-primary hover:!text-white"
                        onClick={handleEdit}
                    >
                        Edit Pengguna
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalView;
