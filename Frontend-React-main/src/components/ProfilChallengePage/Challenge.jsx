import React,{ useState } from "react";
import {  ChevronDown, Coins  } from "lucide-react";
import Coin from "../../assets/svg/Coin.svg";
import { useNavigate } from "react-router";

const Challenge = ({ challenges }) => {
    const [activeTab, setActiveTab] = useState("Semua Challenge");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const tabContent = {
        "Semua Challenge": "Semua Challenge",
        "Progress": "Progress",
        "Done": "Done",
        
    }

    const handleNavigate = (challengeId) => {
        navigate(`/detail-tantangan/${challengeId}/day`);
    }
    const handleDropDown = () => {
        setIsOpen(!isOpen);
    };
    const filteredChallenges =
        activeTab === "Semua Challenge"
            ? challenges
            : challenges.filter((challenge) => challenge.status === tabContent[activeTab]);
    console.log(challenges)
    return (
        <div className="md:bg-primary md:mt-20 md:w-[1152px] md:h-[327px] mobileNormal:w-full mobileNormal:h-full relative">
        {(!challenges || challenges.length === 0) ? (
            // Jika challenges tidak ada atau kosong, tampilkan pesan ini
            <div className="hidden md:block bg-white h-[200px] md:w-[1000px] rounded-xl max-mobilelg:mb-[111px] mx-auto overflow-hidden mt-40 p-10">
                Belum ada challenge yang tersedia.
            </div>
        ) : (
            <div className="flex md:flex-row mobileNormal:flex-col px-4 md:px-10 pt-40 gap-10">
                <div className="hidden md:block bg-white h-[800px] md:w-[1000px] rounded-xl max-mobilelg:mb-[111px] mx-auto overflow-hidden">
                    <nav>
                        <ul className="flex md:flex-row max-mobilelg:flex-col justify-between mx-8 text-lg p-4">
                            {Object.keys(tabContent).map((tab) => (
                                <li
                                    key={tab}
                                    className={`font-bold cursor-pointer ${
                                        activeTab === tab
                                            ? "text-primary border-b-2 border-primary"
                                            : "text-gray-500 hover:text-primary"
                                    }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </li>
                            ))}
                        </ul>
                        <hr />
                    </nav>
                    {/* Kontainer dengan scroll */}
                    <div className="overflow-y-auto h-[calc(800px-64px)] px-4">
                        {/* Jika tidak ada challenge yang sesuai */}
                        {filteredChallenges.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                Tidak ada challenge yang tersedia.
                            </div>
                        ) : (
                            // Jika ada challenge yang sesuai
                            filteredChallenges.map((challenge) => (
                                <div
                                    key={challenge.id} // Pastikan setiap elemen memiliki key unik
                                    className="border border-gray-300 h-[251px] w-[967px] mx-auto mt-5 rounded-xl"
                                >
                                    <div className="p-10">
                                        <div className="flex flex-row w-full ">
                                            <div className="p-6 pl-0">
                                                <img
                                                    src={challenge.challenge_img}
                                                    alt="challenge"
                                                    className="w-[86px] h-[86px] rounded-xl"
                                                />
                                            </div>
                                            <div>
                                                <h1 className="font-bold text-xl">{challenge.title}</h1>
                                                <div className="flex flex-row mt-2">
                                                    {challenge.status === "Done" ? (
                                                        <p className="text-white bg-primary px-4 py-2 rounded-lg">
                                                            Selesai
                                                        </p>
                                                    ) : (
                                                        <p className="text-primary bg-white border border-primary px-4 w-fit py-2 rounded-lg">
                                                            Belum Selesai
                                                        </p>
                                                    )}
                                                    <p className="flex flex-row text-sm font-normal border-primary border px-2 items-center rounded-lg bg-white ml-5">
                                                        <img
                                                            src={Coin}
                                                            alt="coin"
                                                            className="mr-2 w-[14px] h-[14px]"
                                                        />{" "}
                                                        {challenge.coin} Koin
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full ">
                                            <button onClick={() => handleNavigate(challenge.id)} className="w-full bg-primary text-white py-4 rounded-md">
                                                Lihat Detail Challenge
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="md:hidden bg-white h-fit md:w-[624px] rounded-xl max-md:mb-[111px]">
                    <div className="h-7">
                        <div className="bg-primary flex flex-row items-center justify-between px-4 py-3 rounded-t-xl cursor-pointer" onClick={handleDropDown}>
                            <h1 className="text-[#FAFAFA] text-base font-bold">{activeTab}</h1>
                            <ChevronDown color="#FAFAFA" />
                        </div>
                        {isOpen && (
                            <nav className="relative">
                                <ul className="text-center absolute left-0 right-0 shadow-lg bg-secondary backdrop-blur-sm bg-opacity-10 rounded-xl pt-4">
                                    {Object.keys(tabContent).map((tab) => (
                                        <li
                                            key={tab}
                                            className={`font-bold cursor-pointer ${
                                                activeTab === tab
                                                    ? "text-primary border-b-2 border-primary"
                                                    : "text-gray-500 hover:text-primary"
                                            }`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>
                    <div className="p-4">
                        
                        {filteredChallenges.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                Tidak ada challenge yang tersedia.
                            </div>
                        ) : (
                            // Jika ada challenge yang sesuai
                            filteredChallenges.map((challenge) => (
                                <div
                                    key={challenge.id} // Pastikan setiap elemen memiliki key unik
                                    className="border border-gray-300 h-[342px] w-[318px] mx-auto mt-5 rounded-xl"
                                >
                                    <div className="p-2">
                                        <div className="flex flex-row w-full ">
                                            <div className="w-1/2 p-6">
                                                <img
                                                    src={challenge.challenge_img}
                                                    alt="challenge"
                                                    className="w-[86px] h-[86px] rounded-xl"
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <h1 className="font-bold text-xl">{challenge.title}</h1>
                                                <div className="flex flex-col mt-2">
                                                    {challenge.status === "Done" ? (
                                                        <p className="text-white bg-primary px-4 py-2 rounded-lg">
                                                            Selesai
                                                        </p>
                                                    ) : (
                                                        <p className="text-primary bg-white border border-primary px-4 w-fit py-2 rounded-lg">
                                                            Belum Selesai
                                                        </p>
                                                    )}
                                                    <p className="flex flex-row text-sm font-normal border-primary border py-2 w-fit px-4 mt-5 items-center rounded-lg bg-white ">
                                                        <img
                                                            src={Coin}
                                                            alt="coin"
                                                            className="mr-2 w-[14px] h-[14px]"
                                                        />{" "}
                                                        {challenge.coin} Koin
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full mt-10">
                                            <button onClick={() => handleNavigate(challenge.id)} className="w-full bg-primary text-white py-4 rounded-md">
                                                Lihat Detail Challenge
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        
                    </div>
                </div>
            </div>
        )}
    </div>
    );
};

export default Challenge;