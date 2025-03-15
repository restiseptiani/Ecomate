import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const Header = ({ onClick, active, onSearchSubmit }) => {
    const [search, setSearch] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const difficultys = ['Mudah', 'Menengah', 'Sulit'];

    const handleSubmit = () => {
        // Kirim data pencarian dan kesulitan ke komponen induk
        onSearchSubmit({
            searchTerm: search,
            difficultyLevel: difficulty
        });
    };

    return (
        <div className="max-w-screen-xl mx-auto px-[25px]">
        <div className="flex flex-col sm:flex-row py-[32px] px-[24px] mb-[24px] justify-between sm:items-center gap-[22px] rounded-[12px] border border-gray-300 bg-zinc-50">
            <p className="text-[24px] sm:text-[36px] font-bold text-center sm:text-left">Temukan tantangan seru</p>
            <div className="flex flex-col sm:flex-row justify-end items-center gap-[16px] sm:gap-[24px]">
            <button onClick={() => onClick('challenge')} 
            className={`w-full sm:w-[182px] h-[66px] rounded-[8px] border-[2px]
                ${active === 'challenge' ? 'bg-[#2E7D32] text-white hover:bg-[#1B4B1E]' : 'border-[#2E7D32]  hover:bg-[#2E7D32] hover:text-white bg-white'}`}
                >Tantangan
            </button>
            <button onClick={() => onClick('leaderboard')} className={`w-full sm:w-[182px] h-[66px]  border-[2px]  rounded-[8px] 
                ${active === 'leaderboard' ? 'bg-[#2E7D32] text-white hover:bg-[#1B4B1E]' : 'border-[#2E7D32]  hover:bg-[#2E7D32] hover:text-white bg-white'}`}
                >Leaderboard
                </button>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row  w-full p-6 justify-center items-end gap-[22px] rounded-[12px] border border-gray-300 bg-zinc-50 mb-20">
            <div className="flex h-[86px] w-full flex-col items-start gap-[10px] flex-[1_0_0]">
            <p className="text-[#262626] text-[16px] font-bold leading-[24px] tracking-[0.08px]">
                Cari
            </p>
            <div
                className="relative w-full"
                >
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                    <Search className="w-4 h-4" />
                    </div>
                        <input
                        className="py-3 ps-10 pe-4 block w-full h-[52px] border border-[#E5E7EB] rounded-[8px] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        type="text"
                        placeholder="Cari tantangan"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                        />
                </div>
                </div>
            </div>

            <div className="flex h-[86px] w-full flex-col items-start gap-[10px] flex-[1_0_0]">
            <p className="text-[#262626] text-[16px] font-bold leading-[24px] tracking-[0.08px]">
                Tingkat Kesulitan
            </p>
            <div className="relative w-full">
                <select 
                    className="py-3 ps-4 pe-10 w-full h-[52px] border border-gray-300 rounded-[8px] text-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500 appearance-none"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                <option value="">Pilih Tingkat Kesulitan</option>
                            {difficultys.map((difficulty) => (
                                <option key={difficulty} value={difficulty}>
                                    {difficulty}
                                </option>
                            ))}
                </select>
                
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            </div>
            <button
            className="bg-[#2E7D32] hover:bg-[#1B4B1E] h-[52px] w-full sm:w-[52px] rounded-[8px] flex items-center justify-center"
            onClick={handleSubmit}
            >
            <Search className="w-4 h-4 text-white" />
            </button>
        </div>
        </div>
    );
}    

export default Header;