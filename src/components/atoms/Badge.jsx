import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  children,
  variant = "primary",
  size = "sm",
  className,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-primary text-white",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-success text-white",
    warning: "bg-warning text-black",
    error: "bg-error text-white",
    info: "bg-info text-white",
    sponsored: "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
  }

  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-sm",
    md: "px-3 py-1.5 text-base",
    lg: "px-4 py-2 text-lg"
  }

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge