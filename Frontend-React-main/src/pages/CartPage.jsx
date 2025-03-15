import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroBanner from "../components/CartPage/HeroBanner";
import CartHeader from "../components/CartPage/CartHeader";
import CardProducts from "../components/CartPage/CardProducts";
import CartFooter from "../components/CartPage/CartFooter";
import useCart from "../hooks/useCart";
import catalogBg from "../assets/jpg/bg-catalog.jpg";
import StickyCtaButton from "../components/StickyCtaButton";
const CartPage = () => {

    const cart = useCart();

    return (
        <div className="flex flex-col min-h-screen bg-secondary">
            <Navbar />
            <HeroBanner currentPage="Keranjang" background={catalogBg} />

            {/* Header Cart */}
            <div className="w-full max-w-[1328px] mx-auto">
                <CartHeader />
                <CardProducts products={cart.products} {...cart} />
                <CartFooter products={cart.products} {...cart} />
            </div>
            <Footer />
            <StickyCtaButton />
        </div>
    );
};

export default CartPage;
