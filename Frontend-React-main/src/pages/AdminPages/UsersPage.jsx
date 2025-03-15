import React, { useState, useEffect } from "react";
import useSideBarStore from "../../stores/useSideBarStore";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import api from "../../services/api";
import eye from "../../assets/svg/admin-icon/eye.svg";
import pencil from "../../assets/svg/admin-icon/pencil.svg";
import trash from "../../assets/svg/admin-icon/trash.svg";
import arrowUpDown from "../../assets/svg/admin-icon/arrows-up-down.svg";
import arrow from "../../assets/svg/admin-icon/arrow-right.svg";
import { Toast } from "../../utils/function/toast";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router";
import ModalDelete from "../../components/Admin/UsersPage/ModalDelete";
import ModalView from "../../components/Admin/UsersPage/ModalView";
import ModalEdit from "../../components/Admin/UsersPage/ModalEdit";
import userBg from "../../assets/webp/blank.webp";

const Users = () => {
    const { isOpen: sidebarOpen } = useSideBarStore();
    const [selectedPage, setSelectedPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [metadata, setMetadata] = useState({});
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await api.get(`/admin/users?page=${selectedPage}`);
            setUsers(response.data.data);
            setMetadata(response.data.metadata);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    const pages = Array.from({ length: metadata.total_page }, (_, index) => index + 1);

    const handlePageChange = (e) => {
        setSelectedPage(Number(e.target.value));
    };

    const handlePrevPage = () => {
        if (selectedPage > 1) {
            setSelectedPage(selectedPage - 1);
        }
    };

    const handleNextPage = () => {
        if (selectedPage < metadata.total_page) {
            setSelectedPage(selectedPage + 1);
        }
    };
    const handleShowModal = (user) => {
        setSelectedUsers(user);
        document.getElementById("my_modal_22").showModal();
    };
    const handleShowModalEdit = (data) => {
        setSelectedUsers(data);
        document.getElementById("my_modal_24").showModal();
    };

    const handleDelete = async (data) => {
        try {
            await api.delete(`/admin/users/${data}`);
            Toast.fire({
                icon: "success",
                title: "Sukses hapus data pengguna",
            });
            window.location.reload();
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Hapus Data Gagal!",
            });
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [selectedPage]);

    console.log(metadata);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Menyimpan nilai query pencarian
    };

    const filteredUser = users?.filter(
        (user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()), // Mencocokkan nama kategori dengan query pencarian
    );

    return (
        <div>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => sidebarOpen(!sidebarOpen)} active="Pengguna" /> {/* ini aja yg diganti Sesuai yang dikerjain */}
            <div className={`transition-all duration-300 ${sidebarOpen ? "ml-[260px]" : "ml-28"}`}>
                <Header />

                <div className="bg-secondary min-h-screen">
                    <div className="max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="font-bold text-2xl text-[#4B5563] mb-4">Pengguna</h1>
                                <p className="text-base mb-8 text-[#4B5563]">
                                    <Link to="/admin/dashboard" className="cursor-pointer">
                                        Dashboard
                                    </Link>
                                    <img src={arrow} alt="Arrow Right" className="inline-block w-1 h-3 mx-2 " /> <strong className="cursor-pointer">Pengguna</strong>
                                </p>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="p-3 rounded-lg bg-white border border-[#E5E7EB]">
                            <div className="pb-3">
                                <div className="relative w-[372px]">
                                    <input
                                        type="text"
                                        placeholder="Cari Pengguna"
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

                                                        {["Nama Pengguna", "No Telepon", "Alamat", "Ditambahkan", "Aksi"].map((title, index) => (
                                                            <th scope="col" className={`${index === 0 ? "pe-6" : "px-6"} py-3 text-start`} key={index}>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-xs font-bold uppercase tracking-wide text-[#2E7D32]">{title}</span>
                                                                    {index < 4 && (
                                                                        <button>
                                                                            <img src={arrowUpDown} alt="arrow-filter-icon" />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {filteredUser && filteredUser.length > 0 ? (
                                                        filteredUser.map((user) => (
                                                            <tr key={user.id}>
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
                                                                    <div className="px-6 py-2 flex items-center gap-x-2">
                                                                        <img
                                                                            className="inline-block size-[38px] rounded-full w-6 h-6 object-cover"
                                                                            src={user.avatar_url ? user.avatar_url : userBg}
                                                                            alt="Avatar"
                                                                        />
                                                                        <span className="text-sm font-medium text-[#1F2937] decoration-2">{user.name}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="size-px whitespace-nowrap">
                                                                    <div className="px-6 py-2">
                                                                        <span className="text-sm font-medium text-[#1F2937]">{user.phone}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="size-px whitespace-nowrap">
                                                                    <div className="px-6 py-2">
                                                                        <p className="text-sm font-medium text-[#1F2937]">{user.address}</p>
                                                                    </div>
                                                                </td>
                                                                <td className="size-px whitespace-nowrap">
                                                                    <div className="px-6 py-2">
                                                                        <p className="text-sm font-medium text-[#1F2937]">{user.created_at}</p>
                                                                    </div>
                                                                </td>
                                                                <td className="size-px whitespace-nowrap">
                                                                    <div className="py-2">
                                                                        <div className="flex items-center gap-x-2">
                                                                            <button>
                                                                                <img
                                                                                    src={eye}
                                                                                    alt="eye-icon"
                                                                                    onClick={() => {
                                                                                        handleShowModal(user);
                                                                                    }}
                                                                                />
                                                                            </button>
                                                                            <button>
                                                                                <img src={pencil} alt="pencil-icon" onClick={() => handleShowModalEdit(user)} />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    document.getElementById("my_modal_23").showModal();
                                                                                    setSelectedUsers(user.id);
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
                            <ModalDelete handleDelete={() => handleDelete(selectedUsers)} />
                            <ModalEdit selectedUser={selectedUsers} />
                            <ModalView selectedUser={selectedUsers} />
                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center">
                                <div className="max-w-sm space-y-3">
                                    <select
                                        value={selectedPage}
                                        onChange={handlePageChange}
                                        className="py-2 px-3 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        {pages.map((page) => (
                                            <option value={page} key={page}>
                                                {page}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <div className="inline-flex gap-x-2">
                                        <button
                                            type="button"
                                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={handlePrevPage}
                                            disabled={selectedPage === 1}
                                        >
                                            <svg
                                                className="shrink-0 size-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m15 18-6-6 6-6" />
                                            </svg>
                                            Prev
                                        </button>
                                        <button
                                            type="button"
                                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={handleNextPage}
                                            disabled={selectedPage === metadata.total_page}
                                        >
                                            Next
                                            <svg
                                                className="shrink-0 size-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Card */}
                    </div>
                    {/* End Table Section */}
                </div>
            </div>
        </div>
    );
};

export default Users;
