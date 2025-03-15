import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Carousel from "../components/LandingPage/Product";
import AboutUsLanding from "../components/LandingPage/AboutUs-Landing";
import ChallangeLanding from "../components/LandingPage/Challange";
import Faq from "../components/LandingPage/Faq";
import Testimoni from "../components/LandingPage/Testimoni";
import ContactUs from "../components/LandingPage/ContactUs";
import Footer from "../components/Footer";
import StickyCtaButton from "../components/StickyCtaButton";
import BgHero from "../assets/webp/bg-hero.webp";
import { useLocation } from "react-router";
const LandingPage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === "#about-us") {
            const element = document.getElementById("about-us");
            if (element) {
                // Hitung posisi elemen dengan offset
                const offset = -200; // Sesuaikan jarak offset (misalnya -100px)
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition + offset;

                // Scroll ke posisi dengan offset
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        }
    }, [location]);
    return (
        <div className="flex flex-col min-h-screen w-full bg-secondary">
            <Navbar active="home" />
            <Hero text="Jadilah Bagian dari Perubahan, Mulai Gaya Hidup Ramah Lingkungan Bersama Ecomate!" button="Yuk Bantu Selamatkan Bumi !" image={BgHero} link="/tantangan" />
            <Carousel />
            <div id="about-us">
            <AboutUsLanding />
            </div>
            <ChallangeLanding />
            <Faq />
            <Testimoni />
            <ContactUs />
            <Footer />
            <StickyCtaButton />
        </div>
    );
};

export default LandingPage;
