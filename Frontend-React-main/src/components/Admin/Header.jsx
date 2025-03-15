import React, { useState, useEffect } from 'react';
import { User, Search, BellIcon, ChevronDown } from "lucide-react"
import Image from "../../assets/jpg/user.jpg"
import api from '../../services/api';
import { useNavigate } from 'react-router';
import { logoutAlert, Toast } from "../../utils/function/toast";
import useAuthStore from '../../stores/useAuthStore';
const Header = () => {
    const [name, setName] = useState("");
    const [showBellDropdown, setShowBellDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const { clearToken } = useAuthStore();
    const navigate = useNavigate();
    const handleLogout = () => {
        const logoutAction = () => {
                // Clear the authentication token
                clearToken();
    
                // Redirect to login page
                navigate('/');
                
                // Show success message
                Toast.fire({
                    icon: "success",
                    title: "Logout Berhasil.",
                });
                // Close dropdown
                };
            
                // Show logout confirmation alert
                logoutAlert(logoutAction);
        };
    useEffect(() => {
        const fetchName = async () => {
            try {
                const response = await api.get('/admin');
                setName(response.data.data.name);
            } catch (error) {
                console.error('Error fetching name:', error);
            }
        };
        fetchName();
    }, []); // Added empty dependency array to prevent infinite loops

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const bellDropdown = document.getElementById('bell-dropdown');
            const profileDropdown = document.getElementById('profile-dropdown');
            
            if (bellDropdown && !bellDropdown.contains(event.target)) {
                setShowBellDropdown(false);
            }
            
            if (profileDropdown && !profileDropdown.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white p-5 border-b relative">
            <div className="flex items-center justify-between">
                <div className="relative w-[372px]">
                    <input 
                        type="text" 
                        placeholder="Cari" 
                        className="border ps-11 border-gray-300 rounded-xl h-[40px] px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Search className="w-6 h-6 text-gray-400" />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative" id="bell-dropdown">
                        <BellIcon 
                            className="w-6 h-6 text-gray-400 cursor-pointer" 
                            onClick={() => setShowBellDropdown(!showBellDropdown)}
                        />
                        {showBellDropdown && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">Notifications</h3>
                                    <ul>
                                        <li className="py-2 border-b">No new notifications</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='h-[40px] w-[1px] bg-gray-400 mx-5'></div>
                    <div className="relative flex items-center" id="profile-dropdown">
                        <img 
                            src={Image} 
                            alt="" 
                            className='h-[32px] w-[32px] rounded-full object-cover object-top ml-2' 
                        />
                        <div className='flex flex-col mx-2'>
                            <span className="font-medium text-sm">{name}</span>
                            <span className="font-medium text-xs">Admin</span>
                        </div>
                        <ChevronDown 
                            className="w-6 h-6 text-gray-400 cursor-pointer" 
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        />
                        {showProfileDropdown && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                                <ul>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500" onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;