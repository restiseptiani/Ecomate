import AdminLayout from "./AdminLayout";
import SummaryDashboard from "../../components/Admin/Dashboard/SummaryDashboard";
import ChartDashboard from "../../components/Admin/Dashboard/ChartDashboard";
import TopCategory from "../../components/Admin/Dashboard/TopCategory";
import LastTransaction from "../../components/Admin/Dashboard/LastTransaction";
import api from "../../services/api";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [filter, setFilter] = useState("monthly");

    const fetchDashboard = async () => {
        try {
            const response = await api.get(`/admin/dashboard?filter=${filter}`);
            setDashboard(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <AdminLayout active="Dashboard">
            <div className="max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-2xl text-[#4B5563]">Dashboard</h1>
                        <p className="text-lg mb-6 mt-2 text-[#737373] font-medium">Halo Admin, berikut merupakan ringkasan keadaan toko Anda saat ini.</p>
                    </div>
                </div>

                {/* Dashboard Atas */}
                <SummaryDashboard data={dashboard} setFilter={setFilter} fetchDashboard={() => fetchDashboard()} filter={filter} />

                {/* Dashboard tengah */}
                <div className="flex flex-row gap-5">
                    <ChartDashboard data={dashboard} filter={filter} />
                    <TopCategory data={dashboard?.top_categories} filter={filter} />
                </div>
                <LastTransaction data={dashboard?.last_transactions} />
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
