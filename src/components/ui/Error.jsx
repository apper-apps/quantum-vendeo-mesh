import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  actionText = "Try Again",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {/* Error Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertCircle" size={32} className="text-error" />
      </div>
      
      {/* Error Message */}
      <h2 className="font-display font-bold text-xl text-gray-900 mb-2">
        Oops! Something went wrong
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        {message}
      </p>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button 
            onClick={onRetry}
            icon="RefreshCw"
            className="min-w-[140px]"
          >
            {actionText}
          </Button>
        )}
        
        <Button 
          variant="outline"
          onClick={() => window.location.reload()}
          icon="Home"
          className="min-w-[140px]"
        >
          Go Home
        </Button>
      </div>
      
      {/* Help Text */}
      <div className="mt-8 text-sm text-gray-500">
        <p>Still having trouble? Try refreshing the page or</p>
        <button className="text-primary hover:underline font-medium">
          contact support
        </button>
      </div>
    </div>
  )
}

export default Error