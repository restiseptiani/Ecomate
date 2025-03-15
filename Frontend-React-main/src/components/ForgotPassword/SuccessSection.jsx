import { Link, useNavigate } from "react-router";

const SuccessSection = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
    };

    return (
        <>
            <div className="text-center mb-6 tablet:max-w-[350px] mobilelg:max-w-[350px] mobile:max-w-[310px] mx-auto">
                <div className="w-full mb-6">
                    <img src="../src/assets/svg/check-circle.svg" className="mx-auto bg-[#ddf3df] p-3 rounded-full" alt="key-icon" />
                </div>
                <h1 className="font-bold text-[24px]">Password Reset</h1>
                <p className="tablet:text-base mobile:text-sm mobilelg:text-base text-[#A1A1AA] mt-4 mb-6">Password anda berhasil direset Klik dibawah untuk login kembali</p>
            </div>

            <div className="tablet:w-[416px] tablet:px-0 mobile:max-w-[450px] mobile:w-[100%] mobile:px-[17px] mx-auto">
                <button
                    onClick={handleClick}
                    className="py-3 px-4 inline-flex items-center gap-x-2 text-base font-bold rounded-lg border border-transparent bg-[#2E7D32] text-white hover:bg-[#256428] focus:outline-none focus:bg-[#256428] disabled:opacity-50 disabled:pointer-events-none w-full justify-center"
                >Masuk</button>
            </div>
        </>
    );
};

export default SuccessSection;
