import { useForm } from "react-hook-form";
import mailSvg from "../../assets/svg/mail.svg";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router";
import { Toast } from "../../utils/function/toast";

const OtpInput = ({ onNext, endpoint, email, mode, navigate }) => {
    const [loading, setLoading] = useState(false);
    const [countDown, setCountdown] = useState(300);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);

        try {
            setLoading(true);
            const response = await api.post(endpoint, data);
            if (response.status === 201 || response.status === 200) {
                if (mode === "register") {
                    Toast.fire({
                        icon: "success",
                        title: "Akun Berhasil diregistrasi, silahkan login",
                    });
                    navigate("/login");
                } else if (mode === "forgot-password") {
                    onNext();
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // OTP salah
                setError("otp", { type: "manual", message: "Kode OTP salah. Silakan coba lagi." });
            } else {
                // Error lain
                console.error("Error lainnya:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className="text-center mb-6 mx-auto max-w-[280px]">
                <div className="w-full mb-6">
                    <img src={mailSvg} className="mx-auto bg-[#ddf3df] p-3 rounded-full" alt="key-icon" />
                </div>
                <h1 className="font-bold text-[24px] mb-6">Masukan Kode Verifikasi</h1>
                <p className="text-[#737373] text-base">Kode verifikasi telah dikirim melalui email ke {email}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="tablet:w-[416px] tablet:px-0 mobile:max-w-[450px] mobile:w-[100%] mobile:px-[17px] mx-auto">
                <div className="">
                    <div className="flex flex-col items-center max-w-[400px]">
                        <input
                            type="text"
                            className="text-center text-3xl font-medium text-gray-600 focus:outline-none focus:ring-0 placeholder-gray-400"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, "");
                            }}
                            maxLength={6}
                            {...register("otp", {
                                required: "Silahkan masukkan OTP sebelum lanjut.",
                            })}
                        />
                        <div className="w-full border-t-2 border-[#40b8a6]"></div>
                        {errors.otp && <p className="text-[#EF4444] text-xs mt-2">{errors.otp.message}</p>}
                        <button
                            type="submit"
                            className={`py-3 my-5 px-4 inline-flex items-center gap-x-2 text-base font-bold rounded-lg border border-transparent w-full justify-center ${
                                isValid ? "bg-[#2E7D32] text-white" : "bg-[#E5E7EB] text-[#6B7280]"
                            }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                                    <span className="sr-only">Loading...</span>
                                </span>
                            ) : (
                                "Konfirmasi OTP"
                            )}
                        </button>
                    </div>
                    <p className="text-base text-[#A1A1AA] text-center mt-6 mobile:pb-40 tablet:pb-0">
                        Mohon tunggu dalam{" "}
                        <span className="font-bold text-[#262626] cursor-pointer">
                            {Math.floor(countDown / 60)} menit {countDown % 60} detik.
                        </span>
                        untuk kirim ulang
                    </p>
                </div>
            </form>
        </>
    );
};

export default OtpInput;
