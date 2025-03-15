import { Link } from "react-router";

import arrow from "../../assets/svg/arrow-right.svg";

const HeroBanner = ({ currentPage, background }) => {
    return (
        <div className="bg-secondary pt-24 md:pt-40">
            <div className="relative group overflow-hidden rounded-lg max-w-full px-4 min-[775px]:px-5 md:px-4 ">
                {/* Background Image */}
                <div className="relative w-full max-w-[1328px] mx-auto">
                    <img src={background} alt="bg-hero" className="w-full h-[179px] sm:h-[500px] md:h-[289px] rounded-[30px] md:rounded-[50px] object-cover object-center" />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#1F5221B2] bg-opacity-70 rounded-[30px] md:rounded-[50px] flex flex-col items-center justify-center text-center px-4">
                        <div className="flex flex-col justify-center items-center text-[#FAFAFA] ">
                            <h1 className="text-xl md:text-5xl font-bold mb-8">{currentPage}</h1>
                            <p className="text-base">
                                <Link to="/" className="cursor-pointer">
                                    Beranda
                                </Link>
                                <img src={arrow} alt="Arrow Right" className="inline-block w-4 h-4 mx-2" /> <strong className="cursor-pointer">{currentPage}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
