import useSideBarStore from "../../stores/useSideBarStore";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
const AdminLayout = ({children, active}) => {
    const { isOpen: sidebarOpen } = useSideBarStore();

    return (
        <div>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => sidebarOpen(!sidebarOpen)} active={active} /> {/* ini aja yg diganti Sesuai yang dikerjain */}
            <div className={`transition-all duration-300 ${sidebarOpen ? "ml-[260px]" : "ml-28"}`}>
                <Header />

                <div className="bg-secondary min-h-screen">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
