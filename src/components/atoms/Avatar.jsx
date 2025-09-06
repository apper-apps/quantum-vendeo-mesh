import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Avatar = forwardRef(({ 
  src,
  alt = "",
  size = "md",
  fallback,
  className,
  ...props 
}, ref) => {
  const sizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center justify-center rounded-full bg-gradient-primary overflow-hidden",
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : fallback ? (
        <span className="text-white font-medium text-sm">
          {fallback}
        </span>
      ) : (
        <ApperIcon name="User" className="text-white" size={16} />
      )}
    </div>
  )
})

Avatar.displayName = "Avatar"

export default Avatar