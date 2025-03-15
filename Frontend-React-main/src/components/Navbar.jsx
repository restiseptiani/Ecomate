import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../stores/useAuthStore";
import Logo from "../assets/png/Logo.png";
import CartIcon from "../assets/svg/shopping-cart-nav.svg";
import userIcon from "../assets/svg/user.svg";
import { Menu as Bar, X, User, Power,   } from "lucide-react";
import { logoutAlert, Toast } from "../utils/function/toast";
const Navbar = ({ active }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { token } = useAuthStore();

    const { clearToken } = useAuthStore();
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        };
    
        const handleLogout = () => {
            const logoutAction = () => {
                // Clear the authentication token
                clearToken();
                
                // Close dropdown
                setIsOpen(false);
                
                // Redirect to login page
                navigate('/login');
                
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

    return (
        <header className="fixed top-0 left-0 w-full h-[96px] md:backdrop-blur-xl  bg-secondary bg-opacity-30 z-50">
            <nav className="max-w-[83rem] w-full mx-auto px-4 flex flex-wrap md:backdrop-blur-none backdrop-blur-xl  items-center justify-between h-full">
                {/* Logo */}
                <a className="flex-none text-[26px] font-bold text-[#1B4B1E] focus:outline-none focus:opacity-80 mt-3" href="#">
                    <span className="inline-flex items-center gap-x-2 text-xl font-bold">
                        <img src={Logo} alt="logo" className="w-12 h-12" />
                        EcoMate
                    </span>
                </a>

                {/* Mobile Menu Toggle */}
                <div className="flex flex-row">
                {token && (
                    <Link to="/cart" className=" sm:hidden p-3 ">
                        <img src={CartIcon} alt="logo" className="w-6 h-6" />
                    </Link>
                )}
                <button type="button" className="sm:hidden z-50 bg-white p-3 rounded-xl" onClick={toggleMenu} aria-label="Toggle navigation">
                    {isMenuOpen ? (
                        <X className="text-[#1B4B1E] hover:text-[#246128] focus:outline-none" />
                    ) : (
                        <Bar className="text-[#1B4B1E] hover:text-[#246128] focus:outline-none" />
                    )}
                </button>
                </div>
                {/* Desktop Navigation Links */}
                <div className="hidden sm:flex items-center gap-8 text-base">
                    <Link to={"/"} className={` text-[#1B4B1E] hover:text-[#246128] focus:outline-none ${active === "home" ? "font-bold" : "font-normal"}`}>
                        Beranda
                    </Link>
                    <Link to="/#about-us" className={`text-[#1B4B1E] hover:text-[#246128] focus:outline-none ${active === "about" ? "font-bold" : "font-normal"}`}>
                        Tentang
                    </Link>
                    <Link to={"/belanja"} className={` text-[#1B4B1E] hover:text-[#246128] focus:outline-none ${active === "Shopping" ? "font-bold" : "font-normal"}`}>
                        Belanja
                    </Link>
                    <Link to={"/tantangan"} className={` text-[#1B4B1E] hover:text-[#246128] focus:outline-none ${active === "challenge" ? "font-bold" : "font-normal"}`}>
                        Tantangan
                    </Link>
                    <Link to={"/forum"} className={` text-[#1B4B1E] hover:text-[#246128] focus:outline-none ${active === "forum" ? "font-bold" : "font-normal"}`}>
                        Forum
                    </Link>
                </div>

                {/* Desktop Action Buttons */}

                <div className="hidden sm:flex items-center gap-x-2 h-[46px] max-w-[231px]">
                    {token ? (
                        <div className="flex flex-row w-full ml-28 items-center">
                        <Link to="/cart" className="p-3">
                            <img src={CartIcon} alt="Cart" className="w-6 h-6" />
                            </Link>
                            <div className="w-[1px] h-11 bg-[#999999]"></div>
                            
                            <div className="relative">
                            <button 
                                onClick={toggleDropdown}
                                type="button" 
                                className="p-3"
                            >
                                <img src={userIcon} alt="User" className="w-6 h-6 hover:text-white" />
                            </button>
                    
                            {isOpen && (
                                <div 
                                className="absolute right-0 z-10 mt-2 w-32 rounded-lg bg-white shadow-[0_5px_15px_0_rgba(0,0,0,0.1)] border border-gray-200"
                                role="menu"
                                >
                                <div className="py-1">
                                    <Link
                                    to="/profile"
                                    className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex-row gap-3"
                                    role="menuitem"
                                    >
                                    <User size={16}/>
                                    Profile
                                    </Link>
                                    <button
                                    onClick={handleLogout}
                                    className="w-full text-left flex px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-900 flex-row gap-3"
                                    role="menuitem"
                                    >
                                    <Power size={16}/>
                                    Log Out
                                    </button>
                                </div>
                                </div>
                            )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 inline-flex items-center gap-x-2 text-[15px] h-full w-[81px] font-medium rounded-lg bg-[#2E7D32] text-white shadow-sm hover:bg-[#1B4B1E] focus:outline-none"
                            >
                                Masuk
                            </Link>
                            <div className="w-[1px] h-11 bg-[#999999]"></div>
                            <Link
                                to="/register"
                                className="px-4 inline-flex items-center gap-x-2 text-[15px] h-full w-[118px] font-medium rounded-lg border border-[#2E7D32] backdrop-blur-xl text-[#2E7D32] shadow-sm hover:bg-gray-50 focus:outline-none"
                            >
                                Daftar akun
                            </Link>
                        </>
                    )}
                </div>
                </nav>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="sm:hidden absolute top-[99%] left-0 w-full bg-secondary shadow-lg backdrop-blur-xl bg-opacity-30">
                        <div className="flex flex-col p-4 space-y-4 text-center">
                            <a className={` text-[#1B4B1E] hover:text-[#246128] focus:outline-none ${active === "home" ? "font-bold" : "font-normal"}`} href="/">
                                Beranda
                            </a>
                            <a className={` text-[#1B4B1E] hover:text-[#246128] focus:outline-none ${active === "about" ? "font-bold" : "font-normal"}`} href="/#about-us">
                                Tentang
                            </a>
                            <a className={` text-[#1B4B1E] hover:text-[#246128] focus:outline-none ${active === "Shopping" ? "font-bold" : "font-normal"}`} href="/belanja">
                                Belanja
                            </a>
                            <a className={` text-[#1B4B1E] hover:text-[#246128] focus:outline-none ${active === "challenge" ? "font-bold" : "font-normal"}`} href="/tantangan">
                                Tantangan
                            </a>
                            <a className={` text-[#1B4B1E] hover:text-[#246128] focus:outline-none ${active === "forum" ? "font-bold" : "font-normal"}`} href="/forum">
                                Forum
                            </a>
                            <div className="border-t pt-4 flex flex-col space-y-4">
                                {token ? (
                                    <>
                                        <Link
                                    to="/profile"
                                    className="w-full px-4 py-2 inline-flex items-center justify-center gap-x-2 text-[15px] font-medium rounded-lg bg-[#2E7D32] text-white shadow-sm hover:bg-[#1B4B1E] focus:outline-none"
                                ><User />
                                    Profil
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 inline-flex items-center justify-center gap-x-2 text-[15px] font-medium rounded-lg border border-[#2E7D32] backdrop-blur-xl text-[#2E7D32] shadow-sm hover:bg-gray-50 focus:outline-none"
                                >
                                    <Power/>
                                    Log Out
                                </button>
                                </>
                                ):(
                                    <>
                                    <Link
                                    to="/login"
                                    className="w-full px-4 py-2 inline-flex items-center justify-center gap-x-2 text-[15px] font-medium rounded-lg bg-[#2E7D32] text-white shadow-sm hover:bg-[#1B4B1E] focus:outline-none"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    to={"/register"}
                                    className="w-full px-4 py-2 inline-flex items-center justify-center gap-x-2 text-[15px] font-medium rounded-lg border border-[#2E7D32] backdrop-blur-xl text-[#2E7D32] shadow-sm hover:bg-gray-50 focus:outline-none"
                                >
                                    Daftar akun
                                </Link>
                                    </>
                                )}
                                
                            </div>
                        </div>
                    </div>
                )}
            
        </header>
    );
};

export default Navbar;
