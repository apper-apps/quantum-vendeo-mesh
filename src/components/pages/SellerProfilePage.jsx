import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import SellerProfileCard from "@/components/molecules/SellerProfileCard"
import ProductCard from "@/components/molecules/ProductCard"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Avatar from "@/components/atoms/Avatar"
import ApperIcon from "@/components/ApperIcon"
import { userService } from "@/services/api/userService"
import { productService } from "@/services/api/productService"
import { formatDistance } from "date-fns"

const SellerProfilePage = () => {
  const { id } = useParams()
  const [seller, setSeller] = useState(null)
  const [sellerProducts, setSellerProducts] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("listings") // listings, reviews, about

  const loadSellerData = async () => {
    try {
      setLoading(true)
      setError("")
      
      // Load seller profile
      const sellerData = await userService.getById(id)
      if (!sellerData) {
        throw new Error("Seller not found")
      }
      setSeller(sellerData)

      // Load seller's products
      const products = await productService.getSellerProducts(id)
      setSellerProducts(products)

      // Load seller reviews (mock data for demo)
      const mockReviews = [
        {
          Id: 1,
          reviewerName: "Sarah Johnson",
          reviewerAvatar: null,
          rating: 5,
          comment: "Excellent seller! Item was exactly as described and shipped quickly. Great communication throughout the process.",
          productName: "iPhone 13 Pro",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        },
        {
          Id: 2,
          reviewerName: "Mike Chen",
          reviewerAvatar: null,
          rating: 4,
          comment: "Good condition item, minor wear but priced fairly. Would buy from this seller again.",
          productName: "MacBook Air",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
        },
        {
          Id: 3,
          reviewerName: "Lisa Wong",
          reviewerAvatar: null,
          rating: 5,
          comment: "Amazing experience! Very responsive and honest about the item condition. Highly recommend!",
          productName: "Nike Air Jordan",
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 2 weeks ago
        }
      ]
      setReviews(mockReviews)

    } catch (err) {
      setError(err.message || "Failed to load seller data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSellerData()
  }, [id])

  if (loading) {
    return <Loading message="Loading seller profile..." />
  }

  if (error) {
    return <Error message={error} onRetry={loadSellerData} />
  }

  if (!seller) {
    return <Error message="Seller not found" />
  }

  const activeProducts = sellerProducts.filter(p => p.status !== "sold")
  const soldProducts = sellerProducts.filter(p => p.status === "sold")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Seller Profile */}
          <div className="lg:col-span-1">
            <SellerProfileCard seller={seller} />
            
            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-medium text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Response time:</span>
                  <span className="font-medium">Within 1 hour</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Ships from:</span>
                  <span className="font-medium">{seller.location?.city}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last active:</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
              {[
                { key: "listings", label: "Listings", count: activeProducts.length },
                { key: "reviews", label: "Reviews", count: reviews.length },
                { key: "about", label: "About" }
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
                {/* Active Listings */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold text-xl text-gray-900">
                      Active Listings ({activeProducts.length})
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Sort:</span>
                      <select className="border border-gray-200 rounded px-2 py-1 text-sm">
                        <option>Newest first</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                      </select>
                    </div>
                  </div>

                  {activeProducts.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                      <ApperIcon name="Package" size={48} className="text-gray-400 mx-auto mb-4" />
                      <h3 className="font-medium text-gray-900 mb-2">No active listings</h3>
                      <p className="text-gray-600">This seller doesn't have any active listings at the moment.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {activeProducts.map((product) => (
                        <ProductCard key={product.Id} product={product} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Recently Sold */}
                {soldProducts.length > 0 && (
                  <div>
                    <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                      Recently Sold ({soldProducts.length})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {soldProducts.slice(0, 4).map((product) => (
                        <div key={product.Id} className="relative">
                          <ProductCard product={product} />
                          <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                            <Badge variant="success" size="lg">
                              SOLD
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-xl text-gray-900">
                    Reviews ({reviews.length})
                  </h2>
                </div>

                {/* Reviews Summary */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {seller.rating}
                      </div>
                      <div className="flex items-center justify-center mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <ApperIcon 
                            key={i}
                            name="Star" 
                            size={18}
                            className={i < Math.floor(seller.rating) ? "text-warning fill-warning" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        Overall rating
                      </p>
                    </div>

                    <div className="col-span-2">
                      <h3 className="font-medium text-gray-900 mb-3">Rating breakdown</h3>
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const count = reviews.filter(r => r.rating === stars).length
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                        
                        return (
                          <div key={stars} className="flex items-center mb-2">
                            <span className="w-8 text-sm text-gray-600">{stars}</span>
                            <ApperIcon name="Star" size={12} className="text-warning fill-warning mx-1" />
                            <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-warning rounded-full h-2 transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="w-8 text-sm text-gray-600">{count}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.Id} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-start space-x-4">
                        <Avatar size="md" fallback={review.reviewerName[0]} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              {review.reviewerName}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {formatDistance(review.date, new Date(), { addSuffix: true })}
                            </span>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <ApperIcon 
                                key={i}
                                name="Star" 
                                size={14}
                                className={i < review.rating ? "text-warning fill-warning" : "text-gray-300"}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">
                              for {review.productName}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
                  About {seller.name}
                </h2>

                {seller.bio ? (
                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {seller.bio}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic mb-6">
                    This seller hasn't added a bio yet.
                  </p>
                )}

                {/* Seller Stats */}
                <div className="border-t pt-6">
                  <h3 className="font-medium text-gray-900 mb-4">Seller Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Calendar" size={16} className="text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Member since</span>
                        <div className="font-medium">
                          {new Date(seller.joinedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="MapPin" size={16} className="text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Location</span>
                        <div className="font-medium">
                          {seller.location?.city}, {seller.location?.state}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Clock" size={16} className="text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Typical response time</span>
                        <div className="font-medium">Within 1 hour</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="ShoppingBag" size={16} className="text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-500">Total sales</span>
                        <div className="font-medium">{seller.totalSales} items</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                {(seller.verified || seller.topRated || seller.fastShipper) && (
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-medium text-gray-900 mb-3">Badges</h3>
                    <div className="flex flex-wrap gap-2">
                      {seller.verified && (
                        <Badge variant="success" size="md" className="flex items-center space-x-1">
                          <ApperIcon name="CheckCircle" size={14} />
                          <span>Verified Seller</span>
                        </Badge>
                      )}
                      {seller.topRated && (
                        <Badge variant="warning" size="md" className="flex items-center space-x-1">
                          <ApperIcon name="Star" size={14} />
                          <span>Top Rated</span>
                        </Badge>
                      )}
                      {seller.fastShipper && (
                        <Badge variant="info" size="md" className="flex items-center space-x-1">
                          <ApperIcon name="Zap" size={14} />
                          <span>Fast Shipper</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerProfilePage