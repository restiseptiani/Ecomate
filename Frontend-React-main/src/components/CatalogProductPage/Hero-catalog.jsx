
import React from "react";
import Background from "../../assets/jpg/bg-catalog.jpg";
import { ChevronRight } from "lucide-react";
const Hero = () => {
    return (
        <div className="bg-secondary pt-24 md:pt-40">
            <div className="relative group overflow-hidden rounded-lg max-w-full px-4 md:px-0">
                {/* Background Image */}
                <div className="relative w-full max-w-[1328px] mx-auto">
                    <img
                        src={Background}
                        alt="bg-hero"
                        className="w-full h-[179px] sm:h-[500px] md:h-[289px] rounded-[30px] md:rounded-[50px] object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#1F5221B2] bg-opacity-70 rounded-[30px] md:rounded-[50px] flex flex-col items-center justify-center text-center px-4">
                        <div className="flex flex-col justify-center items-center text-[#FAFAFA] ">
                            <h1 className="text-xl md:text-5xl font-bold">Belanja</h1>
                            <p className="text-base md:text-xl my-5">Belanja dengan Bijak, Selamatkan Bumi Bersama Kami!</p>
                            <p className="text-base"><a href="/">Beranda</a> <ChevronRight className="inline-block w-4 h-4 mx-2" /> Belanja</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;