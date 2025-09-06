import ApperIcon from "@/components/ApperIcon"

const Loading = ({ message = "Loading...", className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      {/* Product Card Skeletons */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Image Skeleton */}
              <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
              
              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                {/* Title and Price */}
                <div className="flex justify-between items-start">
                  <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded w-2/3" />
                  <div className="h-5 bg-gradient-primary/20 animate-pulse rounded w-16 ml-2" />
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded w-full" />
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded w-3/4" />
                </div>
                
                {/* Seller Info */}
                <div className="flex items-center space-x-2 mt-4">
                  <div className="w-8 h-8 bg-gradient-primary/20 animate-pulse rounded-full" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded w-20" />
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded w-16" />
                  </div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded w-12" />
                </div>
                
                {/* Buttons */}
                <div className="flex space-x-2 mt-4">
                  <div className="h-9 bg-gradient-primary/20 animate-pulse rounded-lg flex-1" />
                  <div className="h-9 w-9 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="flex items-center space-x-3 mt-8 text-gray-600">
        <div className="animate-spin">
          <ApperIcon name="Loader2" size={20} className="text-primary" />
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
      
      {/* Shimmer Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer pointer-events-none" />
    </div>
  )
}

export default Loading