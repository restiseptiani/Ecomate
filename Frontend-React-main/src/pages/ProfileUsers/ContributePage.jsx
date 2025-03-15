import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/ProfilePage/Sidebar";
import StickyCtaButton from "../../components/StickyCtaButton";
import CardContribute from "../../components/ContributePage/CardContribute";
import ContributeTable from "../../components/ContributePage/ContributeTable";
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
                <div className="flex md:flex-row mobileNormal:flex-col">
                    <Sidebar active="Kontribusi" />
                    <div className="md:mt-28 md:w-[1152px] md:h-[327px] mobileNormal:w-full mobileNormal:h-full relative">
                        <div className="md:hidden w-full h-[21rem] bg-[#2E7D32] absolute text-[#2E7D32] z-10">hello</div>
                        <CardContribute data={user} challenges={challenges} />
                        <ContributeTable challenges={challenges} />
                    </div>
                </div>
            </div>
            <div className="mt-28">
            <Footer />
            </div>
            <StickyCtaButton />
        </div>
    );
};

export default ContributePage;
