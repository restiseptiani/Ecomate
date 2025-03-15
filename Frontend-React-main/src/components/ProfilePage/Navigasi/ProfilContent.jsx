import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { Toast } from "../../../utils/function/toast";
const ProfilContent = ({ Data, onSaved }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "male", // Default nilai
    });
    useEffect(() => {
        if (Data) {
            setFormData({
                name: Data.name || "",
                phone: Data.phone || "",
                address: Data.address || "address",
                gender: Data.gender === "male" ? "male" : "female",
            });
        }
    }, [Data]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            // Validasi nomor telepon
            if (value && (!value.startsWith("08") || value.length !== 12)) {
                setError("Nomor telepon harus dimulai dengan '08' dan berisi 12 digit.");
            } else {
                setError(""); // Bersihkan error jika valid
            }
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            setLoading(true);
            await api.put(`/users/update`, formData);
            Toast.fire({
                icon: "success",
                title: "Sukses memperbarui data",
            });
            onSaved(true);
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Gagal memperbarui data",
            });
        } finally {
            setLoading(false);
        }
    };

    return (

<div className="p-6">

            <div className="space-y-4">
                <form onSubmit={handleUpdate}>
                    <div className="flex flex-row mt-2 max-mobilelg:mb-6">
                        <label className="text-xl w-40 py-3 items-center">User Name</label>
                        <input type="text" className="max-w-[484px] py-3 px-4 block w-full border border-[#BBBBBB] rounded-lg text-xl" defaultValue={Data.username} disabled={true} />
                    </div>
                    <div className="flex flex-row mt-2 max-mobilelg:mb-6">
                        <label className="text-xl w-40 py-3 items-center">Nama</label>
                        <input
                            type="text"
                            name="name"
                            className="max-w-[484px] py-3 px-4 block w-full border border-[#BBBBBB] rounded-lg text-xl"
                            placeholder="Masukkan nama lengkap"
                            defaultValue={Data.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-row mt-2 max-mobilelg:mb-6">
                        <label className="text-xl w-40 py-3">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="max-w-[484px] py-3 px-4 block w-full border border-[#BBBBBB] rounded-lg text-xl"
                            placeholder="Masukkan email"
                            defaultValue={Data.email}
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>
                    <div className="flex flex-row mt-2 max-mobilelg:mb-6">
                        <label className="text-xl w-40 py-3">No telpon</label>
                        <input
                            type="number"
                            name="phone"
                            className="max-w-[484px] py-3 px-4 block w-full border border-[#BBBBBB] rounded-lg text-xl"
                            placeholder="Masukkan nomer"
                            defaultValue={Data.phone}
                            minLength={12}
                            onChange={handleInputChange}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    <div className="flex flex-row items-center space-x-4 max-mobilelg:mb-6">
                        <label className="text-xl w-40 py-3">Jenis Kelamin</label>
                        <div className="flex items-center space-x-3 max-mobilelg:flex-col max-mobilelg:items-start max-mobilelg:space-x-0">
                            <div className="flex">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={handleInputChange}
                                    className="shrink-0 mt-0.5 radio radio-success border-gray-200 rounded-full text-green-600 focus:ring-green-500 "

                                />
                                <label htmlFor="male" className="text-md text-gray-500 ml-2 dark:text-gray-400">
                                    Laki-laki
                                </label>
                            </div>
                            <div className="flex">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={handleInputChange}
                                    className="shrink-0 mt-0.5 radio radio-success border-gray-200 rounded-full text-green-600 focus:ring-green-500 "

                                />
                                <label htmlFor="female" className="text-md text-gray-500 ml-2 dark:text-gray-400">
                                    Perempuan
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="bg-primary py-3 px-4 block w-[103px] rounded-lg text-white" disabled={loading}>
                        {loading ? <span className="loading loading-spinner text-success"></span> : "Simpan"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilContent;
