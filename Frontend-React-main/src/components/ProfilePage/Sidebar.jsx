import React, { useState } from "react";
import { User2, Trophy, Award, Dock, HandCoins, ChevronDown } from "lucide-react";
import { Link } from "react-router";

const Sidebar = ({ active }) => {
    const [isOpen, setIsOpen] = useState(false);

    const sidebar = [
        {
            id: 1,
            name: "Profil",
            link: "/profile",
            icon: <User2 />,
        },
        {
            id: 2,
            name: "Kontribusi",
            link: "/profile/kontribusi",
            icon: <Trophy />,
        },
        {
            id: 3,
            name: "Challenge",
            link: "/profile/challenge",
            icon: <Award />,
        },
        {
            id: 4,
            name: "Pesanan",
            link: "/profile/pesanan",
            icon: <Dock />,
        },
        // {
        //     id: 5,
        //     name: "Koin Ecomate",
        //     link: "/profile/ecocoin",
        //     icon: <HandCoins />,
        // },
    ];

    const handleDropDown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            {/* Desktop Links */}
            <div className="hidden md:block sidebar bg-secondary w-[288px] h-[1088px] pt-48 px-7 ">
                {sidebar.map((item) => (
                    <div key={item.id}>
                        <Link
                            to={item.link}
                            className={`" py-3 w-full gap-3 mt-5 rounded-[12px]  text-start flex px-4 text-xl fontbold" ${
                                active === item.name ? "bg-primary text-white" : "text-primary hover:bg-primary hover:text-white"
                            }`}
                        >
                            {item.icon} {item.name}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Mobile Links */}
            <div className="md:hidden">
                <div className="md:block sidebar w-full pt-[6rem] relative">
                    <div className="bg-[#FAFAFA] flex flex-row items-center justify-between px-4 py-3 cursor-pointer" onClick={handleDropDown}>
                        <h1 className="text-primary text-base font-bold">Menu</h1>
                        <ChevronDown color="#2e7d32" />
                    </div>
                    {isOpen && (
                        <div className="absolute left-0 right-0 bg-[#FAFAFA] shadow-lg backdrop-blur-3xl bg-opacity-10 px-6 z-30 pb-7">
                            {sidebar.map((item) => (
                                <div key={item.id}>
                                    <Link
                                        to={item.link}
                                        onClick={() => setIsOpen(false)}
                                        className={`" py-3 w-full gap-3 mt-5 rounded-[12px]  text-start flex px-4 text-xl fontbold" ${
                                            active === item.name ? "bg-primary text-white" : "text-primary hover:bg-primary hover:text-white"
                                        }`}
                                    >
                                        {item.icon} {item.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
