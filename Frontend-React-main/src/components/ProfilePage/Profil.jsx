import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import User from "../../assets/webp/blank.webp";
import api from "../../services/api";
import ProfilContent from "./Navigasi/ProfilContent";
import AlamatContent from "./Navigasi/Address";
import PrivasiContent from "./Navigasi/DeleteContent";
import { Camera, ChevronDown, ChevronRight, Link } from "lucide-react";
import Modal from "react-modal";
import { Toast } from "../../utils/function/toast";

Modal.setAppElement("#root");

const Profil = () => {
    const [data, setData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [activeTab, setActiveTab] = useState("Profil");
    const [avatarUpdated, setAvatarUpdated] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleOnSave = () => {
        setAvatarUpdated(true);
    }

    const tabContent = {
        Profil: <ProfilContent Data={data} onSaved={handleOnSave}/>,
        Alamat: <AlamatContent Data={data} onSaved={handleOnSave}/>,
        Privasi: <PrivasiContent />,
    };
        const getData = async () => {
        try {
            const response = await api.get("/users/profile");
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    const updateAvatar = async () => {
        if (!selectedFile) {
            Toast.fire({
                icon: "error",
                title: "Please select an image",
            });
            return;
        }

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        try {
            const response = await api.put("/users/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setData({ ...data, avatar_url: response.data.avatar_url });
            Toast.fire({
                icon: "success",
                title: "Avatar updated successfully",
            });
            setAvatarUpdated(true); // Update state to trigger useEffect
            closeModal();
        } catch (error) {
            console.error("Error updating avatar:", error);
            Toast.fire({
                icon: "error",
                title: "Failed to update avatar",
            });
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFile(null);
        setPreview(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            const fileSize = file.size;

            if (!["image/jpeg", "image/png", "image/jpg"].includes(fileType)) {
                Toast.fire({
                    icon: "error",
                    title: "Invalid file type",
                });
                return;
            }

            if (fileSize > 1024 * 1024) {
                Toast.fire({
                    icon: "error",
                    title: "File size exceeds the limit",
                });
                return;
            }

            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (avatarUpdated) {
            getData(); // Fetch latest profile data
            setAvatarUpdated(false); // Reset state
        }
    }, [avatarUpdated]);

    const handleDropDown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex md:flex-row mobileNormal:flex-col">
            <Sidebar active="Profil" />
            <div className="md:bg-primary md:mt-20 md:w-[1152px] md:h-[327px] mobileNormal:w-full mobileNormal:h-full relative">
                <div className="md:hidden w-full h-[21rem] bg-[#2E7D32] absolute text-[#2E7D32]">hello</div>
                <div className="flex md:flex-row mobileNormal:flex-col px-10 pt-40 gap-10">
                    {/* Profile Section */}
                    <div className="bg-white h-fit md:w-[309px] mobileNormal:w-fit max-md:mx-auto rounded-xl p-12  z-0">
                        <div className="relative">
                            <img src={data.avatar_url ? data.avatar_url : User} alt="Profile Avatar" className="w-[210px] h-[210px] rounded-full object-cover object-top" />
                            <button onClick={openModal} className="absolute bottom-2 right-2 bg-primary text-white px-3 py-3 rounded-full text-sm hover:bg-gray-700">
                                <Camera />
                            </button>
                        </div>
                        <h1 className="mx-auto w-full text-center text-2xl font-semibold mt-5">{data.name || "Name not available"}</h1>
                        <h1 className="mx-auto w-full text-center text-lg font-light">{data.email || "Email not available"}</h1>

                        {/* Modal for Upload */}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            className="bg-white rounded-lg shadow-lg max-w-md mx-auto mt-20 p-5"
                            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                        >
                            <h2 className="text-xl font-semibold mb-4">Upload Foto</h2>
                            {preview && (
                                <div className="mb-4">
                                    <img src={preview} alt="Preview" className="w-[100px] h-[100px] object-cover rounded-full mx-auto" />
                                </div>
                            )}
                            <input type="file" onChange={handleFileChange} className="border border-gray-300 p-2 rounded w-full" />
                            <div className="flex justify-end mt-4">
                                <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                                    Cancel
                                </button>
                                <button onClick={updateAvatar} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2">
                                    Upload
                                </button>
                            </div>
                        </Modal>
                    </div>

                    {/* Tab Section */}
                    <div className="hidden md:block bg-white h-fit md:w-[624px] rounded-xl max-mobilelg:mb-[111px]">
                        <nav>
                            <ul className="flex md:flex-row max-mobilelg:flex-col justify-between mx-8 text-lg p-4">
                                {Object.keys(tabContent).map((tab) => (
                                    <li
                                        key={tab}
                                        className={`font-bold cursor-pointer ${activeTab === tab ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary"}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </li>
                                ))}
                            </ul>
                            <hr />
                        </nav>
                        <div>{tabContent[activeTab]}</div>
                    </div>

                    <div className="md:hidden bg-white h-fit md:w-[624px] rounded-xl max-md:mb-[111px]">
                        <div className="h-7">
                            <div className="bg-primary flex flex-row items-center justify-between px-4 py-3 rounded-t-xl cursor-pointer" onClick={handleDropDown}>
                                <h1 className="text-[#FAFAFA] text-base font-bold">{activeTab}</h1>
                                <ChevronDown color="#FAFAFA" />
                            </div>
                            {isOpen && (
                                <nav className="relative">
                                    <ul className="text-center absolute left-0 right-0 shadow-lg bg-secondary backdrop-blur-sm bg-opacity-10 rounded-xl pt-4">
                                        {Object.keys(tabContent).map((tab) => (
                                            <li
                                                key={tab}
                                                className={`font-bold cursor-pointer ${activeTab === tab ? "bg-primary text-white rounded-lg py-2" : "text-gray-500 hover:text-primary py-4"}`}
                                                onClick={() => {
                                                    setActiveTab(tab);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {tab}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )}
                        </div>
                        <div>{tabContent[activeTab]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profil;
