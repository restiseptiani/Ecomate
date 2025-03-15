import { useForm } from "react-hook-form";
import InputForm from "../Login/InputForm";
import { Link } from "react-router";
import Key from "../../assets/svg/key.svg";
import Email from "../../assets/svg/email.svg";
import api from "../../services/api";
import { useState } from "react";
import { Toast } from "../../utils/function/toast";
const EmailSubmit = ({ setEmailUser, onNext }) => {
    const [loading, setLoading] = useState(false);

    // Mendefinisikan use Form
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await api.post("/users/forgot-password", data);
            if (response.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "OTP Telah dikirim kan Ke Email Kamu",
                });
                setEmailUser(data.email);
                onNext();
            } else {
                console.warn(response);
            }
        } catch (error) {
            if (error.response) {
                setError("email", { type: "server", message: error.response.data.message });
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Tidak dapat terhubung ke server. Periksa koneksi Anda.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="text-center mb-6">
                <div className="w-full mb-6">
                    <img src={Key} className="mx-auto bg-[#ddf3df] p-3 rounded-full" alt="key-icon" />
                </div>
                <h1 className="font-bold text-[24px]">Lupa Password</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="tablet:w-[416px] tablet:px-0 mobile:max-w-[450px] mobile:w-[100%] mobile:px-[17px] mx-auto">
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
                    iconStart={Email}
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

export default EmailSubmit;
