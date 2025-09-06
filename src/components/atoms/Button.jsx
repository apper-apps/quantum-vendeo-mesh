import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon,
  iconPosition = "left",
  disabled = false,
  className,
  ...props 
}, ref) => {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary bg-white",
    ghost: "text-primary hover:bg-primary/10",
    danger: "bg-error text-white hover:bg-error/90"
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  }

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <ApperIcon name={icon} size={18} />
      )}
      {children}
      {icon && iconPosition === "right" && (
        <ApperIcon name={icon} size={18} />
      )}
    </button>
  )
})

Button.displayName = "Button"

export default Button