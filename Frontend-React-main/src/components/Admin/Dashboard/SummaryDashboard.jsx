import { Calendar, TrendingDown, TrendingUp } from "lucide-react";
import titikKumpul from "../../../assets/svg/admin-icon/titik-kumpul.svg";
import cartIjo from "../../../assets/svg/admin-icon/cart-ijo.svg";
import orang from "../../../assets/svg/admin-icon/orang.svg";
import { formatToIDR } from "../../../utils/function/formatToIdr";
import IndicatorTrending from "./IndicatorTrending";

const SummaryDashboard = ({ data, setFilter, fetchDashboard, filter }) => {
    const formatter = new Intl.NumberFormat("id-ID", { style: "decimal" });

    const handleChange = (e) => {
        setFilter(e.target.value);
        fetchDashboard();
    };

    const filterLabels = {
        weekly: "Mingguan",
        monthly: "Bulanan",
        yearly: "Tahunan",
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] mb-6" style={{ boxShadow: "0px 6px 12px 0px rgba(0, 0, 0, 0.03)" }}>
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h1 className="font-bold text-2xl text-[#24282E]">Ringkasan Keadaan Toko</h1>
                    <p className="text-lg mb-6 mt-2 text-[#737373] font-medium">Berikut merupakan ringkasan keadaan toko Anda saat ini</p>
                </div>

                <div className="relative max-w-[142px] w-full">
                    <select className="select select-bordered w-full pl-8" defaultValue="monthly" onChange={handleChange}>
                        <option disabled>Bulanan</option>
                        <option value="weekly">Mingguan</option>
                        <option value="monthly">Bulanan</option>
                        <option value="yearly">Tahunan</option>
                    </select>
                    <Calendar width={20} className="absolute top-3 left-[6px]" />
                </div>
            </div>

            <div className="flex flex-row justify-between w-full gap-5">
                <div className="flex-[1_50%] py-5 px-6 border border-[#E5E7EB] rounded-xl">
                    <h1 className="font-bold text-[#24282E] text-xl">Total Penjualan</h1>
                    <p className="text-[#727A90] font-semibold text-sm mt-2 mb-3">{filterLabels[filter] || "Tidak Diketahui"}</p>
                    <div className="flex flex-row items-center justify-between">
                        <h3 className="text-3xl font-bold text-[#24282E]">{formatToIDR(data?.total_transactions || 0)}</h3>
                        <img src={titikKumpul} alt="icon-titik-kumpul" />
                    </div>
                    <IndicatorTrending absolute={data?.transaction_change.absolute || 0} percentage={data?.transaction_change.percentage} />
                </div>

                <div className="flex-[1_50%] py-5 px-6 border border-[#E5E7EB] rounded-xl">
                    <h1 className="font-bold text-[#24282E] text-xl">Pesanan</h1>
                    <p className="text-[#727A90] font-semibold text-sm mt-2 mb-3">{filterLabels[filter] || "Tidak Diketahui"}</p>
                    <div className="flex flex-row items-center justify-between">
                        <h3 className="text-3xl font-bold text-[#24282E]">{data?.total_orders || 0}</h3>
                        <img src={cartIjo} alt="icon-titik-kumpul" />
                    </div>
                    <IndicatorTrending absolute={data?.order_change.absolute || 0} percentage={data?.order_change.percentage} />
                </div>

                <div className="flex-[1_50%] py-5 px-6 border border-[#E5E7EB] rounded-xl">
                    <h1 className="font-bold text-[#24282E] text-xl">Pelanggan</h1>
                    <p className="text-[#727A90] font-semibold text-sm mt-2 mb-3">{filterLabels[filter] || "Tidak Diketahui"}</p>
                    <div className="flex flex-row items-center justify-between">
                        <h3 className="text-3xl font-bold text-[#24282E]">{data?.total_customers || 0}</h3>
                        <img src={orang} alt="icon-titik-kumpul" />
                    </div>
                    <IndicatorTrending absolute={data?.customer_change.absolute || 0} percentage={data?.customer_change.percentage} />
                </div>
            </div>
        </div>
    );
};

export default SummaryDashboard;
