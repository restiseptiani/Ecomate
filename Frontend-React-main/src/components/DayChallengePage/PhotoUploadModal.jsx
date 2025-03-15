import React, { useState } from "react";
import { Upload } from "lucide-react";

const PhotoUploadModal = ({ onClick, onChange, previewImage, selectedFile }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={openModal}
                className="bg-[#1B4B1E] text-white text-lg w-full py-6 rounded-[16px] mt-10 hover:bg-[#2C6A2F] flex items-center justify-center"
            >
                <Upload className="mr-2" /> Upload Foto
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-10 overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-3">
                        <div className="flex justify-between items-center py-3 px-4 border-b">
                            <h3 className="font-bold text-gray-800">Upload Bukti Misi</h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all text-sm"
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="w-3.5 h-3.5"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.258206 1.00808C0.351976 0.913989 0.479126 0.86207 0.611706 0.86207C0.744296 0.86207 0.871447 0.913989 0.965207 1.00808L3.61171 3.65517L6.25822 1.00808C6.30375 0.958366 6.35976 0.917876 6.42169 0.889096C6.48363 0.860325 6.55058 0.844847 6.61831 0.844847C6.68604 0.844847 6.753 0.860325 6.81493 0.889096C6.87487 0.917476 6.92901 0.958166 6.97371 1.00808C7.06824 1.0989 7.12000 1.22677 7.12000 1.35938C7.12000 1.49199 7.06824 1.61986 6.97371 1.71067L4.32722 4.35776L6.97371 7.00485C7.0655 7.09697 7.11421 7.22472 7.11421 7.35714C7.11421 7.48965 7.0655 7.6174 6.97371 7.70952C6.87950 7.80204 6.74968 7.852 6.61391 7.852C6.47815 7.852 6.34833 7.80204 6.25412 7.70952L3.61171 5.06243L0.965207 7.70952C0.876683 7.7952 0.762516 7.84468 0.645306 7.84468C0.528096 7.84468 0.413929 7.7952 0.325405 7.70952C0.231631 7.61867 0.179868 7.4908 0.179868 7.35821C0.179868 7.22562 0.231631 7.09775 0.325405 7.00693L2.97192 4.35984L0.258206 1.00808Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4">
                            <div className="flex flex-col items-center justify-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={onChange}
                                    className="hidden"
                                    id="photo-upload"
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="cursor-pointer bg-[#37953C] text-white px-4 py-2 rounded-lg hover:bg-[#2C6A2F] transition-colors"
                                >
                                    Pilih Foto
                                </label>

                                {previewImage && (
                                    <div className="mt-4">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="max-w-full max-h-[300px] rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center p-4 border-t">
                            <button
                                onClick={onClick}
                                disabled={!selectedFile}
                                className="bg-[#1B4B1E] hover:bg-[#2C6A2F] text-white px-4 py-2 rounded-lg disabled:opacity-50"
                            >
                                Unggah
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PhotoUploadModal;
