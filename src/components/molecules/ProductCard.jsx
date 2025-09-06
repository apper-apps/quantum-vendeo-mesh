import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import Avatar from "@/components/atoms/Avatar"
import ApperIcon from "@/components/ApperIcon"
import { formatDistance } from "date-fns"

const ProductCard = ({ product, className = "" }) => {
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const handleProductClick = () => {
    navigate(`/product/${product.Id}`)
  }

  const handleSellerClick = (e) => {
    e.stopPropagation()
    navigate(`/seller/${product.sellerId}`)
  }

  const handleLikeClick = (e) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const handleImageChange = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      )
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <Card 
      className={`cursor-pointer overflow-hidden ${className}`}
      padding="none"
      onClick={handleProductClick}
    >
      {/* Product Image with Carousel */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Image Navigation */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleImageChange("prev")
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
            >
              <ApperIcon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleImageChange("next")
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
            >
              <ApperIcon name="ChevronRight" size={16} />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex 
                      ? "bg-white" 
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isSponsored && (
            <Badge variant="sponsored" size="xs">
              Sponsored
            </Badge>
          )}
          <Badge variant="primary" size="xs">
            {product.condition}
          </Badge>
        </div>

        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-all duration-200 hover:scale-110"
        >
          <ApperIcon 
            name={isLiked ? "Heart" : "Heart"} 
            size={16}
            className={isLiked ? "fill-red-500 text-red-500" : ""}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-semibold text-gray-900 text-lg line-clamp-1">
            {product.title}
          </h3>
          <div className="text-xl font-bold text-primary ml-2">
            ${product.price.toLocaleString()}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 -m-1 p-1 rounded-lg transition-colors"
            onClick={handleSellerClick}
          >
            <Avatar size="sm" fallback={product.sellerName?.[0]} />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {product.sellerName}
              </p>
              <div className="flex items-center space-x-1">
                <ApperIcon name="Star" size={12} className="text-warning fill-warning" />
                <span className="text-xs text-gray-600">
                  {product.sellerRating} ({product.sellerReviews})
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            {formatDistance(new Date(product.createdAt), new Date(), { addSuffix: true })}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mt-2 text-gray-500">
          <ApperIcon name="MapPin" size={12} className="mr-1" />
          <span className="text-xs">
            {product.location.city}, {product.location.state}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 mt-3">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/chat/new?productId=${product.Id}`)
            }}
          >
            <ApperIcon name="MessageCircle" size={14} />
            Message
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              // Share functionality
            }}
          >
            <ApperIcon name="Share2" size={14} />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ProductCard