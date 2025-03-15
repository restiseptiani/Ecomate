import Logo from "../../assets/webp/Logo.webp";
import Polygon1 from "../../assets/svg/triangle/Polygon1.png";
import Polygon3 from "../../assets/svg/triangle/polygon3.svg";
import Polygon4 from "../../assets/svg/triangle/polygon4.png";
import Bubble from "../../assets/svg/triangle/bubble.png";

const WelcomeSection = ({title}) => {
    return (
        <div className="tablet:flex-[1_43%] mobile:flex-none w-full relative h-full mobile:pb-[18px] tablet:pb-0">
            <div className="max-w-[657px] mx-auto tablet:px-10 tablet:py-[50px] mobile:px-6 mobile:py-7 tablet:h-screen mobile:h-full">
                {/* Logo */}
                <div className="flex flex-row items-center tablet:gap-3 mobile:gap-1 z-50 cursor-pointer">
                    <img src={Logo} width={48} height={48} className="mobile:w-6 mobilelg:w-9 tablet:w-12" alt="EcoMate-Logo" />
                    <h1 className="font-bold tablet:text-[26px] text-white mobilelg:text-[22px] mobile:text-base">EcoMate</h1>
                </div>
                {/* Content */}
                <div className="tablet:w-[365px] mx-auto flex flex-col items-center justify-center tablet:h-[80%] mobile:pt-12 mobilelg:max-w-[450px] mobile:max-w-[250px]">
                    <h1 className="font-semibold tablet:text-[48px] mobilelg:text-[34px] mobile:text-[24px] text-center text-white mobile:leading-[32px] tablet:leading-[48px] tablet:mb-[36px] mobilelg:mb-[26px] mobile:mb-[18px] z-10">
                        {title}
                    </h1>
                    <p className="text-center text-white tablet:text-lg mobilelg:text-base mobile:text-sm font-normal leading-[28px] z-10">
                        Mulai langkah hijau Anda untuk kehidupan yang lebih berkelanjutan dan bermakna!
                    </p>
                </div>
            </div>
            {/* Polygon Shape */}
            <div>
                <img src={Polygon3} className="absolute tablet:top-0 tablet:rotate-0 right-[35%] mobile:rotate-[-10deg] mobile:top-[-10px]" />
                <img src={Polygon1} className="absolute right-14 tablet:top-[15%] tablet:bottom-auto tablet:w-[57px] mobile:bottom-7 mobile:w-[38px]" />
                <img src={Polygon1} className="absolute bottom-[10%] tablet:right-[25%] md:block" />
                <img
                    src={Bubble}
                    className="absolute tablet:bottom-0 tablet:top-auto tablet:rotate-0 tablet:right-auto tablet:w-[180px] mobile:rotate-180 mobile:top-0 mobile:right-0 mobile:w-[100px]"
                />
                <img src={Polygon4} className="absolute bottom-0 left-[50%] xl:left-[45%] md:left-[52%] tablet:block mobile:hidden" />
            </div>
        </div>
    );
};

export default WelcomeSection;
