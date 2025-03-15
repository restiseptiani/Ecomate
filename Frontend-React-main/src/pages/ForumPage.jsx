import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroForum from "../components/ForumPage/HeroForum";
import ForumPost from "../components/ForumPage/ForumPost";
import useAuthStore from "../stores/useAuthStore";
import StickyCtaButton from "../components/StickyCtaButton";
import { useNavigate } from "react-router";
import { Toast } from "../utils/function/toast";
import api from "../services/api";

const ForumPage = () => {
  const { token } = useAuthStore();
  
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [forums, setForums] = useState([]);
  const [filteredForums, setFilteredForums] = useState([]); // State untuk forum yang sudah difilter
  const [posted, setPosted] = useState(true);
  const [metaData, setMetaData] = useState({});
  const [updated, setUpdated] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleOnPosted = (onPosted) => {
    setPosted(onPosted);
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getForum();
  }, [currentPage]); // Dipanggil saat currentPage berubah

  const getForum = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/forums?page=${currentPage}`);
      const responseUser = await api.get(`/users/profile`);
      setUser(responseUser.data.data);
      setForums(response.data.data);
      setMetaData(response.data.metadata);
      filterByUpdatedAt(response.data.data); // Panggil fungsi filter
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Fungsi untuk memfilter forum berdasarkan updated_at
  const filterByUpdatedAt = (forumsData) => {
    const sortedForums = [...forumsData].sort((a, b) => b.views - a.views);
    setFilteredForums(sortedForums);
  };
  
  useEffect(() => {
    if (posted) {
      getForum();
      setPosted(false);
    }
  }, [posted]);

  useEffect(() => {
    if (!token) {
      Toast.fire({
        icon: "warning",
        title: "Anda harus login terlebih dahulu",
      });
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query); // Mengupdate state dengan nilai input
  };

  return (
    <div className="bg-secondary">
      <Navbar active="forum" />
      <div className="min-h-screen">
        <HeroForum
          onPosted={handleOnPosted}
          edit={updated}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          onSearchSubmit={handleSearchSubmit}
        />
        <ForumPost
          forums={forums} // Kirim data yang sudah difilter
          forumsSorted={filteredForums}
          metaData={metaData}
          curPage={handleCurrentPage}
          isLoading={isLoading}
          user={user}
          onPosted={handleOnPosted}
          query={searchQuery}
        />
      </div>
      <Footer />
      <StickyCtaButton />
    </div>
  );
};

export default ForumPage;
