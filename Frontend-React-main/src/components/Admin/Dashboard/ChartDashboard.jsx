import { Calendar, TrendingUp } from "lucide-react";
import CurvedAreaChart from "./Charts";

const ChartDashboard = ({ data, filter }) => {
    const formatter = new Intl.NumberFormat("id-ID", { style: "decimal" });
    return (
        <div className="flex-[1_70%] bg-white p-6 rounded-xl border border-[#E5E7EB]" style={{ boxShadow: "0px 6px 12px 0px rgba(0, 0, 0, 0.03)" }}>
            <div className="flex flex-row items-start justify-between">
                {/* Section row 1 */}
                <div>
                    <h2 className="text-base text-[#404040] font-semibold">Total Penjualan</h2>
                    <h3 className="text-3xl font-bold text-[#24282E] flex flex-row gap-2 items-center mt-4 mb-2">
                        {formatter.format(data?.total_transactions || 0)} <TrendingUp width={24} color="#2E7D32" />
                    </h3>
                    <p className="text-base text-[#2E7D32]">{data?.transaction_change.percentage || 0}% lebih banyak dari 30 hari sebelumnya</p>
                </div>
                {/* Section row 2 */}

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
            <CurvedAreaChart dashboard={data} />
        </div>
    );
};

export default ChartDashboard;
