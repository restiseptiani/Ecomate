import { Plus, Search } from "lucide-react";
import AdminLayout from "./AdminLayout";
import arrow from "../../assets/svg/admin-icon/arrow-right.svg";
import arrowUpDown from "../../assets/svg/admin-icon/arrows-up-down.svg";
import eye from "../../assets/svg/admin-icon/eye.svg";
import pencil from "../../assets/svg/admin-icon/pencil.svg";
import trash from "../../assets/svg/admin-icon/trash.svg";
import { Link } from "react-router";
import { truncateText } from "../../utils/function/truncateText";
import { useEffect, useState } from "react";
import api from "../../services/api";
import ModalChallenges from "../../components/Admin/Challenges/ModalChallenges";
import ModalViewChallenges from "../../components/Admin/Challenges/ModalViewChallenges";
import ModalDelete from "../../components/Admin/ProductPage/ModalDelete";
import { Toast } from "../../utils/function/toast";
import ModalTask from "../../components/Admin/Challenges/ModalTask";
import ModalEditChallenges from "../../components/Admin/Challenges/ModalEditChallenges";

const ChallengePage = () => {
    const [challenges, setChallenges] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [deleteChallenge, setDeleteChallenge] = useState(null);
    const [selectedPage, setSelectedPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchChallenges = async () => {
        try {
            const response = await api.get("/admin/challenges");
            setChallenges(response.data.data);
            setMetadata(response.data.metadata);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchChallenges();
    }, []);

    const handleShowChallenge = (data) => {
        document.getElementById("my_modal_11").showModal();
        setSelectedChallenge(data);
    };

    const handleDelete = async () => {
        console.log(deleteChallenge);
        try {
            await api.delete(`/admin/challenges/${deleteChallenge}`);
            Toast.fire({
                icon: "success",
                title: "Sukses hapus data product",
            });
            fetchChallenges();
        } catch (error) {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: "Hapus Data Gagal!",
            });
        }
    };

    const pages = Array.from({ length: metadata?.TotalPage }, (_, index) => index + 1);

    const handlePageChange = (e) => {
        setSelectedPage(Number(e.target.value));
    };

    const handlePrevPage = () => {
        if (selectedPage > 1) {
            setSelectedPage(selectedPage - 1);
        }
    };

    const handleNextPage = () => {
        if (selectedPage < metadata.TotalPage) {
            setSelectedPage(selectedPage + 1);
        }
    };

    const handleEdit = (challenge) => {
        setSelectedChallenge(challenge);
        document.getElementById("my_modal_14").showModal();
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Menyimpan nilai query pencarian
    };

    const filteredChallenges = challenges?.filter(
        (impact) => impact.title.toLowerCase().includes(searchQuery.toLowerCase()), // Mencocokkan nama kategori dengan query pencarian
    );

    return (
        <AdminLayout active="Tantangan">
            <div className="max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-2xl text-[#4B5563] mb-4">Tantangan</h1>
                        <p className="text-base mb-8 text-[#4B5563]">
                            <Link to="/admin/dashboard" className="cursor-pointer">
                                Dashboard
                            </Link>
                            <img src={arrow} alt="Arrow Right" className="inline-block w-1 h-3 mx-2 " /> <strong className="cursor-pointer">Tantangan</strong>
                        </p>
                    </div>
                    <button className="btn btn-success !text-white bg-[#2E7D32] border border-[#2E7D32]" onClick={() => document.getElementById("my_modal_10").showModal()}>
                        <Plus width={16} />
                        Tambah Tantangan
                    </button>
                </div>
                <ModalChallenges />
                {/* Card */}
                <div className="p-3 rounded-lg bg-white border border-[#E5E7EB]">
                    <div className="pb-3">
                        <div className="relative w-[372px]">
                            <input
                                type="text"
                                placeholder="Cari Produk"
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

                                                {["ID", "Tantangan", "Durasi (Hari)", "Exp", "Koin", "Tingkat Kesulitan", "Aksi"].map((title, index) => (
                                                    <th scope="col" className={`${index === 0 ? "pe-6" : "px-6"} py-3 text-start`} key={index}>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs font-bold uppercase tracking-wide text-[#2E7D32]">{title}</span>
                                                            {/* {index > 0 && index < 6 && (
                                                                <button>
                                                                    <img src={arrowUpDown} alt="arrow-filter-icon" />
                                                                </button>
                                                            )} */}
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {filteredChallenges && filteredChallenges.length > 0 ? (
                                                filteredChallenges
                                                    ?.sort((a, b) => {
                                                        // Jika `deleted_at` tidak null, pindahkan ke bawah
                                                        if (a.deleted_at && !b.deleted_at) return 1;
                                                        if (!a.deleted_at && b.deleted_at) return -1;
                                                        return 0; // Tetap pada posisi relatif jika sama-sama null atau tidak null
                                                    })
                                                    .map((challenge) => (
                                                        <tr key={challenge.id}>
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
                                                                    <p className="text-sm font-medium text-[#1F2937] cursor-pointer" title={challenge.id}>
                                                                        {truncateText(challenge.id, 5)}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-2 flex items-center gap-x-2">
                                                                    <img className="inline-block size-[38px] rounded-full w-6 h-6" src={challenge.challenge_img} alt="Avatar" />
                                                                    <span className="text-sm font-medium text-[#1F2937] decoration-2">{challenge.title}</span>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-2">
                                                                    <span className="text-sm font-medium text-[#1F2937]">{challenge.duration_days}</span>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-2">
                                                                    <p className="text-sm font-medium text-[#1F2937]">{challenge.exp}</p>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-2">
                                                                    <p className="text-sm font-medium text-[#1F2937]">{challenge.coin}</p>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="px-6 py-2">
                                                                    <p
                                                                        className={`text-sm font-medium w-fit py-1 px-3 rounded-[100px] ${
                                                                            challenge.difficulty === "Menengah"
                                                                                ? "text-[#019BF4] bg-[#E6F5FE] border-2 border-[#B0E0FC]"
                                                                                : challenge.difficulty === "Sulit"
                                                                                ? "text-[#F05D3D] bg-[#feefec] border-2 border-[#FACDC3]"
                                                                                : "text-[#009499] bg-[#e5f4f5] border-2 border-[#B0DEDF]"
                                                                        }`}
                                                                    >
                                                                        {challenge.difficulty}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className="size-px whitespace-nowrap">
                                                                <div className="py-2">
                                                                    <div className="flex items-center gap-x-2">
                                                                        <button
                                                                            onClick={() => {
                                                                                handleShowChallenge(challenge);
                                                                            }}
                                                                        >
                                                                            <img src={eye} alt="eye-icon" />
                                                                        </button>

                                                                        {!challenge?.deleted_at && (
                                                                            <>
                                                                                <button onClick={() => handleEdit(challenge)}>
                                                                                    <img src={pencil} alt="pencil-icon" />
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        document.getElementById("my_modal_3").showModal();
                                                                                        setDeleteChallenge(challenge.id);
                                                                                    }}
                                                                                >
                                                                                    <img src={trash} alt="trash-icon" />
                                                                                </button>
                                                                            </>
                                                                        )}
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
                    <ModalViewChallenges challenge={selectedChallenge} />
                    <ModalEditChallenges selectedChallenge={selectedChallenge} fetchChallenges={() => fetchChallenges()} />

                    <ModalDelete handleDelete={() => handleDelete(selectedChallenge)} title="Hapus tantangan" subtitle="Apa kamu yakin ingin menghapus tantangan ini?" />

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
                                    disabled={selectedPage === metadata?.TotalPage}
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
        </AdminLayout>
    );
};

export default ChallengePage;
