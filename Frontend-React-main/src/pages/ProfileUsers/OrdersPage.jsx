import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/ProfilePage/Sidebar";
import StickyCtaButton from "../../components/StickyCtaButton";
import CardOrder from "../../components/OrdersPage/CardOrder";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { ChevronDown } from "lucide-react";

const OrdersPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [transactions, setTransactions] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await api.get("/transactions");
            setTransactions(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const statusMapping = {
        pending: "Belum Dibayar",
        cancel: "Dibatalkan",
        expired: "Dibatalkan",
        settlement: "Dikirim",
        deny: "Dibatalkan",
    };

    // Filter transaksi berdasarkan status aktif
    const filteredTransactions = transactions.filter((transaction) => {
        const mappedStatus = statusMapping[transaction.status] || "Semua"; // Map status API ke UI
        if (activeFilter === "Semua") return true; // Jika filter 'Semua', tampilkan semua transaksi
        return mappedStatus === activeFilter; // Hanya tampilkan transaksi dengan status yang sesuai
    });

    return (
        <div className="bg-secondary">
            <Navbar />
            <div className="h-auto max-w-[1328px] mx-auto bg-secondary">
                <div className="flex md:flex-row mobileNormal:flex-col">
                    <Sidebar active="Pesanan" />
                    <div className="md:mt-20 md:w-[1152px] mobileNormal:w-full mobileNormal:h-full relative">
                        <div className="w-full h-[21rem] bg-[#2E7D32] absolute text-[#2E7D32] z-[1]">hello</div>
                        <div className="pt-40 z-10 relative">
                            <div className="bg-white mx-6 md:mx-14 rounded-xl mb-10">
                                {/* Desktop Header */}
                                <div className="max-md:hidden p-4 border-b border-[#BEBEBE] flex flex-row items-center ">
                                    <ul className="flex md:flex-row max-md:flex-col justify-between text-lg w-full text-center gap-y-5">
                                        {["Semua", "Belum Dibayar", "Dikirim", "Selesai", "Dibatalkan"].map((status) => (
                                            <li
                                                key={status}
                                                className={`cursor-pointer text-[#2E7D32] ${activeFilter === status ? "font-bold" : ""}`}
                                                onClick={() => setActiveFilter(status)} // Ganti status aktif saat diklik
                                            >
                                                {status}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Mobile Header */}

                                <div>
                                    <div className="md:hidden p-4 border-b border-[#BEBEBE] flex flex-row items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                                        <h1 className="text-[#2E7D32] text-base font-bold">{activeFilter}</h1>
                                        <ChevronDown width={14} color="#2E7D32" />
                                    </div>
                                    {isOpen && (
                                        <nav className="relative w-full">
                                            <ul className="flex md:flex-row max-md:flex-col justify-between text-lg w-full text-center absolute top-0 left-0 right-0 bg-white rounded-xl">
                                                {["Semua", "Belum Dibayar", "Dikirim", "Selesai", "Dibatalkan"].map((status) => (
                                                    <li
                                                        key={status}
                                                        className={`font-bold cursor-pointer mx-5 ${
                                                            activeFilter === status ? "bg-primary text-white rounded-lg py-2 mt-2" : "text-gray-500 hover:text-primary py-4"
                                                        }`}
                                                        onClick={() => {
                                                            setActiveFilter(status);
                                                            setIsOpen(false);
                                                        }} // Ganti status aktif saat diklik
                                                    >
                                                        {status}
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    )}
                                </div>

                                <div className="p-8">
                                    {/* Card */}
                                    <CardOrder orders={filteredTransactions} fetchOrders={() => fetchOrders()} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <StickyCtaButton />
        </div>
    );
};

export default OrdersPage;
