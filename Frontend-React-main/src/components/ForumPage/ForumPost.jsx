import React, { useState, useEffect } from "react";
import commentIcon from "../../assets/png/coment.png";
import BestTopic from "./bestTopic";
import { Ellipsis } from "lucide-react";
import Pagination from "../Pagination";
import api from "../../services/api";
import { Toast } from "../../utils/function/toast";
import Plus from "../../assets/png/plus-icon.png";
import Emote from "../../assets/png/emote.png";
import Photo from "../../assets/png/photo.png";
const ForumPost = ({ forums, metaData, curPage, isLoading, user, onPosted, query, forumsSorted }) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editForumId, setEditForumId] = useState(null);
    const [image, setImage] = useState(null);

    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Tampilkan pratinjau gambar
        }
    };
    const handleEdit = (forum) => {
        setEditForumId(forum.id);
        setTitle(forum.title);
        setDescription(forum.description);
        setImagePreview(forum.topic_image || null); // Jika ada gambar
        setIsModalOpen(true);
    };
    
    const handleUpdate = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (image) {
            formData.append("topic_image", image); // Tambahkan gambar jika diubah
        }
    
        try {
            await api.put(`/forums/${editForumId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            Toast.fire({
                icon: "success",
                title: "Forum berhasil diperbarui",
            });
            setIsModalOpen(false); // Tutup modal
            onPosted(true);
            curPage(currentPage); // Refresh data di halaman saat ini
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Gagal memperbarui forum",
            });
        }
    };
    
    const handleDelete = async (id) => {
        try {
            await api.delete(`/forums/${id}`);
            Toast.fire({
                icon: "success",
                title: "Forum Berhasil dihapus",
            });
            onPosted(true);
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Forum gagal dihapus",
            });
        }
    };
    // data sample
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        curPage(pageNumber);
    };  
    const filteredForums = forums.filter((forum) =>
        forum.title.toLowerCase().includes(query.toLowerCase())
      );
      console.log(filteredForums);
 
    return (
        <div className={`container max-w-[1280px] mx-auto p-4 flex gap-6 pt-[131px]]`}>
            <div className="flex-1 w-full sm:w-[778px] flex flex-col gap-6">
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-[#2E7D32]"></div>
                    </div>
                ) : (
                    <div>
                        {filteredForums?.map((forum, index) => (
                            <div key={index} className="bg-white rounded-[16px] mb-[24px] pt-[51px] pb-[49px] px-[46px]">
                                <div className="flex items-start gap-4">
                                    <img className="w-[50px] h-[50px] rounded-full" src={forum.author.avatar_url} alt={`Profile ${forum.author.name}`} />
                                    <div className="flex flex-col sm:flex-row w-full justify-between">
                                        <div className="flex flex-row">
                                            <p className="text-[14px] font-bold text-[#2E7D32] mr-2">{forum.author.name},</p>
                                            <p className="text-[14px] font-medium text-[#262626]">{forum.updated_at}</p>
                                        </div>
                                        <div className="relative">
                                            {user.id === forum.author.id && (
                                                <button onClick={() => toggleDropdown(forum.id)} className="focus:outline-none">
                                                    <Ellipsis />
                                                </button>
                                            )}

                                            {dropdownIndex === forum.id && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg">
                                                    <button onClick={() => handleEdit(forum)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(forum.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Konten Post */}
                                <div className="pl-0 sm:pl-[64px] mt-0 sm:mt-[-22px]">
                                    <h3 className="text-lg font-bold text-[#262626]">{forum.title}</h3>
                                    <p className="mt-4 text-sm font-medium text-[#262626]">{forum.description}</p>
                                    {forum.topic_image && <img className="mt-4 object-cover w-full rounded-lg" src={forum.topic_image} alt="Post" />}
                                </div>

                                {/* Tombol Komentar */}
                                <div className="flex justify-end mt-[48px]">
                                    <a
                                        href={`/detail-forum/${forum.id}`}
                                        className="flex items-center w-[140px] justify-between h-[52px] py-[12] px-[20px] border border-[#a1a1aa] rounded-lg gap-2 text-sm font-medium text-neutral-800"
                                    >
                                        <img src={commentIcon} alt="Comment" />
                                        Komentar
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <Pagination currentPage={currentPage} totalPages={metaData.total_page} onPageChange={handlePageChange} />
            </div>

            {/* Topik Terbaik */}
            <BestTopic forums={forumsSorted} />
            {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-[16px] w-[500px] relative">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 w-[24px] h-[24px] p-[4px] bg-[#2E7D32] text-white rounded-full flex items-center justify-center hover:bg-[#1B4B1E]"
                    >
                        x
                    </button>
                    <h3 className="text-lg border-b border-[#D4D4D4] pt-[28px] pb-[19px] w-full text-center font-bold mb-4">
                        Edit Postingan
                    </h3>
                    <div className="flex items-center gap-4 mb-4 px-[22px] ">
                                    <img src={user.avatar_url} alt="User Profile" className="w-[40px] h-[40px] rounded-full" />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-black  text-base">{user.name}</p>
                                        <p className="text-sm text-black ">Posting ke semua orang</p>
                                    </div>
                                </div>
                    <form onSubmit={handleUpdate} className="p-4 space-y-4">
                        <div>
                            <label htmlFor="edit-title" className="block mb-2 text-sm font-medium text-gray-700">
                                Judul
                            </label>
                            <input
                                type="text"
                                id="edit-title"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-primary"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="edit-description" className="block mb-2 text-sm font-medium text-gray-700">
                                Deskripsi
                            </label>
                            <textarea
                                id="edit-description"
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
                                className={`w-full px-4 py-2 text-[16px] font-bold rounded-lg transition-colors ${
                                    title && description
                                        ? "bg-primary hover:cursor-pointer text-white"
                                        : "bg-[#E5E7EB] hover:cursor-not-allowed"
                                }`}
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            )}

        </div>
    );
};

export default ForumPost;
