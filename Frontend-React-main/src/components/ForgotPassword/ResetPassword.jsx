import { useState } from "react";
import { useForm } from "react-hook-form";
import InputForm from "../Login/InputForm";
import { Link } from "react-router";
import api from "../../services/api";
import { Toast } from "../../utils/function/toast";

const ResetPassword = ({ onNext }) => {
    // State untuk show password login
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    // Mendefinisikan use Form
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
        watch,
    } = useForm();

    // Memantau value password
    const password = watch("password");

    const onSubmit = async (data) => {
        const passwordData = {
            new_password: data.new_password,
        };
        try {
            setLoading(true);
            const response = await api.put("/users/reset-password", passwordData);
            if (response.status === 200 || response.status === 201) {
                Toast.fire({
                    icon: "success",
                    title: "Reset password berhasil",
                });
                onNext();
            } else {
                console.warn(response);
            }
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: "Tidak dapat terhubung ke server. Periksa koneksi Anda.",
            });
        } finally {
            setLoading(false);
        }
    };

    // Toggle Show or Hide Password
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="text-center mb-6 tablet:max-w-[350px] mobilelg:max-w-[350px] mobile:max-w-[310px] mx-auto">
                <div className="w-full mb-6">
                    <img src="../src/assets/svg/key.svg" className="mx-auto bg-[#ddf3df] p-3 rounded-full" alt="key-icon" />
                </div>
                <h1 className="font-bold text-[24px]">Buat Password Baru</h1>
                <p className="tablet:text-base mobile:text-sm mobilelg:text-base text-[#A1A1AA] mt-4 mb-6">Password baru anda harus berbeda dengan password yang digunakan sebelumnya</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="tablet:w-[416px] tablet:px-0 mobile:max-w-[450px] mobile:w-[100%] mobile:px-[17px] mx-auto">
                <InputForm
                    id="password-label"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    register={register("password", {
                        required: "Kata sandi anda tidak valid.",
                        minLength: {
                            value: 6,
                            message: "Kata sandi minimal harus 8 karakter",
                        },
                    })}
                    error={errors.password?.message}
                    placeholder="Masukkan Password"
                    showPassword={showPassword}
                    togglePassword={togglePassword}
                />
                <InputForm
                    id="password-label"
                    label="Konfirmasi Password"
                    type={showPassword ? "text" : "password"}
                    register={register("new_password", {
                        required: "Kata sandi anda tidak valid.",
                        minLength: {
                            value: 6,
                            message: "Kata sandi minimal harus 8 karakter",
                        },
                        validate: (value) => value === password || "Konfirmasi password tidak cocok.",
                    })}
                    error={errors.confirmpassword?.message}
                    placeholder="Konfirmasi Password"
                    showPassword={showPassword}
                    togglePassword={togglePassword}
                />
                <button
                    type="submit"
                    className={`py-3 px-4 inline-flex items-center gap-x-2 text-base font-bold rounded-lg border border-transparent w-full justify-center ${
                        isValid ? "bg-[#2E7D32] text-white" : "bg-[#E5E7EB] text-[#6B7280]"
                    }`}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </span>
                    ) : (
                        "Reset Password"
                    )}
                </button>
            </form>
            <p className="text-base text-[#A1A1AA] my-[64px] w-full text-center">
                Sudah punya akun?{" "}
                <Link to={"/login"} className="font-bold text-[#262626] cursor-pointer">
                    Masuk
                </Link>
            </p>
        </>
    );
};

export default ResetPassword;
