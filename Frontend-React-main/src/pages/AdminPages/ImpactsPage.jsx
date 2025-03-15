import { Link } from "react-router";
import AdminLayout from "./AdminLayout";
import { Plus, Search } from "lucide-react";
import arrow from "../../assets/svg/admin-icon/arrow-right.svg";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { truncateText } from "../../utils/function/truncateText";
import eye from "../../assets/svg/admin-icon/eye.svg";
import pencil from "../../assets/svg/admin-icon/pencil.svg";
import trash from "../../assets/svg/admin-icon/trash.svg";
import ModalImpact from "../../components/Admin/ImpactsPage/ModalImpact";
import ModalDelete from "../../components/Admin/ProductPage/ModalDelete";
import { Toast } from "../../utils/function/toast";

const ImpactsPage = () => {
    const [impacts, setImpacts] = useState(null);
    const [selectedImpact, setSelectedImpact] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchImpacts = async () => {
        try {
            const response = await api.get("/impacts");
            setImpacts(response.data.data[[0]]);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchImpacts();
    }, []);

    const handleModal = () => {
        document.getElementById("my_modal_impact").showModal();
        setSelectedImpact(null);
    };

    // const handleEdit = (impact) => {
    //     document.getElementById("my_modal_impact").showModal();
    //     setSelectedImpact(impact);
    // };

    const handleDelete = async () => {
        try {
            await api.delete(`/impacts/${selectedImpact.id}`);
            Toast.fire({
                icon: "success",
                title: "Sukses hapus data product",
            });
            fetchImpacts();
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Hapus Data Gagal!",
            });
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Menyimpan nilai query pencarian
    };

    const filteredImpacts = impacts?.filter(
        (impact) => impact.name.toLowerCase().includes(searchQuery.toLowerCase()), // Mencocokkan nama kategori dengan query pencarian
    );

    return (
        <AdminLayout active="Kategori Efek">
            <div className="max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-2xl text-[#4B5563] mb-4">Kategori Efek</h1>
                        <p className="text-base mb-8 text-[#4B5563]">
                            <Link to="/admin/dashboard" className="cursor-pointer">
                                Dashboard
                            </Link>
                            <img src={arrow} alt="Arrow Right" className="inline-block w-1 h-3 mx-2 " /> <strong className="cursor-pointer">Kategori Efek</strong>
                        </p>
                    </div>
                    <button className="btn btn-success !text-white bg-[#2E7D32] border border-[#2E7D32]" onClick={handleModal}>
                        <Plus width={16} />
                        Tambah Kategori
                    </button>
                </div>

                {/* Card */}
                <div className="p-3 rounded-lg bg-white border border-[#E5E7EB]">
                    <div className="pb-3">
                        <div className="relative w-[372px]">
                            <input
                                type="text"
                                placeholder="Cari Impact"
                                className="border ps-11 border-gray-300 rounded-lg h-[40px] px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                onChange={handleSearchChange}
                                value={searchQuery}
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <Search className="w-6 h-6 text-gray-400" />
                            </div>
                        </div>
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

                                                {["ID", "Nama Kategori Efek", "Deskripsi", "Aksi"].map((title, index) => (
                                                    <th scope="col" className={`${index === 0 ? "pe-6" : "px-6"} py-3 text-start`} key={index}>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs font-bold uppercase tracking-wide text-[#2E7D32]">{title}</span>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {filteredImpacts && filteredImpacts.length > 0 ? (
                                                filteredImpacts.map((impact, index) => (
                                                    <tr key={index}>
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
                                                                <p className="text-sm font-medium text-[#1F2937] cursor-pointer" title={impact.id}>
                                                                    {truncateText(impact?.id, 5)}
                                                                </p>
                                                            </div>
                                                        </td>

                                                        <td className="size-px whitespace-nowrap">
                                                            <div className="px-6 py-2">
                                                                <p className="text-sm font-medium text-[#1F2937]">{impact?.name}</p>
                                                            </div>
                                                        </td>
                                                        <td className="size-px whitespace-nowrap">
                                                            <div className="px-6 py-2">
                                                                <p className="text-sm font-medium text-[#1F2937]">{impact?.description}</p>
                                                            </div>
                                                        </td>

                                                        <td className="size-px whitespace-nowrap">
                                                            <div className="py-2">
                                                                <div className="flex items-center justify-center gap-x-2">
                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedImpact(impact);
                                                                            document.getElementById("my_modal_impact").showModal();
                                                                        }}
                                                                    >
                                                                        <img src={eye} alt="eye-icon" />
                                                                    </button>
                                                                    {/* <button onClick={() => handleEdit(impact)}>
                                                                        <img src={pencil} alt="pencil-icon" />
                                                                    </button> */}
                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedImpact(impact);
                                                                            document.getElementById("my_modal_3").showModal();
                                                                        }}
                                                                    >
                                                                        <img src={trash} alt="trash-icon" />
                                                                    </button>
                                                                </div>
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
                    <ModalImpact fetchImpact={() => fetchImpacts()} selectedImpact={selectedImpact} setSelectedImpact={setSelectedImpact} />
                    <ModalDelete handleDelete={() => handleDelete(selectedImpact.id)} title="Hapus Kategori Efek" subtitle="Apa kamu yakin ingin menghapus kategori ini?" />
                </div>
                {/* End Card */}
            </div>
        </AdminLayout>
    );
};

export default ImpactsPage;
