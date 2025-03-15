import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import InputForm from "../components/Login/InputForm";
import WelcomeSection from "../components/Login/WelcomeSection";
import GoogleLogin from "../components/Login/GoogleLogin";
import { Toast } from "../utils/function/toast";
import api from "../services/api";
import useAuthStore from "../stores/useAuthStore";
import email from "../assets/svg/email.svg";

const LoginPage = () => {
    // State untuk show password login
    const [showPassword, setShowPassword] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    // Mendefinisikan use Form
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm();

    const navigate = useNavigate();

    const setToken = useAuthStore((state) => state.setToken);

    //Ketika Form disubmit jalankan fungsi OnSubmit
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await api.post("/users/login", data);
            if (response.status == 200) {
                const { token } = response.data.data;
                setToken(token);
                setIsAuthenticated(true);
                Toast.fire({
                    icon: "success",
                    title: "Login Berhasil.",
                });
            } else {
                console.warn(response);
                Toast.fire({
                    icon: "error",
                    title: "Login Gagal",
                });
            }
            navigate("/");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message === "Incorrect password" ? "password" : "email", { type: "server", message: error.response.data.message });
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Tidak dapat terhubung ke server. Periksa koneksi Anda.",
                });
            }
            console.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    // Toggle Show or Hide Password
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="bg-[#45BA4B]">
            <div className="flex tablet:flex-row mobile:flex-col w-full mx-auto min-h-screen">
                <WelcomeSection title="Selamat Datang di EcoMate!" />

                {/* Form Login */}
                <div className="flex-[1_50%] w-full flex flex-col items-center justify-center bg-white mobile:rounded-t-[60px] tablet:rounded-t-none mobile:pt-[28px] tablet:pt-0">
                    <div className="text-center mb-6">
                        <h1 className="font-bold text-[24px] mb-4 text-[#262626]">Masuk</h1>
                        <p className="text-[#737373] text-base">Silahkan masuk ke akun anda</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="tablet:w-[416px] tablet:px-0 mobile:max-w-[450px] mobile:w-[100%] mobile:px-[17px]">
                        <div className="">
                            <InputForm
                                id="email-label"
                                label="Email"
                                ps="ps-11"
                                type="email"
                                register={register("email", {
                                    required: "Silahkan masukkan email yang valid.",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Format email tidak valid.",
                                    },
                                })}
                                error={errors.email?.message}
                                placeholder="contoh@email.com"
                                iconStart={email}
                            />
                            <InputForm
                                id="password-label"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                register={register("password", {
                                    required: "Kata sandi anda tidak valid.",
                                    minLength: {
                                        value: 6,
                                        message: "Kata sandi minimal harus 6 karakter",
                                    },
                                })}
                                error={errors.password?.message}
                                placeholder="Masukkan password"
                                showPassword={showPassword}
                                togglePassword={togglePassword}
                            />
                            <div className="flex flex-row justify-between items-center">
                                <div className="form-control mb-6">
                                    <label className="cursor-pointer label !justify-normal gap-4">
                                        <input type="checkbox" className="checkbox border-2 border-[#2E7D32] [--chkbg:#3EA843] [--chkfg:white] checked:border-[#2E7D32]" />
                                        <span className="label-text font-medium text-base text-[#262626] ">Remember me</span>
                                    </label>
                                </div>
                                <div>
                                    <p className="font-medium text-base text-center cursor-pointer text-[#262626] mb-6">
                                        <Link to={"/forgot-password"}>Lupa Password?</Link>
                                    </p>
                                </div>
                            </div>
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
                                    "Masuk"
                                )}
                            </button>
                        </div>
                    </form>
                    <GoogleLogin />
                    <p className="text-base text-[#737373] my-[64px]">
                        Belum punya akun?{" "}
                        <Link to={"/register"} className="font-bold text-[#262626] cursor-pointer">
                            Daftar Akun
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
