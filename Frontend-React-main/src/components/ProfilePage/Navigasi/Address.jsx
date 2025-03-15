import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { Toast } from "../../../utils/function/toast";
const AlamatContent = ({ Data, onSaved }) => {
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
                address: Data.address || "",
                gender: Data.gender === "male" ? "male" : "female",
            });
        }
    }, [Data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.put(`/users/update`, formData);
            if (response.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Sukses Update Alamat",
                });
            } else {
                throw error;
            }
            onSaved(true);
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: `Data profil Belum di isi`,
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Alamat Saya</h2>
            <div className="space-y-4">
                <form onSubmit={handleUpdate}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                        <hr />
                        <textarea
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            placeholder="Masukkan alamat lengkap"
                            rows={4}
                            name="address"
                            onChange={handleInputChange}
                            defaultValue={formData.address}
                        ></textarea>
                    </div>
                    <button className="bg-primary py-3 px-4 block w-[103px] rounded-lg text-white mt-4" disabled={loading}>
                        {loading ? <span className="loading loading-spinner text-success"></span> : "Simpan"}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default AlamatContent;
