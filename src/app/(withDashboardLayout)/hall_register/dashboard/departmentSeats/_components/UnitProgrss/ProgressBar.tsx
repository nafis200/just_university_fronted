"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
// import "./ProgressBar.css" // Import the CSS file

type ProgressVariant = "default" | "success" | "warning" | "error" | "gradient" | "animated"

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value?: number
  variant?: ProgressVariant
  showPercentage?: boolean
  size?: "sm" | "md" | "lg"
}

const variantStyles = {
  default: "bg-blue-500",
  success: "bg-gradient-to-r from-green-400 to-emerald-500",
  warning: "bg-gradient-to-r from-yellow-400 to-orange-500",
  error: "bg-gradient-to-r from-red-400 to-pink-500",
  gradient: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient",
  animated: "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient"
}

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4"
}

function ProgressBar({
  className,
  value = 0,
  variant = "gradient",
  showPercentage = false,
  size = "md",
  ...props
}: ProgressProps) {
  return (
    <div className="w-full space-y-2">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 shadow-inner",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "h-full w-full flex-1 transition-all duration-500 ease-out shadow-lg",
            variantStyles[variant],
            variant === "animated" && "animate-shimmer"
          )}
          style={{ 
            transform: `translateX(-${100 - (value || 0)}%)`,
          }}
        />
      </ProgressPrimitive.Root>
      
      {showPercentage && (
        <div className="flex justify-between items-center text-xs font-medium">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className={cn(
            "font-bold",
            value >= 100 ? "text-green-600" : "text-gray-700 dark:text-gray-300"
          )}>
            {Math.round(value)}%
          </span>
        </div>
      )}
    </div>
  )
}

export { ProgressBar }
