import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import Avatar from "@/components/atoms/Avatar"
import Badge from "@/components/atoms/Badge"
import Card from "@/components/atoms/Card"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ProductCard from "@/components/molecules/ProductCard"
import ApperIcon from "@/components/ApperIcon"
import { userService } from "@/services/api/userService"
import { productService } from "@/services/api/productService"

const ProfilePage = () => {
  const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState(null)
  const [userListings, setUserListings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("listings") // listings, reviews, settings

  const loadProfile = async () => {
    try {
      setLoading(true)
      setError("")
      
      // Load user profile data
      const profile = await userService.getCurrentUser()
      setUserProfile(profile)
      
      // Load user's listings
      const listings = await productService.getSellerProducts(profile.Id)
      setUserListings(listings)
      
    } catch (err) {
      setError(err.message || "Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  if (loading) {
    return <Loading message="Loading profile..." />
  }

  if (error) {
    return <Error message={error} onRetry={loadProfile} />
  }

  if (!userProfile) {
    return <Error message="Profile not found" />
  }

  const stats = [
    { label: "Total Sales", value: userProfile.totalSales || 0, icon: "DollarSign" },
    { label: "Active Listings", value: userListings.filter(p => p.status === "active").length, icon: "Package" },
    { label: "Rating", value: `${userProfile.rating}/5`, icon: "Star" },
    { label: "Reviews", value: userProfile.reviewCount || 0, icon: "MessageSquare" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
            <div className="text-center sm:text-left">
              <Avatar size="2xl" fallback={userProfile.name[0]} className="mx-auto sm:mx-0 mb-4 sm:mb-0" />
              
              <div className="sm:ml-6">
                <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                  <h1 className="font-display font-bold text-2xl text-gray-900">
                    {userProfile.name}
                  </h1>
                  {userProfile.verified && (
                    <ApperIcon name="CheckCircle" size={20} className="text-primary" />
                  )}
                </div>
                
                <div className="flex items-center justify-center sm:justify-start space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <ApperIcon name="Star" size={14} className="text-warning fill-warning mr-1" />
                    <span>{userProfile.rating} ({userProfile.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="MapPin" size={14} className="mr-1" />
                    <span>{userProfile.location?.city}, {userProfile.location?.state}</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Calendar" size={14} className="mr-1" />
                    <span>Joined {new Date(userProfile.joinedAt).getFullYear()}</span>
                  </div>
                </div>

                {/* Subscription Status */}
                <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
                  <Badge 
                    variant={userProfile.subscriptionStatus === "active" ? "success" : "warning"}
                    size="sm"
                  >
                    {userProfile.subscriptionStatus === "active" ? "Pro Seller" : "Free Account"}
                  </Badge>
                  
                  {userProfile.subscriptionStatus === "active" && (
                    <span className="text-xs text-gray-500">
                      Next billing: {new Date(userProfile.nextBilling).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Button 
                    size="sm"
                    onClick={() => navigate("/sell")}
                    icon="Plus"
                  >
                    List New Item
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab("settings")}
                    icon="Settings"
                  >
                    Edit Profile
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/referrals")}
                    icon="Users"
                  >
                    Referrals (${userProfile.earnings?.toFixed(2) || "0.00"})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary/10 rounded-full mb-3">
                <ApperIcon name={stat.icon} size={20} className="text-primary" />
              </div>
              <div className="font-bold text-xl text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1">
          {[
            { key: "listings", label: "My Listings", count: userListings.length },
            { key: "reviews", label: "Reviews", count: userProfile.reviewCount },
            { key: "settings", label: "Settings" }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 relative"
            >
              {tab.label}
              {tab.count !== undefined && (
                <Badge 
                  variant={activeTab === tab.key ? "secondary" : "primary"} 
                  size="xs"
                  className="ml-2"
                >
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "listings" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-xl text-gray-900">
                Your Listings
              </h2>
              <Button 
                size="sm"
                onClick={() => navigate("/sell")}
                icon="Plus"
              >
                Add Listing
              </Button>
            </div>

            {userListings.length === 0 ? (
              <Card className="text-center py-12">
                <ApperIcon name="Package" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No listings yet</h3>
                <p className="text-gray-600 mb-4">
                  Start selling by creating your first listing
                </p>
                <Button onClick={() => navigate("/sell")}>
                  Create First Listing
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map((product) => (
                  <ProductCard key={product.Id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <Card>
            <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
              Reviews & Ratings
            </h2>
            
            {/* Reviews Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {userProfile.rating}
                </div>
                <div className="flex items-center justify-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <ApperIcon 
                      key={i}
                      name="Star" 
                      size={16}
                      className={i < Math.floor(userProfile.rating) ? "text-warning fill-warning" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Based on {userProfile.reviewCount} reviews
                </p>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {/* Sample reviews - would come from API */}
              {[
                {
                  reviewerName: "Sarah Johnson",
                  rating: 5,
                  comment: "Great seller! Item was exactly as described and shipped quickly.",
                  date: "2 days ago",
                  product: "iPhone 13 Pro"
                },
                {
                  reviewerName: "Mike Chen",
                  rating: 4,
                  comment: "Good condition item, minor wear but priced fairly.",
                  date: "1 week ago",
                  product: "MacBook Air"
                }
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-100 pb-4">
                  <div className="flex items-start space-x-3">
                    <Avatar size="sm" fallback={review.reviewerName[0]} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">
                          {review.reviewerName}
                        </span>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <ApperIcon 
                            key={i}
                            name="Star" 
                            size={12}
                            className={i < review.rating ? "text-warning fill-warning" : "text-gray-300"}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          for {review.product}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* Account Settings */}
            <Card>
              <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                Account Settings
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      className="input-field" 
                      defaultValue={userProfile.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="input-field" 
                      defaultValue={userProfile.email}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea 
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Tell buyers about yourself..."
                    defaultValue={userProfile.bio}
                  />
                </div>
                
                <Button>Save Changes</Button>
              </div>
            </Card>

            {/* Subscription Settings */}
            <Card>
              <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                Subscription
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {userProfile.subscriptionStatus === "active" ? "Pro Seller Plan" : "Free Account"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {userProfile.subscriptionStatus === "active" 
                        ? "$1/month - Unlimited listings" 
                        : "Limited features"}
                    </p>
                  </div>
                  {userProfile.subscriptionStatus !== "active" && (
                    <Button size="sm">Upgrade to Pro</Button>
                  )}
                </div>
                
                {userProfile.subscriptionStatus === "active" && (
                  <div className="text-sm text-gray-600">
                    Next billing date: {new Date(userProfile.nextBilling).toLocaleDateString()}
                  </div>
                )}
              </div>
            </Card>

            {/* Notification Settings */}
            <Card>
              <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                Notifications
              </h2>
              
              <div className="space-y-4">
                {[
                  { label: "Email notifications for new messages", key: "emailMessages" },
                  { label: "Push notifications for offers", key: "pushOffers" },
                  { label: "Weekly summary emails", key: "weeklySummary" },
                  { label: "Marketing emails", key: "marketing" }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <span className="text-gray-900">{setting.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage