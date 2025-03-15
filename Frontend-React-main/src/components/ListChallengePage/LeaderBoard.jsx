import React, { useState, useEffect } from "react";
import Image from "../../assets/png/bg-mission.png";
import Crown from "../../assets/png/crown.png";
import User from "../../assets/webp/blank.webp";
import Second from "../../assets/png/second.png";
import Third from "../../assets/png/third.png";
const LeaderBoard = ( { leaderboard } ) => {
 
    return (
        <div className="relative h-fit bg-[#37953C] mb-20 md:w-[1280px] py-10 w-[375px] items-center justify-center mx-auto rounded-[48px] overflow-hidden">
            {/* Background Image Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 z-0" 
                style={{ 
                    backgroundImage: `url(${Image})`,
                }}
            ></div>

                <div className="relative z-10">
                <div className="mx-auto rounded-[40px] md:w-[1184px] w-[335px] flex flex-col justify-center items-center">
                    <h1 className="md:text-5xl text-xl font-bold text-white my-10">LeaderBoard</h1>
                    {/* <div className="flex flex-row gap-3 md:gap-10 bg-[#1B4B1E] text-white md:w-[694px] w-[355px] p-5 rounded-[100px]">
                        <a className="w-[99px] md:w-[194px] bg-secondary text-black text-center rounded-[100px] md:py-3 py-2 text-lg md:text-2xl">Hari ini </a>
                        <a className="w-[99px] md:w-[194px] text-center rounded-[100px] md:py-3 py-2 text-lg md:text-2xl">Bulan ini</a>
                        <a className="w-[99px] md:w-[194px] text-center rounded-[100px] md:py-3 py-2 text-lg md:text-2xl">Semua</a>
                    </div> */}
                </div>

                {/* Leaderboard Ranking Layout */}
                <div className="flex justify-center items-center mt-10 space-x-2 md:space-x-10">
                    {/* Second Place - Left */}
                    <div className="flex flex-col items-center transform scale-90">
                        <div className="bg-primary rounded-[16px] md:rounded-[48px] p-2 md:p-6 w-[110px] h-fit md:w-[250px] md:h-[424px] text-center">
                        <div className="flex flex-col justify-center text-center items-center mb-4">
                                <img src={Second} className="w-[24px] h-[24px] md:w-[80px] md:h-[80px] my-2 md:my-5"/>
                                <img src={leaderboard[1].avatar_url || User} className="w-[70px] h-[70px] md:w-[150px] md:h-[150px] object-cover object-top rounded-full"/>
                            </div>
                            <h2 className="text-white text-base md:text-4xl font-bold">{leaderboard[1].exp} EXP</h2>
                            <p className="text-white/80 text-sm md:text-2xl">{leaderboard[1].name}</p>
                        </div>
                        
                    </div>

                    {/* First Place - Center */}
                    <div className="flex flex-col items-center">
                        <div className="bg-[#F4F4D7] rounded-[16px] md:rounded-[48px] p-3 md:p-8 w-[114px] h-fit md:w-[300px] md:h-[538px] text-center">
                            <div className="flex flex-col justify-center text-center items-center mb-4">
                                <img src={Crown} className="w-[24px] h-[24px] md:w-[80px] md:h-[80px] my-2 md:my-5"/>
                                <img src={leaderboard[0].avatar_url || User} className="w-[70px] h-[70px] md:w-[200px] md:h-[200px] object-cover object-top rounded-full"/>
                            </div>
                            <h2 className="text-primary text-base md:text-5xl font-bold my-2 md:my-5">{leaderboard[0].exp} EXP</h2>
                            <p className="text-primary text-sm md:text-3xl">{leaderboard[0].name}</p>
                        </div>
                    </div>

                    {/* Third Place - Right */}
                    <div className="flex flex-col items-center transform scale-90">
                        <div className="bg-primary rounded-[16px] md:rounded-[48px] p-2 md:p-6 w-[110px] h-fit md:w-[250px] md:h-[424px] text-center">
                        <div className="flex flex-col justify-center text-center items-center mb-4">
                                <img src={Third} className="w-[24px] h-[24px] md:w-[80px] md:h-[80px] my-2 md:my-5"/>
                                <img src={leaderboard[2].avatar_url || User} className="w-[70px] h-[70px] md:w-[150px] md:h-[150px] object-cover object-top rounded-full"/>
                            </div>
                            <h2 className="text-white text-base md:text-4xl font-bold">{leaderboard[2].exp} EXP</h2>
                            <p className="text-white/80 text-sm md:text-2xl"> {leaderboard[2].name}</p>
                        </div>
                        
                    </div>
                </div>
                <div className="p-4 md:p-0">
                    <div className="bg-neutral-50 w-full md:w-[1184px] justify-center items-center mx-auto rounded-[40px] p-2 md:p-10 my-10">
                        {leaderboard.slice(3).map((leader, index) => (
                            <div key={index} className="flex flex-row justify-between items-center p-5 w-[323px] md:w-[1088px] h-[80px] md:h-[136px] bg-secondary rounded-[24px] my-5">
                                <div className="flex flex-row items-center text-primary text-base md:text-3xl font-bold">
                                    <h1 className="  md:mr-20 mr-5 ">{index + 4}</h1>
                                    <img src={leaderboard?.avatar_url || User} className="md:w-[88px] md:h-[88px] w-[66px] h-[66px] object-cover object-top rounded-full mx-2 md:mx-10"/>
                                    <h2 className="w-[80px] md:w-[350px]">{leader.name} </h2>
                                    <h1 className="mx-10 md:flex hidden">{leader.totalChallenge} Challenge</h1>
                                    <p className="">{leader.exp} EXP</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Content - needs relative positioning to be above the background */}
            
        </div>
    );
};

export default LeaderBoard;