import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/DayChallengePage/Hero";
import UploadMission from "../components/DayChallengePage/UploadMission";
import StickyCtaButton from "../components/StickyCtaButton";
import api from "../services/api";
import { useParams } from "react-router";

const DayChallengePage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null); // Inisialisasi dengan null
    const [nextChallenge, setNextChallenge] = useState(null); // State untuk challenge berikutnya
    const [isLoading, setIsLoading] = useState(true); // State untuk loading
    const [progress, setProgress] = useState(0);
    const getActiveChallengeDetails = async () => {
        try {
            setIsLoading(true); // Mulai loading
            const response = await api.get(`/challenges/details?challengeLogID=${id}`);
            const fetchedData = response.data.data;
    
            // Sort data berdasarkan day_number dari challenge_task
            fetchedData.challenge_confirmation.sort(
                (a, b) => a.challenge_task.day_number - b.challenge_task.day_number
            );
    
            // Set data lengkap
            setData(fetchedData);
            console.log(fetchedData);
    
            // Cari nextChallenge (challenge pertama dengan status bukan "Done")
            const nextChallengeData =
                fetchedData.challenge_confirmation.find(
                    (challenge) => challenge.status !== "Done"
                ) || fetchedData.challenge_confirmation[fetchedData.challenge_confirmation.length - 1]; // Gunakan data terakhir jika semua status "Done"
    
            // Set nextChallenge
            setNextChallenge(nextChallengeData);
            calculateProgress(fetchedData.challenge_confirmation);
        } catch (error) {
            console.error("Error fetching challenge details:", error);
        } finally {
            setIsLoading(false); // Akhiri loading
        }
    };
    
    const calculateProgress = (challengeConfirmation) => {
        if (!challengeConfirmation || challengeConfirmation.length === 0) {
            setProgress(0);
            return;
        }

        // Hitung jumlah data dengan status "Done"
        const totalChallenges = challengeConfirmation.length;
        const doneChallenges = challengeConfirmation.filter(
            (challenge) => challenge.status === "Done"
        ).length;

        // Hitung persentase progress
        const progressPercentage = (doneChallenges / totalChallenges) * 100;

        // Update state progress
        setProgress(progressPercentage);
    };
    useEffect(() => {
        getActiveChallengeDetails();
    }, [id]); // Pastikan ID sebagai dependency

    return (
        <div className="bg-secondary">
            <Navbar active="challenge" />
            <div className="min-h-screen">
                {isLoading ? (
                    <div className="flex justify-center items-center h-screen">Loading...</div>
                ) : data ? (
                    <div className="min-h-screen">
                        <Hero data={data} progress={progress} nextChallenge={nextChallenge}/>
                        <UploadMission data={data} nextChallenge={nextChallenge} />
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-screen">
                        <p>Error: Data not found</p>
                    </div>
                )}
            </div>
            <Footer />
            <StickyCtaButton />
        </div>
    );
};

export default DayChallengePage;
