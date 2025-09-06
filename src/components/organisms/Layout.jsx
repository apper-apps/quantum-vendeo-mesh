import { Outlet } from "react-router-dom"
import Header from "@/components/organisms/Header"
import BottomNavigation from "@/components/organisms/BottomNavigation"

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header className="sticky top-0 z-30" />
      
      <main className="flex-1 pb-20 lg:pb-8">
        <Outlet />
      </main>
      
      <BottomNavigation className="lg:hidden" />
    </div>
  )
}

export default Layout