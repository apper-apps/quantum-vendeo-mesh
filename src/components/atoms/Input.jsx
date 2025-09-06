import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Input = forwardRef(({ 
  type = "text",
  label,
  error,
  icon,
  iconPosition = "left",
  className,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <ApperIcon name={icon} size={20} />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "input-field",
            icon && iconPosition === "left" && "pl-10",
            icon && iconPosition === "right" && "pr-10",
            error && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <ApperIcon name={icon} size={20} />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input