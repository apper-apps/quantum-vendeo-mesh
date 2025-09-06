import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Avatar from "@/components/atoms/Avatar"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const SellerProfileCard = ({ seller, compact = false, className = "" }) => {
  const navigate = useNavigate()
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing)
  }

  const handleMessageClick = () => {
    navigate(`/chat/new?sellerId=${seller.Id}`)
  }

  const handleProfileClick = () => {
    navigate(`/seller/${seller.Id}`)
  }

  if (compact) {
    return (
      <div 
        className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors ${className}`}
        onClick={handleProfileClick}
      >
        <Avatar size="md" fallback={seller.name[0]} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-900 truncate">{seller.name}</h3>
            {seller.verified && (
              <ApperIcon name="CheckCircle" size={16} className="text-primary flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <ApperIcon name="Star" size={12} className="text-warning fill-warning" />
              <span className="text-sm text-gray-600 ml-1">
                {seller.rating} ({seller.reviewCount})
              </span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {seller.totalSales} sales
            </span>
          </div>
        </div>
        <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
      </div>
    )
  }

  return (
    <Card className={`${className}`}>
      <div className="text-center">
        {/* Avatar and Basic Info */}
        <div className="relative inline-block mb-4">
          <Avatar size="2xl" fallback={seller.name[0]} />
          {seller.verified && (
            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
              <ApperIcon name="Check" size={12} className="text-white" />
            </div>
          )}
        </div>

        <h2 className="font-display font-bold text-xl text-gray-900 mb-1">
          {seller.name}
        </h2>

        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <ApperIcon name="Star" size={14} className="text-warning fill-warning mr-1" />
            <span>{seller.rating}</span>
            <span className="text-gray-400 mx-1">•</span>
            <span>{seller.reviewCount} reviews</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div>
            <div className="font-bold text-lg text-gray-900">
              {seller.totalSales}
            </div>
            <div className="text-sm text-gray-500">Sales</div>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">
              {seller.followers || 0}
            </div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">
              {seller.activeListings}
            </div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
        </div>

        {/* Member Since */}
        <div className="text-sm text-gray-500 mb-4">
          <ApperIcon name="Calendar" size={14} className="inline mr-1" />
          Member since {new Date(seller.joinedAt).getFullYear()}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {seller.verified && <Badge variant="success" size="sm">Verified</Badge>}
          {seller.topRated && <Badge variant="warning" size="sm">Top Rated</Badge>}
          {seller.fastShipper && <Badge variant="info" size="sm">Fast Shipper</Badge>}
          {seller.responseTime && seller.responseTime < 60 && (
            <Badge variant="secondary" size="sm">Quick Response</Badge>
          )}
        </div>

        {/* Location */}
        {seller.location && (
          <div className="text-sm text-gray-600 mb-6">
            <ApperIcon name="MapPin" size={14} className="inline mr-1" />
            {seller.location.city}, {seller.location.state}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant={isFollowing ? "secondary" : "outline"}
            size="sm"
            onClick={handleFollowClick}
            className="flex-1"
          >
            <ApperIcon name={isFollowing ? "UserCheck" : "UserPlus"} size={16} />
            {isFollowing ? "Following" : "Follow"}
          </Button>
          
          <Button
            size="sm"
            onClick={handleMessageClick}
            className="flex-1"
          >
            <ApperIcon name="MessageCircle" size={16} />
            Message
          </Button>
        </div>

        {/* Bio */}
        {seller.bio && (
          <div className="mt-6 pt-4 border-t text-sm text-gray-600 text-left">
            <h4 className="font-medium text-gray-900 mb-2">About</h4>
            <p>{seller.bio}</p>
          </div>
        )}
      </div>
    </Card>
  )
}

export default SellerProfileCard