import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import HomePage from "@/components/pages/HomePage"
import SearchPage from "@/components/pages/SearchPage"
import MessagesPage from "@/components/pages/MessagesPage"
import ProfilePage from "@/components/pages/ProfilePage"
import SellPage from "@/components/pages/SellPage"
import ProductDetailPage from "@/components/pages/ProductDetailPage"
import SellerProfilePage from "@/components/pages/SellerProfilePage"
import ReferralPage from "@/components/pages/ReferralPage"
import ChatPage from "@/components/pages/ChatPage"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="sell" element={<SellPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="seller/:id" element={<SellerProfilePage />} />
            <Route path="referrals" element={<ReferralPage />} />
            <Route path="chat/:chatId" element={<ChatPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App