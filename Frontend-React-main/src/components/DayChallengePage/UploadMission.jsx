import React, { useState } from "react";
import Image from "../../assets/png/bg-mission.png";
import Coin from "../../assets/png/coin.png";
import { Toast } from "../../utils/function/toast";
import api from "../../services/api";
import Modal from 'react-modal';
import { Link } from "react-router";
const ListMission = ({ data, nextChallenge }) => {
    
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedFile, setSelectedFile] = useState(null);
        const [preview, setPreview] = useState(null);
        const [isUploaded, setIsUploaded] = useState(false);
        const [challenge, setChallenge] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            
            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
            setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        };
    
        const handleUpload = async() => {
            if (!selectedFile) {
                    Toast.fire({
                        icon: "error",
                        title: "Please select an image",
                    })
                    return;
                }
                const formData = new FormData();
                formData.append("challenge_confirmation_id", nextChallenge.id);
                formData.append("challenge_confirmation_img", selectedFile);
                // Programmatically close the modal
                try {
                    const response = await api.put("/challenges/confirmations/progress", formData, {
                        headers: {
                        "Content-Type": "multipart/form-data",
                        },
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Challenge berhasil diupload",
                    })
                    setIsUploaded(true);
                    closeModal();
                    
                    } catch (error) {
                    console.error("Error updating challenge:", error);
                    Toast.fire({
                        icon: "error",
                        title: "Failed to update challenge",
                    })
                    }
                
            };
            const openModal = () => setIsModalOpen(true);
            const closeModal = () => {
                setIsModalOpen(false);
                setSelectedFile(null);
                setPreview(null);
            };
    
    return (
        <div className="relative h-fit bg-[#37953C] mb-20 md:w-[1280px] py-10 w-[375px] items-center justify-center mx-auto rounded-[48px] overflow-hidden">
            {/* Background Image Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 " 
                style={{ 
                    backgroundImage: `url(${Image})`,
                }}
            ></div>

            {/* Content - needs relative positioning to be above the background */}
            <div className="relative">
                <div className="mx-auto rounded-[40px] md:w-[1184px] w-[335px] flex flex-col justify-center items-center">
                    <h1 className="md:text-4xl text-xl font-bold text-white my-10 ">HARI KE {nextChallenge.challenge_task.day_number} : {nextChallenge.challenge_task.name}</h1>
                    <div className="flex flex-row gap-4 pb-10">
                        <img src={Coin} alt="" />
                        <p className="text-2xl font-bold text-white">{data.challenge.coin} Koin</p>
                    </div>
                    <div className="bg-neutral-50 rounded-[40px] md:w-[1184px] w-[335px] text-center text-primary py-10">
                        <h1 className="md:text-2xl text-base font-semibold mb-3"> 
                            Misi
                        </h1>
                        <p className="md:text-xl text-base font-semibold px-10 ">{nextChallenge.challenge_task.task_description}</p>
                    </div>
                    <div className="bg-neutral-50 rounded-[40px] md:w-[1184px] w-[335px] text-center text-primary py-10 mt-10">
                        <h1 className="md:text-2xl text-base font-semibold mb-3"> 
                            Ketentuan Submit
                        </h1>
                        <p className="md:text-xl text-base font-semibold ">Foto Anda di tempat kerja, kampus, atau aktivitas sehari-hari.</p>
                    </div>
                    
                    {/* Replace the button with the PhotoUploadModal */}
                    {isUploaded || nextChallenge.status === "Done"  ? (
                        <div className="w-full gap-10 flex flex-row mt-10 text-center">
                            <Link to="/tantangan"className="w-1/2 bg-[#CCFBF1] rounded-[16px] py-5 text-primary text-lg font-bold">Lihat Tantangan</Link>
                            {nextChallenge.status === "Done" ? (
                                // Tombol mengarahkan ke "/tantangan"
                                <Link 
                                    to="/tantangan" 
                                    className="w-1/2 bg-primary rounded-[16px] py-5 text-lg font-bold text-white"
                                >
                                    Selesai
                                </Link>
                            ) : (
                                // Tombol memuat ulang halaman
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="w-1/2 bg-primary rounded-[16px] py-5 text-lg font-bold text-white"
                                >
                                    Tantangan Berikutnya
                                </button>
                            )}
                        </div>
                    ):
                    (
                        <div className="w-full">
                            <button onClick={openModal}
                            className="bg-[#1B4B1E] text-white text-lg w-full py-6 rounded-[16px] mt-10 hover:bg-[#2C6A2F] flex items-center justify-center" >
                                Upload Foto
                            </button>
                        </div>
                    )}
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        className="bg-white rounded-lg shadow-lg w-[800px] mx-auto  p-5"
                        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                        >
                        <h2 className="text-xl font-semibold mb-4">Upload Foto</h2>
                        {preview && (
                            <div className="mb-4">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-[400px] object-cover rounded-xl mx-auto"
                            />
                            </div>
                        )}
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                            Cancel
                            </button>
                            <button
                            onClick={handleUpload}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
                            >
                            Upload
                            </button>
                        </div>
                        </Modal>
                </div>
            </div>
        </div>
    );
};

export default ListMission;