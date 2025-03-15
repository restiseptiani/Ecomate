import { Calendar } from "lucide-react";
import { formatToIDR } from "../../../utils/function/formatToIdr";

const TopCategory = ({ data, filter }) => {
    return (
        <div className="flex-[1_30%] bg-white p-6 rounded-xl border border-[#E5E7EB]" style={{ boxShadow: "0px 6px 12px 0px rgba(0, 0, 0, 0.03)" }}>
            <div className="flex flex-row justify-between pb-3 border-b border-[#E5E7EB]">
                <div>
                    <h1 className="font-bold text-[#24282E] text-xl">Top Kategori</h1>
                    <p className="text-[#727A90] font-semibold text-sm mt-2 mb-3">Berdasarkan Penjualan</p>
                </div>
                <div className="relative max-w-[142px] w-full">
                    <select className="select select-bordered w-full pl-8" value={filter} disabled>
                        <option disabled>Bulanan</option>
                        <option value="weekly">Mingguan</option>
                        <option value="monthly">Bulanan</option>
                        <option value="yearly">Tahunan</option>
                    </select>
                    <Calendar width={20} className="absolute top-3 left-[6px]" />
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#E5E7EB] mt-5">
                <table className="w-full">
                    <thead className="bg-[#ECF8ED] text-left">
                        <tr>
                            <th className="font-xs text-[#2E7D32] font-bold py-4 px-3">Nama Kategori</th>
                            <th className="font-xs text-[#2E7D32] font-bold py-4 px-3">Terjual</th>
                            <th className="font-xs text-[#2E7D32] font-bold py-4 px-3">Penjualan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index} className="bg-white hover:bg-green-50">
                                <td className={`px-4 py-3 text-sm font-medium text-[#1F2937] ${index === data.length - 1 ? "border-b-0" : "border-b border-[#E5E7EB]"}`}>{item.category_name}</td>
                                <td className={`px-4 py-3 text-center text-sm font-medium text-[#1F2937] ${index === data.length - 1 ? "border-b-0" : "border-b border-[#E5E7EB]"}`}>
                                    {item.items_sold}
                                </td>
                                <td className={`px-4 py-3 text-sm font-medium text-[#1F2937] ${index === data.length - 1 ? "border-b-0" : "border-b border-[#E5E7EB]"}`}>
                                    {formatToIDR(item.total_sales)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopCategory;
