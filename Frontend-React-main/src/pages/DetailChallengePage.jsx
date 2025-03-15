import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/DetailChallengePage/Hero";
import Participants from "../components/DetailChallengePage/Participants";
import ListMission from "../components/DetailChallengePage/ListMission";
import StickyCtaButton from "../components/StickyCtaButton";
import Swal from "sweetalert2";
import api from "../services/api";
import { Toast } from "../utils/function/toast";
import { useParams, useNavigate } from "react-router";
const DetailChallengePage = () => {
    const [challenge, setChallenge] = useState(null);
    const { id } = useParams(); // Mendapatkan ID dari URL
    const navigate = useNavigate();
    // Mengambil detail tantangan
    const getChallengeById = async () => {
        try {
            const response = await api.get(`/challenges/${id}/details`);
            setChallenge(response.data.data);
        } catch (error) {
            console.error("Error fetching challenge details:", error);
        }
    };

    useEffect(() => {
        getChallengeById();
    }, []);
    console.log(challenge)
    // Menghandle klik tombol daftar
    const handleClick = async () => {
        Swal.fire({
            title: "Ingin Mendaftarkan diri ke tantangan?",
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: "Tidak",
            confirmButtonText: "Ya, Daftar",
            confirmButtonColor: "#2E7D32",
            reverseButtons: true, // Menukar posisi tombol
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const payload = {
                        challenge_id: id, // Menggunakan ID dari params
                    };
                    await api.post("/challenges/logs", payload);
                    Toast.fire({
                        icon: "success",
                        title: "Berhasil mendaftar ke tantangan!",
                    })
                    navigate(`/tantangan`);
                    
                } catch (error) {
                    console.error("Error registering for challenge:", error);
                    Toast.fire({
                        icon: "error",
                        title: "Gagal mendaftar ke tantangan!",
                    })
                }
            }
        });
    };

    console.log(challenge)
    
    return <div className="bg-secondary ">
        <Navbar active="challenge"/>
        
        {challenge ? (
            <div className="min-h-screen">
                <Hero onClick={handleClick} data={challenge}/>
                <Participants data={challenge} />
                <ListMission data={challenge}/>
            </div>
        ):(
            <div className="min-h-screen items-center pt-[400px]">

                <div className="animate-spin rounded-full w-[200px] h-[200px] border-b-4 border-primary mx-auto ">
                </div>    

            </div>
        )}
        
        
        <Footer />
        <StickyCtaButton />
        </div>;
        
};

export default DetailChallengePage;