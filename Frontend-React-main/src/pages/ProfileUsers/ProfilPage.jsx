import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Profil from "../../components/ProfilePage/Profil";
import StickyCtaButton from "../../components/StickyCtaButton";
const ProfilPage = () => {
    return (
        <div className="bg-secondary">
            <Navbar active="profil" />
            <div className="min-h-screen max-w-[1328px] mx-auto bg-secondary">
                <Profil />
            </div>
            <Footer />
            <StickyCtaButton />
        </div>
    );
};

export default ProfilPage;
