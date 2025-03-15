import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Detail from "../components/DetailForumPage/Detail";
import Footer from "../components/Footer";
import StickyCtaButton from "../components/StickyCtaButton";
import api from "../services/api";
const DetailForumPage = () => {
    const [forums, setForums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getForum();
    }, []);
    const getForum = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/forums`);
            setForums(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
        };
    return <div className="bg-secondary">
        <Navbar active="forum" />
        <div className="min-h-screen">
        <Detail forums={forums}/>
        </div>
        <Footer />
        <StickyCtaButton />
    </div>;
};

export default DetailForumPage;