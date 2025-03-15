import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import heroForum from "../../assets/png/heroForum.png";
import Plus from "../../assets/png/plus-icon.png";
import Emote from "../../assets/png/emote.png";
import Photo from "../../assets/png/photo.png";
import { ChevronRight } from "lucide-react";
import api from "../../services/api";
import { Toast } from "../../utils/function/toast";
import { Search } from "lucide-react";
const HeroForum = ({ onPosted, onSearchSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const handleOpenDesktopModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseDesktopModal = () => {
        setIsModalOpen(false);
    };
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/post-mobile");
    };
    const getData = async () => {
        try {
        const response = await api.get("/users/profile");
        setData(response.data.data);
        } catch (error) {
        console.error("Error fetching profile data:", error);
        }
    };
    useEffect(() => {
        getData();
    }, []);
        
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("topic_image", selectedFile);
            
            try {
                const response = await api.post("/forums", formData, {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
            });
                setIsModalOpen(false);
                Toast.fire({
                    icon: "success",
                    title: "Forum berhasil dibuat",
                })
                onPosted(true);
                setTitle("");
                setDescription("");
                setSelectedFile(null);
                setIsSubmitting(false);
                setImagePreview(null);
                } catch (error) {
                Toast.fire({
                    icon: "error",
                    title: "Gagal membuat forum",
                })
                }
            };
            const handleImageChange = (e) => {
                const file = e.target.files[0];
                    if (file) {
                    const fileType = file.type;
                    const fileSize = file.size;
    
                    if (!["image/jpeg", "image/png", "image/jpg"].includes(fileType)) {
                        Toast.fire({
                        icon: "error",
                        title: "Invalid file type",
                        })
                        return;
                    }
                    
                    if (fileSize > 1024 * 1024) {
                        Toast.fire({
                        icon: "error",
                        title: "File size exceeds the limit",
                        })
                        return;
                    }
    
                    setSelectedFile(file);
                    setImagePreview(URL.createObjectURL(file));
                    }
                };
                const handleSubmitSearch = (event) => {
                    event.preventDefault(); // Mencegah reload halaman
                    onSearchSubmit(inputValue); // Mengoper nilai input ke parent
                  };
    return (
        <div className="bg-secondary pt-[80px] sm:pt-[96px] md:pt-40 mb-0 sm:mb-[24px] ">
            <div className="relative group overflow-hidden rounded-0 sm:rounded-lg max-w-full">
                <div className="relative w-full max-w-[1328px] mx-auto z-0">
                    <img src={heroForum} alt="bg-hero" className="w-full h-[698px] sm:h-[500px] md:h-[698px] rounded-[0px] md:rounded-[50px] object-cover" />

                    <div className="absolute inset-0 text-white bg-[#28282880] bg-opacity-50 rounded-[0px] md:rounded-[50px] flex flex-col items-center justify-center text-center px-4">
                        <h2 className="w-[329px] sm:w-[502px] text-[30px] sm:text-[48px] font-bold leading-normal tracking-[0.24px] mb-[16px]">Selamat Datang di Forum Diskusi Kami!</h2>
                        <p className="w-[283px] sm:w-[631px] text-[14px] sm:text-[24px] font-normal leading-normal tracking-[0.12px] pb-[22px]">
                            Jelajahi topik-topik menarik, bagikan ide, dan berdiskusi dengan komunitas yang penuh inspirasi. Mari bersama menciptakan wawasan baru dan solusi inovatif di sini!
                        </p>
                        <p className="text-base flex items-center gap-2">
                            <a href="/">Beranda</a>
                            <ChevronRight />
                            Forum
                        </p>

                        {/* Button Buat Postingan desktop */}
                        <button
                            onClick={handleOpenDesktopModal}
                            className="text-white bg-[#2E7D32] text-sm sm:text-base md:text-[15px] mt-6 md:mt-10 w-[246px] sm:w-[249px] md:w-[254px] h-[50px] md:h-[62px] rounded-xl font-bold hover:bg-[#1B4B1E] transition-colors duration-300 hidden sm:block"
                        >
                            Buat Postingan
                        </button>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="relative sm:flex sm:flex-col w-[382px] sm:w-[1280px] mx-auto p-6 mt-[-70px] sm:mt-[48px] sm:relative z-10 justify-center items-center gap-[10px] rounded-[12px] border border-gray-300 bg-white">
                <div className="flex flex-col items-start w-full">
                    <p className="text-[#262626] text-[16px] font-bold leading-[24px] tracking-[0.08px] mb-[10px]">Cari</p>
                    <div className="flex items-center justify-between gap-2">
                    <form onSubmit={handleSubmitSearch} className=" flex flex-row gap-3">
                        <div className="relative w-[280px] sm:w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                            className="py-3 ps-10 pe-4 block w-[280px] sm:w-[500px] md:w-[1158px] h-[52px] border border-[#E5E7EB] bg-white rounded-[8px] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            type="text"
                            role="combobox"
                            aria-expanded="false"
                            placeholder="Cari topik"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} // Menyimpan input di state lokal
                            />
                        </div>
                        <button className="bg-[#2E7D32] hover:bg-[#1B4B1E] h-[52px] w-[52px] rounded-[8px] flex items-center justify-center">
                            <Search className="h-5 w-5 text-white" aria-hidden="true" />
                        </button>
                        </form>
                    </div>
                </div>

                {/* Button Buat Postingan mobile */}
                <button
                    onClick={handleButtonClick}
                    className="text-white bg-[#2E7D32] text-sm sm:text-base md:text-[15px] w-[334px] h-[50px] md:h-[62px] mt-6 rounded-xl font-bold hover:bg-[#1B4B1E] transition-colors duration-300  sm:hidden block "
                >
                    Buat Postingan
                </button>
            </div>

            {/* Modal Desktop */}
            {isModalOpen && (
                <div className="fixed inset-0 min-h-[654px] bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-[16px] w-[500px] relative">
                        <button
                            onClick={handleCloseDesktopModal}
                            className="absolute top-4 right-4 w-[24px] h-[24px] p-[4px] bg-[#2E7D32] text-white rounded-full flex items-center justify-center hover:bg-[#1B4B1E]"
                        >
                        x
                        </button>

                        <h3 className="text-lg border-b border-[#D4D4D4] pt-[28px] pb-[19px] w-full text-center font-bold mb-4">Buat Postingan</h3>

                        <div className="flex items-center gap-4 mb-4 px-[22px] ">
                            <img src={data.avatar_url} alt="User Profile" className="w-[40px] h-[40px] rounded-full" />
                            <div className="flex flex-col">
                                <p className="font-semibold text-black  text-base">{data.name}</p>
                                <p className="text-sm text-black ">Posting ke semua orang</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                                Judul
                                </label>
                                <input
                                type="text"
                                id="title"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-primary"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                                Deskripsi
                                </label>
                                <textarea
                                id="description"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-primary"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                ></textarea>
                            </div>
                            {imagePreview && (
                                <div className="mb-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-[200px] object-cover max-w-sm mx-auto rounded-md"
                                />
                                </div>
                            )}
                            <div className="relative flex px-[14px] mb-[24px] mx-[21px] items-center gap-2">
                                <div className="flex gap-2 h-[24px]">
                                <label
                                    htmlFor="photo-upload"
                                    className="flex items-center w-[24px] h-[24px] justify-center cursor-pointer"
                                >
                                    <img src={Photo} alt="photo" className="w-6 h-6" />
                                </label>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <button className="flex items-center w-[24px] h-[24px] justify-center">
                                    <img src={Emote} alt="emote" className="w-6 h-6" />
                                </button>
                                <button className="flex items-center w-[24px] h-[24px] justify-center">
                                    <img src={Plus} alt="plus" className="w-6 h-6" />
                                </button>
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                            <button
                                type="submit"
                                disabled={isSubmitting} // Disable button while submitting
                                className={`w-full px-4 py-2 text-[16px] font-bold rounded-lg transition-colors ${
                                    isSubmitting
                                    ? "bg-[#E5E7EB] cursor-not-allowed text-gray-500"
                                    : title && description
                                    ? "bg-primary hover:cursor-pointer text-white"
                                    : "bg-[#E5E7EB] hover:cursor-not-allowed"
                                }`}
                                >
                                {isSubmitting ? "Mengirim..." : "Kirim"}
                                </button>
                            </div>
                            </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroForum;
