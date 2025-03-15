import { useEffect } from "react";
import useUserStore, { loadUserData } from "../../stores/useUserStore";

const WelcomeSection = ({ handleQuestionClick }) => {
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        loadUserData("/users/profile");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full pt-20 max-[425px]:pt-10" style={{ scrollbarWidth: "none" }}>
            <div className="text-center mb-6 px-3">
                <h1 className="font-bold text-[30px] text-black max-[500px]:text-2xl">Halo, {user?.name}!</h1>
                <h2 className="font-bold text-[30px] text-black max-[500px]:text-2xl">Apa yang bisa saya bantu?</h2>
            </div>
            <div className="flex justify-center flex-wrap gap-4 pt-6 max-w-[720px]">
                {[
                    "Bagaimana cara mendaftar challenge ramah lingkungan?",
                    "Apa saja hadiah yang bisa ditukar dengan poin?",
                    "Bagaimana cara mengurangi jejak karbon saya?",
                    "Berikan rekomendasi produk ramah lingkungan!",
                ].map((text, index) => (
                    <p
                        key={index}
                        className="border border-[#A1A1AA] text-[#A1A1AA] w-[320px] text-base font-normal p-4 rounded-xl max-[500px]:text-xs cursor-pointer"
                        onClick={() => handleQuestionClick(text)}
                    >
                        {text}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default WelcomeSection;
