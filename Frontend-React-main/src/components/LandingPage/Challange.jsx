import React from "react";
import Background from "../../assets/jpg/bg-hero.jpg";
const ChallengeLanding = () => {
    const challenges = [
        {
        title: "Green Commute Challenge",
        description:
            "Tinggalkan kendaraan bermotor selama seminggu! Pilih berjalan kaki, bersepeda, atau naik transportasi umum untuk mengurangi jejak karbonmu.",
        image: Background, // Ganti dengan URL gambar yang sesuai
        link: "/tantangan",
        },
        {
        title: "Energy Saver Challenge",
        description: "Hemat energi listrik selama seminggu!",
        image: Background, // Ganti dengan URL gambar yang sesuai
        link: "/tantangan",
        },
        {
        title: "Plastic Free Week Challenge",
        description: "Kurangi penggunaan plastik selama seminggu!",
        image: Background, // Ganti dengan URL gambar yang sesuai
        link: "/tantangan",
        },
        
    ];

    return (
        <div className="bg-secondary">
            <p className="md:text-lg text-sm text-neutral-800 text-center justify-center font-semibold">Tantangan</p>
            <h1 className="md:text-5xl text-xl text-neutral-800 text-center justify-center font-bold max-w-[838px] mx-auto">Ambil langkah selanjutnya menuju gaya hidup berkelanjutan</h1>
        <div className="container mx-auto px-4 py-8 max-w-screen-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured Challenge (First Card) */}
            <div className="md:row-span-2">
                <div className="bg-white rounded-[40px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-[569px]">
                <div className="p-6 h-full flex flex-col">
                    <img 
                    src={challenges[0].image} 
                    alt={challenges[0].title} 
                    className="w-full max-h-[301px] object-cover rounded-[32px] mb-6"
                    />
                    <div className="px-4 pb-6 flex-grow flex flex-col">
                    <h3 className="text-3xl font-bold text-[#262626] mb-2">{challenges[0].title}</h3>
                    <p className="text-gray-600 text-lg mb-4">{challenges[0].description}</p>
                    <a 
                        href={challenges[0].link} 
                        className="text-primary hover:underline font-bold mt-auto inline-block"
                    >
                        Lihat Selengkapnya
                    </a>
                    </div>
                </div>
                </div>
            </div>

            {/* Other Challenges */}
            <div className="grid grid-cols-1 gap-6 h-[569px]">
                {challenges.slice(1).map((challenge, index) => (
                <div 
                    key={index} 
                    className="bg-white rounded-[40px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex h-[270px]"
                >
                    <div className="w-1/2 p-4 flex items-center justify-center">
                    <img 
                        src={challenge.image} 
                        alt={challenge.title} 
                        className="rounded-3xl object-cover w-full h-[200px]"
                    />
                    </div>
                    <div className="w-1/2 p-4 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 mb-4">{challenge.description}</p>
                    <a 
                        href={challenge.link} 
                        className="text-primary hover:underline font-bold inline-block"
                    >
                        Lihat Selengkapnya
                    </a>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

export default ChallengeLanding;