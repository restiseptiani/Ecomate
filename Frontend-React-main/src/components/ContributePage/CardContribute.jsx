import user from "../../assets/jpg/user.jpg";
import cashback from "../../assets/png/cashback.png";
import challenge from "../../assets/png/challenge.png";
import { Mail, Phone } from "lucide-react";

const CardContribute = ({ data, challenges }) => {
    return (
        <>
            <div className="px-8 mt-10 mb-7 md:relative md:z-20">
                <h1 className="font-bold text-2xl text-[#FAFAFA] md:text-black z-20 relative mb-1">Detail Kontribusi</h1>
                <p className="text-lg font-normal text-[#FAFAFA] md:text-black z-20 relative">Lihat Kontribusi anda disini</p>
            </div>
            <div className="px-6">
                <div className="md:flex md:flex-row md:items-center md:gap-7">
                    <div className="z-20 relative bg-white h-fit mobileNormal:w-fit max-md:mx-auto rounded-xl p-12 md:p-4 max-md:z-20 md:flex md:flex-row max-w-[592px] md:gap-6">
                        <div className="relative">
                            <img
                                src={data?.avatar_url ? data?.avatar_url : user}
                                alt="Profile Avatar"
                                className="w-[210px] h-[210px] rounded-full object-cover object-top md:rounded-xl md:w-[140px] md:h-[140px]"
                            />
                        </div>
                        <div>
                            <h1 className="mx-auto w-full text-center md:text-left md:text-xl text-2xl font-semibold mt-5">{data?.name || "John Doe"}</h1>
                            <h1 className="mx-auto w-full text-center md:text-left md:text-base text-lg font-light flex flex-row items-center gap-3 md:mt-3">
                                <Mail width={18} />
                                {data?.email || "johndoe@gmail.com"}
                            </h1>
                            <h1 className="mx-auto w-full text-center md:text-left md:text-base text-lg font-light mt-3 flex flex-row items-center gap-3">
                                <Phone width={18} />
                                {data?.phone || "+628 238 773 492 6"}
                            </h1>
                        </div>
                    </div>
                    <div className="bg-white z-20 relative h-fit w-fit flex flex-row mx-auto md:mx-0 my-6 rounded-xl">
                        <div className="px-6 py-8">
                            <p className="text-sm text-black font-normal">Total Koin</p>
                            <h1 className="text-3xl text-[#020617] font-bold py-1">{data?.coin || 0}</h1>
                            <p className="text-xs text-black font-normal max-w-[135px]">Koin yang anda dapatkan dari challenge dan belanja.</p>
                        </div>
                        <div className="h-full">
                            <img src={cashback} alt="banner-cashback" className="h-full object-cover object-center" />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-white z-20 relative h-fit w-fit flex flex-row mx-auto md:mx-0 my-6 rounded-xl max-md:mb-[115px]">
                        <div className="px-6 py-8">
                            <p className="text-base text-[#030712] font-semibold mb-1">Total challenge</p>
                            <p className="text-xs text-[#09090B] font-normal max-w-[135px]">Anda telah mengikuti {challenges?.length || 0} challenge di EcoMate</p>
                        </div>
                        <div className="h-full">
                            <img src={challenge} alt="banner-cashback" className="h-full object-cover object-center" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardContribute;
