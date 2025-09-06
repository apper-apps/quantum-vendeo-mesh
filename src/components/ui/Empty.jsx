import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "Nothing here yet", 
  description = "Items will appear here once available.",
  actionText = "Get Started",
  onAction,
  icon = "Package",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      {/* Empty State Illustration */}
      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 relative overflow-hidden">
        <ApperIcon name={icon} size={40} className="text-gray-400" />
        
        {/* Floating Elements for Visual Interest */}
        <div className="absolute top-2 right-2 w-3 h-3 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute bottom-3 left-3 w-2 h-2 bg-secondary/30 rounded-full animate-pulse delay-300" />
      </div>
      
      {/* Content */}
      <h2 className="font-display font-bold text-xl text-gray-900 mb-2">
        {title}
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {/* Call to Action */}
      {onAction && (
        <Button 
          onClick={onAction}
          icon="Plus"
          size="lg"
          className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          {actionText}
        </Button>
      )}
      
      {/* Additional Suggestions */}
      <div className="mt-8 text-sm text-gray-500 space-y-2">
        <p>Here are some things you can try:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center space-x-1 text-primary hover:underline">
            <ApperIcon name="Search" size={14} />
            <span>Browse products</span>
          </button>
          <button className="flex items-center space-x-1 text-primary hover:underline">
            <ApperIcon name="Plus" size={14} />
            <span>Create listing</span>
          </button>
          <button className="flex items-center space-x-1 text-primary hover:underline">
            <ApperIcon name="Users" size={14} />
            <span>Invite friends</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Empty