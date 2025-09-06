import { useState, useEffect, useRef } from "react"
import MessageBubble from "@/components/molecules/MessageBubble"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { messageService } from "@/services/api/messageService"
import { toast } from "react-toastify"

const ChatInterface = ({ chatId, recipientName, className = "" }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const messagesEndRef = useRef(null)
  const recordingInterval = useRef(null)

  const loadMessages = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await messageService.getChatMessages(chatId)
      setMessages(data)
    } catch (err) {
      setError(err.message || "Failed to load messages")
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (content, type = "text") => {
    if (!content.trim()) return

    try {
      const message = {
        chatId,
        senderId: "current-user", // This would come from auth context
        content,
        type,
        timestamp: new Date().toISOString(),
        isRead: false
      }

      const savedMessage = await messageService.create(message)
      setMessages(prev => [...prev, savedMessage])
      setNewMessage("")
      
      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
      
    } catch (err) {
      toast.error("Failed to send message")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(newMessage)
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    recordingInterval.current = setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
    
    // Start audio recording here
    toast.info("Recording started...")
  }

  const stopRecording = () => {
    setIsRecording(false)
    clearInterval(recordingInterval.current)
    
    // Stop audio recording and send
    const audioMessage = `Audio message (${recordingTime}s)`
    sendMessage(audioMessage, "audio")
    setRecordingTime(0)
    toast.success("Voice message sent!")
  }

  useEffect(() => {
    loadMessages()
  }, [chatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className={`flex flex-col h-full bg-gray-50 ${className}`}>
      {/* Chat Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center space-x-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{recipientName}</h3>
            <p className="text-sm text-gray-500">Active now</p>
          </div>
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <ApperIcon name="Phone" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <ApperIcon name="Video" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <ApperIcon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading && (
          <div className="text-center py-4">
            <div className="inline-flex items-center space-x-2 text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Loading messages...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-4">
            <p className="text-red-500 mb-2">{error}</p>
            <Button variant="outline" size="sm" onClick={loadMessages}>
              Try Again
            </Button>
          </div>
        )}

        {messages.map((message, index) => {
          const isOwn = message.senderId === "current-user"
          const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId
          
          return (
            <MessageBubble
              key={message.Id}
              message={message}
              isOwn={isOwn}
              showAvatar={showAvatar}
            />
          )
        })}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        {isRecording && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-red-600">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Recording...</span>
                <span className="text-sm">{Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}</span>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={stopRecording}
              >
                <ApperIcon name="Square" size={14} />
                Stop
              </Button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="rounded-full"
              disabled={isRecording}
            />
          </div>

          <div className="flex space-x-2">
            {/* Voice Recording Button */}
            <Button
              type="button"
              variant={isRecording ? "danger" : "outline"}
              size="md"
              onClick={isRecording ? stopRecording : startRecording}
              className="rounded-full px-3"
            >
              <ApperIcon name={isRecording ? "Square" : "Mic"} size={16} />
            </Button>

            {/* Send Button */}
            <Button
              type="submit"
              disabled={!newMessage.trim() || isRecording}
              className="rounded-full px-4"
            >
              <ApperIcon name="Send" size={16} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface