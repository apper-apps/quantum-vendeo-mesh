import { useLocation, useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import { motion } from "framer-motion"

const BottomNavigation = ({ className = "" }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: "/", label: "Home", icon: "Home" },
    { path: "/search", label: "Search", icon: "Search" },
    { path: "/sell", label: "Sell", icon: "Plus", isSpecial: true },
    { path: "/messages", label: "Messages", icon: "MessageCircle" },
    { path: "/profile", label: "Profile", icon: "User" }
  ]

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40 ${className}`}>
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          
          if (item.isSpecial) {
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative -mt-4"
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-full shadow-lg flex items-center justify-center">
                  <ApperIcon name={item.icon} size={24} className="text-white" />
                </div>
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary">
                  {item.label}
                </span>
              </motion.button>
            )
          }

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center py-2 px-3 min-w-0"
              whileTap={{ scale: 0.9 }}
            >
              <div className={`p-1 ${isActive ? "text-primary" : "text-gray-400"}`}>
                <ApperIcon 
                  name={item.icon} 
                  size={20}
                  className={isActive ? "text-primary" : "text-gray-400"}
                />
              </div>
              <span className={`text-xs font-medium mt-1 ${
                isActive ? "text-primary" : "text-gray-400"
              }`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation