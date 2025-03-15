import React from "react";


const Participants = ({ data }) => {
    return (
        <div>
            <div className="bg-primary w-[375px] justify-between md:w-[1280px] md:h-[279px] mx-auto rounded-[40px] my-32 flex md:flex-row flex-col text-white">
                <div className="flex-col p-20">
                    <h1 className="text-5xl font-bold text-center ">{data?.ActionCount || 0}</h1>

                    <p className="text-3xl semo-bold text-center mt-8">Aksi</p>
                </div>
                <hr className="w-[50%] bg-white flex md:hidden mx-auto" />
                <div className="h-[60%] w-[2px] bg-white mt-16 md:flex hidden"></div>
                <div className="flex-col p-20">

                    <h1 className="text-5xl font-bold text-center">{data?.ParticipantCount || 0}</h1>

                    <p className="text-3xl semo-bold text-center mt-8">Partisipan</p>
                </div>
                <hr className="w-[50%] bg-white flex md:hidden mx-auto" />
                <div className="h-[60%] w-[2px] bg-white mt-16 md:flex hidden"></div>
                <div className="flex-col p-20">

                    <h1 className="text-5xl font-bold text-center">{data?.Coin || 0}</h1>

                    <p className="text-3xl semo-bold text-center mt-8">Total Koin</p>
                </div>
                <hr className="w-[50%] bg-white flex md:hidden mx-auto" />
                <div className="h-[60%] w-[2px] bg-white mt-16 md:flex hidden"></div>
                <div className="flex-col p-20">
                    <h1 className="text-5xl font-bold text-center">{data?.Exp}</h1>
                    <p className="text-3xl semo-bold text-center mt-8">Exp</p>
                </div>
            </div>
        </div>
    );
};

export default Participants;
