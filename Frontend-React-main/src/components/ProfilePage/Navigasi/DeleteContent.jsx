import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { Toast } from "../../../utils/function/toast";
import useAuthStore from "../../../stores/useAuthStore";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Modal from "react-modal";
import InputFormReset from "../InputFormReset";


const PrivasiContent = () => {
    const { clearToken } = useAuthStore();
    const navigate = useNavigate();
    const [showPasswordOld, setShowPasswordOld] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm();
    useEffect(() => {
        let timer;
        if (otpTimer > 0) {
            timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [otpTimer]);
    const handleDelete = async () => {
        Swal.fire({
            title: "Apakah anda yakin ingin menghapus akun?",
            text: "Anda tidak dapat mengembalikan akun ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, saya yakin",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete("/users");
                    clearToken();
                    Toast.fire({
                        icon: "success",
                        title: "Akun berhasil dihapus",
                    });
                    navigate("/login");
                } catch (error) {
                    Toast.fire({
                        icon: "error",
                        title: "Gagal menghapus akun. Silakan coba lagi.",
                    });
                    console.error("Error deleting account:", error);
                }
            }
        });
    };
    const togglePasswordOld = () => {
        setShowPasswordOld(!showPasswordOld);
    };
    const togglePasswordNew = () => {
        setShowPasswordNew(!showPasswordNew);
    };
    const handleRequestOTP = async () => {
        if (otpTimer > 0) return;
        setOtpTimer(120);
        try {
            await api.post("/users/update/request-otp");
            Toast.fire({
                icon: "success",
                title: "OTP berhasil dikirimkan ke email Anda",
            });

            setIsModalOpen(true);
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Gagal mengirimkan OTP. Silakan coba lagi.",
            });
        }
    };

    const onSubmit = async (data) => {
        const userData = {
            ...data,
        };
        const resetData = {
            old_password: userData.old_password,
            new_password: userData.new_password,
            otp: userData.otp,
        };
        console.log(resetData);
        try {
            await api.put("/users/update/password", resetData);
            Toast.fire({
                icon: "success",
                title: "Password berhasil diubah",
            });
            closeModal();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Toast.fire({
                    icon: "error",
                    title: "Kode Otp Salah",
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Password Lama salah",
                });
                console.error("Error updating password:", error);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Pengaturan Privasi</h2>
            <hr />
            <div className="flex flex-row justify-between">
                <h2 className="p-5">Reset Password</h2>
                <button
                    className={`bg-primary m-3 py-3 px-3 block w-[120px] rounded-lg text-white ${otpTimer > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleRequestOTP}
                    disabled={otpTimer > 0}
                >
                    {otpTimer > 0 ? `Tunggu (${otpTimer}s)` : "Reset"}
                </button>
            </div>
            <hr />
            <div className="flex flex-row justify-between">
                <h2 className="p-5">Minta Penghapusan Akun</h2>
                <button className="bg-red-500 m-3 py-3 px-3 block w-[120px] rounded-lg text-white" onClick={handleDelete}>
                    Menghapus
                </button>
            </div>
            <hr />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="bg-white rounded-lg shadow-lg w-[600px] mx-auto mt-20 p-5"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-xl font-bold mb-4">Ubah Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputFormReset
                        id="password-label1"
                        label="Password Lama"
                        type={showPasswordOld ? "text" : "password"}
                        register={register("old_password", {
                            required: "Kata sandi anda tidak valid.",
                            minLength: {
                                value: 6,
                                message: "Kata sandi minimal harus 6 karakter",
                            },
                        })}
                        error={errors.old_password?.message}
                        placeholder="Masukkan password"
                        showPassword={showPasswordOld}
                        togglePassword={togglePasswordOld}
                    />
                    <InputFormReset
                        id="password-label2"
                        label="Password Baru"
                        type={showPasswordNew ? "text" : "password"}
                        register={register("new_password", {
                            required: "Kata sandi anda tidak valid.",
                            minLength: {
                                value: 6,
                                message: "Kata sandi minimal harus 6 karakter",
                            },
                        })}
                        error={errors.new_password?.message}
                        placeholder="Masukkan password"
                        showPassword={showPasswordNew}
                        togglePassword={togglePasswordNew}
                    />
                    <label className="block text-sm font-bold mb-1">Masukkan Kode OTP yang sudah dikirimkan melalui Email</label>
                    <input
                        type="text"
                        className="text-center text-3xl font-medium focus:outline-none focus:ring-0 placeholder-gray-400 border border-gray-300 w-full mb-4 py-4 rounded-xl text-primary"
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        }}
                        maxLength={6}
                        {...register("otp", {
                            required: "Silahkan masukkan OTP sebelum lanjut.",
                        })}
                    />
                    {errors.otp && <p className="text-[#EF4444] text-xs mt-2">{errors.otp.message}</p>}
                    <div className="flex justify-end">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2">
                            Batal
                        </button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
                            Ubah
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default PrivasiContent;
