import { useState } from "react"
import Avatar from "@/components/atoms/Avatar"
import ApperIcon from "@/components/ApperIcon"
import { formatDistance } from "date-fns"

const MessageBubble = ({ message, isOwn = false, showAvatar = true }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying)
    // Audio playback logic would go here
  }

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex ${isOwn ? "flex-row-reverse" : "flex-row"} max-w-[70%] items-end space-x-2`}>
        {showAvatar && !isOwn && (
          <Avatar size="sm" fallback={message.senderName?.[0]} />
        )}

        <div className={`${isOwn ? "ml-2" : "mr-2"}`}>
          {/* Message Bubble */}
          <div
            className={`px-4 py-3 rounded-2xl ${
              isOwn
                ? "bg-gradient-primary text-white rounded-br-md"
                : "bg-gray-100 text-gray-900 rounded-bl-md"
            } shadow-sm`}
          >
            {message.type === "text" ? (
              <p className="text-sm leading-relaxed">{message.content}</p>
            ) : message.type === "audio" ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePlayAudio}
                  className={`p-2 rounded-full ${
                    isOwn ? "bg-white/20 hover:bg-white/30" : "bg-primary hover:bg-primary/90"
                  } transition-colors`}
                >
                  <ApperIcon 
                    name={isPlaying ? "Pause" : "Play"} 
                    size={16} 
                    className={isOwn ? "text-white" : "text-white"}
                  />
                </button>
                
                {/* Audio Waveform Visualization */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full ${
                        isOwn ? "bg-white/60" : "bg-gray-400"
                      } ${
                        isPlaying && i <= 8 ? "animate-pulse" : ""
                      }`}
                      style={{
                        height: `${Math.random() * 20 + 8}px`,
                        animationDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </div>
                
                <span className={`text-xs ${isOwn ? "text-white/80" : "text-gray-600"}`}>
                  0:{message.duration || "15"}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ApperIcon name="Image" size={16} />
                <span className="text-sm">Image</span>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <div className={`mt-1 text-xs text-gray-500 ${isOwn ? "text-right" : "text-left"}`}>
            {formatDistance(new Date(message.timestamp), new Date(), { addSuffix: true })}
            {message.isRead && isOwn && (
              <ApperIcon name="Check" size={12} className="inline ml-1 text-primary" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageBubble