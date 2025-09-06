import { useState } from "react"
import SearchBar from "@/components/molecules/SearchBar"
import FilterBar from "@/components/molecules/FilterBar"
import ProductGrid from "@/components/organisms/ProductGrid"
import ReferralCard from "@/components/molecules/ReferralCard"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({})
  const [showReferralCard, setShowReferralCard] = useState(true)

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const referralData = {
    totalEarnings: 127.50,
    totalReferrals: 15,
    monthlyReferrals: 3,
    referralLink: "https://vendeo.app/ref/user123",
    recentActivity: [
      { userName: "Sarah", reward: 5, status: "Paid", timestamp: new Date() },
      { userName: "Mike", reward: 5, status: "Pending", timestamp: new Date() },
      { userName: "Lisa", reward: 5, status: "Paid", timestamp: new Date() }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Discover amazing deals from your local community
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search products, brands, or categories..."
            className="mb-4"
          />
          
          <FilterBar 
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/sell")}
            className="h-16 flex-col space-y-1"
          >
            <ApperIcon name="Plus" size={20} />
            <span className="text-sm">Sell Item</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate("/messages")}
            className="h-16 flex-col space-y-1"
          >
            <ApperIcon name="MessageCircle" size={20} />
            <span className="text-sm">Messages</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate("/referrals")}
            className="h-16 flex-col space-y-1 relative"
          >
            <ApperIcon name="Users" size={20} />
            <span className="text-sm">Referrals</span>
            <Badge variant="success" size="xs" className="absolute -top-1 -right-1">
              $5
            </Badge>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate("/profile")}
            className="h-16 flex-col space-y-1"
          >
            <ApperIcon name="User" size={20} />
            <span className="text-sm">Profile</span>
          </Button>
        </div>

        {/* Referral Promotion */}
        {showReferralCard && (
          <div className="mb-6 relative">
            <ReferralCard 
              referralData={referralData}
              className="max-w-md mx-auto lg:max-w-none"
            />
            <button
              onClick={() => setShowReferralCard(false)}
              className="absolute top-2 right-2 text-white/60 hover:text-white/80 transition-colors"
            >
              <ApperIcon name="X" size={16} />
            </button>
          </div>
        )}

        {/* Category Highlights */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-xl text-gray-900">
              Popular Categories
            </h2>
            <Button variant="ghost" size="sm">
              View All
              <ApperIcon name="ChevronRight" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Electronics", icon: "Smartphone", color: "bg-blue-500" },
              { name: "Fashion", icon: "Shirt", color: "bg-pink-500" },
              { name: "Home", icon: "Home", color: "bg-green-500" },
              { name: "Sports", icon: "Dumbbell", color: "bg-orange-500" },
              { name: "Books", icon: "BookOpen", color: "bg-purple-500" },
              { name: "Automotive", icon: "Car", color: "bg-red-500" }
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-xl p-4 text-center cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => setFilters({ categories: [category.name] })}
              >
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <ApperIcon name={category.icon} size={20} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured/Trending Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-xl text-gray-900">
              Trending Now
            </h2>
            <div className="flex space-x-2">
              <Badge variant="primary" size="sm">🔥 Hot</Badge>
              <Badge variant="secondary" size="sm">⭐ Featured</Badge>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-xl text-gray-900">
              {searchQuery ? `Results for "${searchQuery}"` : "Latest Listings"}
            </h2>
            
            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          <ProductGrid 
            searchQuery={searchQuery}
            filters={filters}
            showAds={true}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage