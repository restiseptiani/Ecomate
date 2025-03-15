const ContributeTable = ({ challenges }) => {
    return (
        <>
            <div className="max-md:hidden">
                <h1 className="text-xl text-black font-bold px-6 mb-6">Daftar Challenge</h1>
            </div>
            {/* Table */}
            <div className="flex flex-col px-6 max-md:hidden">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            {/* Table */}
                            <table className="w-full divide-y divide-[#2E7D32] rounded-xl">
                                <thead className="bg-[#2E7D32]">
                                    <tr>
                                        <th scope="col" className="ps-6 py-3 text-start"></th>

                                        {["Nama Challenge", "Tanggal Mulai", "Durasi Tantangan", "Hadiah", "Status"].map((title, index) => (
                                            <th scope="col" className={`${index === 0 ? "pe-6" : "px-6"} py-3 text-start`} key={index}>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold uppercase tracking-wide text-white">{title}</span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {challenges && challenges.length > 0 ? (
                                        challenges.map((challenge) => (
                                            <tr key={challenge.id}>
                                                <td className="size-px whitespace-nowrap"></td>

                                                <td className="size-px whitespace-nowrap">
                                                    <div className="py-2">
                                                        <p className="text-sm font-medium text-[#1F2937] cursor-pointer">{challenge.title}</p>
                                                    </div>
                                                </td>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="px-6 py-2">
                                                        <p className="text-sm font-medium text-[#1F2937]">
                                                            {new Date(challenge?.start_date).toLocaleDateString("id-ID", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="px-6 py-2">
                                                        <p className="text-sm font-medium text-[#1F2937]">{challenge?.duration_days}</p>
                                                    </div>
                                                </td>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="px-6 py-2">
                                                        <p className="text-sm font-medium text-[#1F2937]">{challenge?.coin} Coin</p>
                                                    </div>
                                                </td>

                                                <td className="size-px whitespace-nowrap">
                                                    <div className="px-6 py-2">
                                                        <p
                                                            className={`text-sm font-medium w-fit py-1 px-2 rounded-[100px] ${
                                                                challenge.status === "Progress"
                                                                    ? "text-[#019BF4] bg-[#E6F5FE] border-2 border-[#B0E0FC]"
                                                                    : challenge.status === "Failed"
                                                                    ? "text-[#F05D3D] bg-[#feefec] border-2 border-[#FACDC3]"
                                                                    : "text-white bg-[#2E7D32] border-2 border-[#2E7D32]"
                                                            }`}
                                                        >
                                                            {challenge?.status ? challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1) : "Unknown"}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4">
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* End Table */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContributeTable;
