
import React from "react";
import { Link } from "react-router";
const Hero = ({ text, button, image, page, link }) => {
    return (
        <div className="bg-secondary pt-24 md:pt-40 ">
            <div className="relative group overflow-hidden rounded-lg max-w-full px-4 md:px-0">
                {/* Background Image */}
                <div className="relative w-full max-w-[1328px] mx-auto">
                    <img
                        src={image}
                        alt="bg-hero"
                        className="w-full h-[494px] sm:h-[500px] md:h-[698px] rounded-[30px] md:rounded-[50px] object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#28282880] bg-opacity-50 rounded-[30px] md:rounded-[50px] flex flex-col items-center justify-center text-center px-4">

                        <h2 className={`text-white text-3xl md:text-[48px] max-w-full ${page === "challenge" ? "md:max-w-[500px]" : "md:max-w-[764px]"} font-bold leading-tight`}>
                            {text}
                        </h2>
                        {page === "challenge" ? (<div className="flex md:flex-row flex-wrap gap-2 justify-center items-center text-[#115E59] mt-8">
                            <p className="font-semibold bg-green-50 px-4 py-1 rounded-3xl border border-green-800">Mudah</p>
                            <p className="font-semibold bg-green-50 px-4 py-1 rounded-3xl border border-green-800">7 Hari</p>
                            <p className="font-semibold bg-green-50 px-4 py-1 rounded-3xl border border-green-800">100 Koin</p>
                            <p className="font-semibold bg-green-50 px-4 py-1 rounded-3xl border border-green-800">200 Exp</p>
                        </div>): ""}
                        
                        <Link to={link} className="text-white bg-[#2E7D32] text-sm sm:text-base md:text-[15px] mt-6 md:mt-10 w-[246px] sm:w-[249px] md:w-[254px] py-5 rounded-xl font-bold hover:bg-[#1B4B1E] transition-colors duration-300">
                            {button}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;