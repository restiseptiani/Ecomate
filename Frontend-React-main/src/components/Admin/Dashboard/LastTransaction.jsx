import { Link } from "react-router";
import { truncateText } from "../../../utils/function/truncateText";
import { formatToIDR } from "../../../utils/function/formatToIdr";

const LastTransaction = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] mt-6" style={{ boxShadow: "0px 6px 12px 0px rgba(0, 0, 0, 0.03)" }}>
            <div className="flex flex-row justify-between items-center mb-6">
                <h1 className="font-bold text-[#24282E] text-xl">Lihat Semua</h1>
                <button className="text-base text-[#404040] !border-[#E5E7EB] font-semibold btn btn-outline hover:!bg-[#2E7D32] hover:!border-[#2E7D32]">
                    <Link to="/admin/pesanan">Lihat Semua</Link>
                </button>
            </div>

            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            {/* Table */}
                            <table className="w-full divide-y divide-[#E5E7EB] rounded-xl">
                                <thead className="bg-[#ECF8ED]">
                                    <tr>
                                        <th scope="col" className="ps-6 py-3 text-start">
                                            <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                                                <input
                                                    type="checkbox"
                                                    className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                    id="hs-at-with-checkboxes-main"
                                                />
                                                <span className="sr-only">Checkbox</span>
                                            </label>
                                        </th>

                                        {["Invoice", "Produk", "Tanggal", "Pelanggan", "Total", "Pembayaran", "Status"].map((title, index) => (
                                            <th scope="col" className={`${index === 0 ? "pe-6" : "px-6"} py-3 text-start`} key={index}>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold tracking-wide text-[#2E7D32]">{title}</span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data && data.length > 0 ? (
                                        data.map((transaction) => (
                                            <tr key={transaction.id}>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="ps-6 py-2">
                                                        <label htmlFor="hs-at-with-checkboxes-1" className="flex">
                                                            <input
                                                                type="checkbox"
                                                                className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                                id="hs-at-with-checkboxes-1"
                                                            />
                                                            <span className="sr-only">Checkbox</span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="pe-6 py-2">
                                                        <p className="text-sm font-medium text-[#1F2937] cursor-pointer" title={transaction.id}>
                                                            {truncateText(transaction.id, 5)}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="px-6 py-2 flex flex-col">
                                                        <span className="text-sm font-medium text-[#1F2937] decoration-2 mb-1">{transaction?.products[0]}</span>
                                                        {transaction?.products.length > 1 && (
                                                            <span className="text-xs font-medium text-[#6B7280] decoration-2">+ {transaction?.products.length - 1} Produk lainnya</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="px-6 py-2">
                                                        <span className="text-sm font-medium text-[#1F2937]">
                                                            {new Date(transaction?.transaction_date).toLocaleDateString("id-ID", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="px-6 py-2 flex flex-col">
                                                        <span className="text-sm font-medium text-[#1F2937] decoration-2 mb-1">{transaction?.customer_name}</span>
                                                    </div>
                                                </td>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="px-6 py-2">
                                                        <p className="text-sm font-medium text-[#1F2937]">{formatToIDR(transaction?.total)}</p>
                                                    </div>
                                                </td>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="px-6 py-2">
                                                        <p className="text-sm font-medium text-[#1F2937]">
                                                            {transaction?.payment_method === "bank_transfer" ? "Bank Transfer" : transaction?.payment_method}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="px-6 py-2">
                                                        <p
                                                            className={`text-sm font-medium w-fit py-1 px-2 rounded-[100px] ${
                                                                transaction.status === "pending"
                                                                    ? "text-[#019BF4] bg-[#E6F5FE] border-2 border-[#B0E0FC]"
                                                                    : transaction.status === "expire"
                                                                    ? "text-[#F05D3D] bg-[#feefec] border-2 border-[#FACDC3]"
                                                                    : "text-[#009499] bg-[#e5f4f5] border-2 border-[#B0DEDF]"
                                                            }`}
                                                        >
                                                            {transaction?.status ? transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1) : "Unknown"}
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
        </div>
    );
};

export default LastTransaction;
