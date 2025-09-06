import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ 
  children,
  variant = "default",
  padding = "md",
  hover = true,
  className,
  ...props 
}, ref) => {
  const variants = {
    default: "card",
    outline: "border-2 border-gray-200 rounded-xl bg-white",
    ghost: "bg-transparent",
    gradient: "bg-gradient-primary text-white rounded-xl shadow-lg"
  }

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8"
  }

  return (
    <div
      ref={ref}
      className={cn(
        variants[variant],
        paddings[padding],
        !hover && "hover:scale-100 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card