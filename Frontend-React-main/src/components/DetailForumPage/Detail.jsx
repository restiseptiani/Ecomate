import React, { useState, useEffect } from "react";
import BestTopic from "../ForumPage/bestTopic";
import api from "../../services/api";
import { useParams } from "react-router";
import CommentIcon from "../../assets/png/coment.png";
import Send from '../../assets/png/send.png';
import Blank from '../../assets/webp/blank.webp';
import { Toast } from "../../utils/function/toast";
import { Camera } from "lucide-react";
import Swal from "sweetalert2";
const Detail = ({forums}) => {
    
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState({});
    const [user, setUser] = useState([]);
    const [comment, setComment] = useState("");
    const [loadMore, setLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [onComment, setOnComment] = useState(true);
    const { id } = useParams();
        useEffect(() => {

            if(onComment){
                getPost();
                getUsers();
                setOnComment(false);
            }
            
        }, [onComment]);
    const getPost = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/forums/${id}`);
            
            setPost(response.data.data);
            setAuthor(response.data.data.author);
            setComments(response.data.data.forum_messages || []);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const getUsers = async () => {
        try {
            const response = await api.get(`/users/profile`);   
            setUser(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteComment = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Komentar yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/forums/message/${id}`);
                    setComments(comments.filter((comment) => comment.id !== id));
                    Toast.fire({
                        icon: "success",
                        title: "Komentar berhasil dihapus",
                    });
                } catch (error) {
                    Toast.fire({
                        icon: "error",
                        title: "Komentar gagal dihapus",
                    });
                }
            }
        });
    };
    
    const handleComment = async () => {
        // Prevent sending empty comments
        setIsLoading(true);
        if (!comment.trim()) return;
        const formData = new FormData();
        formData.append("forum_id", post.id);
        formData.append("messages", comment);
        formData.append("message_image", selectedFile);
        try {
            
            const response = await api.post("/forums/message", formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });
            setComments([...comments, response.data.data]);
            setComment("");
            setSelectedFile(null);
            Toast.fire({
                icon: "success",
                title: "Komentar Berhasil ditambahkan",
            })
            setOnComment(true);
            setIsLoading(false);
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Komentar gagal ditambahkan",
            })
        }
    }
    const handleLoadMoreComments = () => setLoadMore(!loadMore); 

    
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
                    console.log(comments)
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
    <div className={`container max-w-[1280px] mx-auto p-4 flex gap-6 pt-[131px]] pt-40 bg-secondary`}>
        <div className="flex-1 w-full sm:w-[778px] flex flex-col gap-6">
            <div  className="bg-white rounded-[16px] mb-[24px] pt-[51px] pb-[49px] px-[46px]">
                <div className="flex items-start gap-4">
                    <img className="w-[50px] h-[50px] rounded-full object-cover" src={author.avatar_url || Blank} alt={`Profile ${author.name}`} />
                    <div className="flex flex-col sm:flex-row">
                    <p className="text-[14px] font-bold text-[#2E7D32]">
                        {author.name}
                        <span className="text-black sm:inline hidden">,{""} </span> 
                    </p>                  
                    <p className="text-[14px] font-medium text-[#262626]">{post.updated_at}</p>
                    </div>
                </div>

                {/* Konten Post */}
                <div className="pl-0 sm:pl-[64px] mt-0 sm:mt-[-22px]">
                    <h3 className="text-lg font-bold text-[#262626]">{post.title}</h3>
                    <p className="mt-4 text-sm font-medium text-[#262626]">{post.description}</p>
                    {post.topic_image && (
                    <img className="mt-4 object-cover w-[632px] h-[282px] rounded-lg shadow-lg " src={post.topic_image} alt="Post" />
                    )}
                </div>

                {/* Tombol Komentar */}
                <div className="flex justify-end mt-[48px]">
                    <a
                    className="flex items-center w-[140px] h-[52px] py-[12] px-[12px]      rounded-lg gap-2 text-sm font-medium text-neutral-800"
                    >
                    <img src={CommentIcon} alt="Comment" />
                    {comments.length} Komentar
                    </a>
                </div>
                <div className="mt-6">
                <div className="flex items-start gap-3">
                    <img 
                        className="w-[50px] h-[50px] rounded-full object-cover" 
                        src={user.avatar_url || Blank} 
                        alt="Profile" 
                    />
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="py-3 pe-20 px-4 block w-full border border-[#A1A1AA] rounded-xl text-sm"
                            placeholder="Tambahkan komentar"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleComment();
                            }}
                        />
                        {imagePreview && (
                                <div className="">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="absolute top-1/2 transform -translate-y-1/2 right-20 w-6 h-6"
                                />
                                </div>
                            )}
                        <label
                            htmlFor="photo-upload"
                            className="absolute top-1/2 transform -translate-y-1/2 right-12 cursor-pointer"
                        >
                            <Camera className="w-6 h-6" />
                        </label>
                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <button 
                            onClick={handleComment}
                            className="absolute top-1/2 transform -translate-y-1/2 right-4"
                        >
                            <img src={Send} alt="Send" className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                        {/* List Komentar */}
                        {isLoading ? (<div>Loading...</div>) : (
                            <div className="mt-4">
                                
                            {comments && comments.length === 0 ? (
                                <div className="text-center text-[#8A8A8A] py-4">
                                    Belum ada komentar
                                </div>
                            ) : (
                                comments.filter(
                                    (comment) =>
                                        comment && // Pastikan comment tidak null
                                        comment.user && // Pastikan properti user ada
                                        comment.user.name && // Pastikan nama user ada
                                        comment.user.avatar_url // Pastikan avatar_url ada (opsional, jika avatar_url tidak wajib, hapus baris ini)
                                ).slice(0, loadMore ? comments.length : 3).map((comment) => (

                                    <div 
                                        key={comment.id} 
                                        className="flex items-start gap-4 mb-4"
                                    >
                                        
                                        <img 
                                            className="w-[50px] h-[50px] rounded-full object-cover" 
                                            src={comment.user?.avatar_url || Blank} 
                                            alt={`Profile ${comment.user?.name}`} 
                                        />
                                        <div className="w-full">
                                            <div className="text-base font-bold  w-full flex justify-between">
                                                {comment.user?.name || "Anonymous"}
                                                {user.id === comment.user.id && (
                                                    <div>
                                                    <button onClick={() => handleDeleteComment(comment.id)} className="font-medium text-[#2E7D32] justify-end hover:underline ml-5">Delete</button>
                                                    </div>
                                                )}
                                                
                                            </div>
                                            <div className="text-sm text-[#8A8A8A]">
                                                {comment.updated_at}
                                            </div>
                                            {comment.message_image && (
                                                <img className="mt-2 object-cover w-[632px] h-[282px] rounded-lg shadow-lg " src={comment.message_image} alt="Post" />
                                            )}
                                            <div className="text-sm text-[#262626] mt-3">
                                                {comment.message}
                                            </div>
                                            
                                        </div>
                                    </div>
                                ))
                            )}

                            {comments.length > 3 && !loadMore && (
                                <button 
                                    onClick={handleLoadMoreComments} 
                                    className="text-blue-500 text-sm font-medium"
                                >
                                    Lihat komentar lainnya
                                </button>
                            )}
                        </div>
                        )}
                        
                </div>
            </div>
        </div>
        {forums && <BestTopic forums={forums}/>}
            
    </div>);
};

export default Detail;