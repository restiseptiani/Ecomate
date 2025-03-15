import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/ProfilePage/Sidebar";
import StickyCtaButton from "../../components/StickyCtaButton";
import Challenge from "../../components/ProfilChallengePage/Challenge";
import api from "../../services/api";
import { useEffect, useState } from "react";

const ContributePage = () => {
    const [user, setUser] = useState(null);
    const [challenges, setChallenges] = useState(null);

    const fetchData = async (endpoint, setter) => {
        try {
            const response = await api.get(endpoint);
            setter(response.data.data);
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
        }
    };

    useEffect(() => {
        fetchData("/users/profile", setUser);
        fetchData("/challenges/active", setChallenges);
    }, []);

    return (
        <div className="bg-secondary">
            <Navbar />
            <div className="min-h-screen max-w-[1328px] mx-auto bg-secondary">
                <div className="flex md:flex-row mobileNormal:flex-col mb-20">
                    <Sidebar active="Challenge" />
                    <Challenge challenges={challenges}/>
                        
                </div>
            </div>
            <Footer />
            <StickyCtaButton />
        </div>
    );
};

export default ContributePage;
