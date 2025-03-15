import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroChallenge from "../components/ListChallengePage/HeroChallenge";
import ListChallenge from "../components/ListChallengePage/ListChallenge";
import api from "../services/api";
import LeaderBoard from "../components/ListChallengePage/LeaderBoard";
import Header from "../components/ListChallengePage/Header";
import StickyCtaButton from "../components/StickyCtaButton";
import { useNavigate } from "react-router";
import { Toast } from "../utils/function/toast";
import useAuthStore from "../stores/useAuthStore";
const ListChallengePage = () => {
    const [currentPage, setCurrentPage] = useState('challenge');
    const [searchParams, setSearchParams] = useState(null);
    const [leaderboard, setLeaderboard] = useState(null);
    const navigate = useNavigate();
    const { token } = useAuthStore();

    useEffect(() => {
        if (!token) {
            Toast.fire({
                icon: "warning",
                title: "Anda harus login terlebih dahulu",
            })
            navigate("/login");
        }
    }, [token, navigate]); // Tambahkan dependensi untuk memastikan `useEffect` berjalan dengan benar
    const handleSearchSubmit = (searchData) => {
        setSearchParams(searchData);
    };
    const handleNavigation = (page) => {
        setCurrentPage(page);
        // Tambahan logika navigasi jika diperlukan
    };
    useEffect(() => {
        getLeaderBoard();
    }, []);

    const getLeaderBoard = async () => {
        try {
            const response = await api.get(`/leaderboard`); 
            setLeaderboard(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    return  (
    <div className="bg-[#F9F9EB] ">

        <Navbar active="challenge"/>

        <HeroChallenge />
        <Header onClick={handleNavigation} active={currentPage} onSearchSubmit={handleSearchSubmit}/>
        {currentPage === 'challenge' ?
        (   
            <div>
                <ListChallenge searchParams={searchParams ? searchParams : null}/>
            </div>
        ):
        (
            <div>
                <LeaderBoard leaderboard={leaderboard}/>
            </div>
        )}
        <Footer />
        <StickyCtaButton />
        </div>);
        
};

export default ListChallengePage;