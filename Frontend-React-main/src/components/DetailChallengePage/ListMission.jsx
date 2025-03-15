import React from "react";
import Image from "../../assets/png/bg-mission.png";

const ListMission = ({ data }) => {
    return (
        <div className="relative h-fit bg-[#37953C] mb-20 md:w-[1280px] py-10 w-[375px] items-center justify-center mx-auto rounded-[48px] overflow-hidden">
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
                style={{
                    backgroundImage: `url(${Image})`,
                }}
            ></div>

            {/* Content - needs relative positioning to be above the background */}
            <div className="relative z-10">
                <div className="mx-auto rounded-[40px] md:w-[1184px] w-[335px] flex flex-col justify-center items-center">
                    <h1 className="md:text-4xl text-xl font-bold text-white my-10">{data.Title}</h1>
                    <p className="md:text-xl text-center text-base font-semibold text-primary bg-neutral-50 p-10 shadow-xl md:w-[1184px] w-[335px] rounded-[40px]">{data.Description}</p>
                </div>
                <div className="w-[375px] md:w-[1280px] mx-auto rounded-[40px] flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold my-10 text-white">Daftar Misi</h1>
                    <div className="flex flex-wrap gap-6 items-center mx-auto justify-center mb-10">
                        {data.Tasks.map((mission, index) => (
                            <div
                                key={mission.ID}
                                className={`bg-neutral-50 md:rounded-[40px] rounded-[20px] md:w-[576px] w-[335px] md:min-h-[100px] md:h-fit h-fit shadow-md p-6 transform transition-all
                                    ${data.Tasks.length % 2 !== 0 && index === data.Tasks.length - 1 ? "" : ""}`}
                            >
                                <div className="flex items-center">
                                    <span className="md:text-lg text-base mx-auto text-center font-semibold text-primary">
                                        Hari ke {index + 1}: {mission.TaskDescription}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListMission;
