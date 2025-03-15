import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import ListChallengePage from "./pages/ListChallengePage";
import CatalogProductPage from "./pages/CatalogProductPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import GuestRoute from "./routes/GuestRoute";
import LoginPage from "./pages/LoginPage";
import DetailProductPage from "./pages/DetailProductPage";
import CartPage from "./pages/CartPage";
import DetailChallengePage from "./pages/DetailChallengePage";
import Chatbot from "./pages/Chatbot";
import AdminLoginPage from "./pages/AdminPages/AdminLoginPage";
import AddProductPage from "./pages/AdminPages/AddProductPage";
import ForumPage from "./pages/ForumPage";
import PostMobile from "./components/ForumPage/PostMobile";
import ProtectedRoute from "./routes/ProtectedRoute";
import PaymentPage from "./pages/PaymentPage";
import DayChallengePage from "./pages/DayChallengePage";
import Dashboard from "./pages/AdminPages/Dashboard";
import UsersPage from "./pages/AdminPages/UsersPage";
import Products from "./pages/AdminPages/Products";
import ChallengePage from "./pages/AdminPages/ChallengePage";
import DetailForumPage from "./pages/DetailForumPage";
import AdminRoute from "./routes/AdminRoute";
import TransactionsPage from "./pages/AdminPages/TransactionsPage";
import ImpactsPage from "./pages/AdminPages/ImpactsPage";
import ProfilPage from "./pages/ProfileUsers/ProfilPage";
import ProfilChallengePage from "./pages/ProfileUsers/ProfilChallengePage";
import ContributePage from "./pages/ProfileUsers/ContributePage";
import OrdersPage from "./pages/ProfileUsers/OrdersPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/tantangan" element={<ListChallengePage />} />
                <Route path="/belanja" element={<CatalogProductPage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/detail-forum/:id" element={<DetailForumPage />} />
                <Route path="/post-mobile" element={<PostMobile />} />
                <Route path="/detail-produk/:id" element={<DetailProductPage />} />
                <Route path="/detail-tantangan/:id" element={<DetailChallengePage />} />
                <Route path="/detail-tantangan/:id/day" element={<DayChallengePage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Guest routes (untuk login dan register, hanya bisa diakses oleh user yang belum login) */}
                <Route element={<GuestRoute redirectPath="/" />}>
                    {/* End User Route */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route element={<GuestRoute redirectPath="/admin/dashboard" />}>
                    {/* Admin Route protected */}
                    <Route path="/login-admin" element={<AdminLoginPage />} />
                </Route>

                {/* Route yang diproteksi dan harus login dlu  */}
                <Route element={<ProtectedRoute />}>
                    {/* End User Route */}
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/chat" element={<Chatbot />} />
                    <Route path="/payment/:id" element={<PaymentPage />} />
                    <Route path="/profile" element={<ProfilPage />} />
                    <Route path="/profile/kontribusi" element={<ContributePage />} />
                    <Route path="/profile/challenge" element={<ProfilChallengePage />} />
                    <Route path="/profile/pesanan" element={<OrdersPage/>}/>

                </Route>

                <Route element={<AdminRoute />}>
                    {/* Admin Route */}
                    {/* email admin: admin2@ecomate.store pass : admin2 */}
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/pengguna" element={<UsersPage />} />
                    <Route path="/admin/produk" element={<Products />} />
                    <Route path="/admin/tantangan" element={<ChallengePage />} />
                    <Route path="/admin/pesanan" element={<TransactionsPage />} />
                    <Route path="/admin/kategori" element={<ImpactsPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
