import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ChatInterface from "@/components/organisms/ChatInterface"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { messageService } from "@/services/api/messageService"
import { userService } from "@/services/api/userService"

const ChatPage = () => {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const [chatData, setChatData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadChatData = async () => {
    try {
      setLoading(true)
      setError("")
      
      if (chatId === "new") {
        // Handle new chat creation from URL params
        const urlParams = new URLSearchParams(window.location.search)
        const sellerId = urlParams.get("sellerId")
        const productId = urlParams.get("productId")
        
        if (sellerId) {
          const seller = await userService.getById(sellerId)
          setChatData({
            chatId: `new-${Date.now()}`,
            recipientName: seller.name,
            recipientId: sellerId,
            productId: productId
          })
        } else {
          throw new Error("Missing chat parameters")
        }
      } else {
        // Load existing chat
        const conversation = await messageService.getConversationById(chatId)
        setChatData({
          chatId: conversation.chatId,
          recipientName: conversation.participantName,
          recipientId: conversation.participantId,
          productId: conversation.productId
        })
      }
      
    } catch (err) {
      setError(err.message || "Failed to load chat")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadChatData()
  }, [chatId])

  if (loading) {
    return <Loading message="Loading chat..." />
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadChatData}
        actionText="Go to Messages"
        onAction={() => navigate("/messages")}
      />
    )
  }

  if (!chatData) {
    return <Error message="Chat not found" />
  }

  return (
    <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)]">
      <ChatInterface
        chatId={chatData.chatId}
        recipientName={chatData.recipientName}
        className="h-full"
      />
    </div>
  )
}

export default ChatPage