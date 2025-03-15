import React, { useEffect, useState } from "react";
import { truncateContent } from "../../hooks/useTruncates";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";
const MyChallenge = ({ myChallenges, searchParams }) => {
    
    const filterByDifficulty = myChallenges?.filter((challenge) => {
        // Pastikan challenge dan searchParams tidak undefined
        if (!challenge || !searchParams) return true;
    
    // Kondisi untuk tingkat kesulitan
    const matchesDifficulty = 
        !searchParams.difficultyLevel || 
        (challenge.difficulty && 
        challenge.difficulty.toLowerCase() === searchParams.difficultyLevel.toLowerCase());
    
    // Kondisi untuk pencarian judul
    const matchesTitle = 
        !searchParams.searchTerm || 
        (challenge.title && 
        challenge.title.toLowerCase().includes(searchParams.searchTerm.toLowerCase()));
    
    // Kembalikan true jika keduanya cocok
    return matchesDifficulty && matchesTitle;
    });

    return (
        <div className="max-w-screen-xl mx-auto px-[25px]">
            <div className="py-[40px]">
                <p className="text-[36px] font-bold text-xl sm:text-4xl mb-[13px]">Tantangan saya ({filterByDifficulty?.length || 0})</p>
                {filterByDifficulty?.length > 0 ? (
                    <Swiper
                    spaceBetween={32}
                    slidesPerView={1}
                    grabCursor={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 2.2,
                            spaceBetween: 32,
                        },
                    }}
                    className="challenges-swiper"
                >
                    {filterByDifficulty?.map((challenge) => (
                        <SwiperSlide key={challenge.challenge_id}>
                            <div className="flex flex-col justify-between w-full min-h-[584px] p-4 md:p-6 rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA]">
                                <div>
                                    <div className="w-full h-[251px] bg-lightgray bg-cover bg-center overflow-hidden rounded-lg">
                                        <img className="w-full h-full object-cover" src={challenge.challenge_img || "/placeholder.png"} alt={challenge.title || "Challenge Image"} />
                                    </div>

                                    <div>
                                        <h3 className="text-neutral-800 text-xl font-bold tracking-tight pt-[16px] h-[100px]">{challenge.title || "Tantangan Tanpa Judul"}</h3>
                                        <p className="text-justify text-neutral-800 text-base font-normal leading-normal tracking-tight">{truncateContent(challenge.description, 150) || "Deskripsi belum tersedia."}</p>
                                    </div>
                                </div>

                                {/* Progress */}
                                {challenge.status === "Done" ? (
                                    <div className="w-full mt-auto py-[32px]">
                                    <div className="flex justify-between items-center mb-2 text-xl font-semibold text-black">
                                        <p>Selesai</p>
                                        <p>100%</p>
                                    </div>

                                    <div
                                        className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={100}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="flex flex-col justify-center rounded-full overflow-hidden bg-[#57C15D] text-xs text-white text-center whitespace-nowrap transition duration-500"
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                                ): (
                                <div className="w-full mt-auto py-[32px]">
                                    <div className="flex justify-between items-center mb-2 text-xl font-semibold text-black">
                                        <p>Day  1</p>
                                        <p>0%</p>
                                    </div>

                                    <div
                                        className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={challenge.progress || 0}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="flex flex-col justify-center rounded-full overflow-hidden bg-[#57C15D] text-xs text-white text-center whitespace-nowrap transition duration-500"
                                            style={{ width: `${challenge.progress || 0}%` }}
                                        />
                                    </div>
                                </div>
                                )}
                                

                                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mt-4">
                                    <div className="flex items-center gap-2 flex-wrap w-full">
                                        <div className="flex items-center justify-center px-4 py-2 bg-[#F0FDF4] border-[1px] border-[#166534] text-[#115E59] rounded-full text-[15px] font-semibold">
                                            {challenge.difficulty || "No"}
                                        </div>
                                        <div className="flex items-center justify-center px-4 py-2 bg-[#F0FDF4] border-[1px] border-[#166534] text-[#115E59] rounded-full text-[15px] font-semibold">
                                            {challenge.duration_days || 0} hari
                                        </div>
                                        <div className="flex items-center justify-center px-4 py-2 bg-[#F0FDF4] border-[1px] border-[#166534] text-[#115E59] rounded-full text-[15px] font-semibold">
                                            {challenge.coin || 0} koin
                                        </div>
                                    </div>
                                    <Link

                                        className="w-full sm:w-auto h-[50px] py-[13px] px-4 inline-flex justify-center sm:justify-end items-center gap-x-2 text-[16px] font-normal rounded-xl border border-transparent bg-[#2E7D32] text-white hover:bg-[#1B4B1E] focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                        to={`/detail-tantangan/${challenge.id}/day`}
                                    >
                                        {challenge.status === "Done" ? (
                                            "Selesai") : (
                                            "Selengkapnya"
                                            )}
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                ) : (
                    <div className="w-full h-[584px] flex justify-center items-center">
                        <p className="text-3xl font-bold text-neutral-800">Tidak ada tantangan aktif</p>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default MyChallenge;
