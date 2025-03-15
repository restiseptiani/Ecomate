import HeroBanner from "../components/CartPage/HeroBanner";
import Navbar from "../components/Navbar";
import bgHero from "../assets/webp/bg-hero.webp";
import InputPayment from "../components/PaymentPage/InputPayment";
import DetailTransaction from "../components/PaymentPage/DetailTransaction";
import Footer from "../components/Footer";
import useCart from "../hooks/useCart";
import StickyCtaButton from "../components/StickyCtaButton";

const PaymentPage = () => {
    const cart = useCart();
    return (
        <div className="flex flex-col min-h-screen bg-secondary">
            <Navbar />
            <HeroBanner currentPage="Checkout" background={bgHero} />

            <div className="w-full max-w-[1328px] mx-auto max-[1375px]:px-6 pt-12 mb-24">
                <div className="flex flex-col justify-between mx-auto gap-8 tablet:flex-row">
                    <InputPayment />
                    <DetailTransaction {...cart} />
                </div>
            </div>
            <Footer />
            <StickyCtaButton />
        </div>
    );
};

export default PaymentPage;
