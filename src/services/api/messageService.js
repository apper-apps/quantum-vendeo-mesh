import messagesData from "@/services/mockData/messages.json"

class MessageService {
  constructor() {
    this.messages = [...messagesData]
    
    // Generate conversations from unique chatIds in messages
    const uniqueChatIds = [...new Set(this.messages.map(m => m.chatId))]
    this.conversations = uniqueChatIds.map((chatId, index) => {
      const chatMessages = this.messages.filter(m => m.chatId === chatId)
      const lastMessage = chatMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]
      
      return {
        Id: index + 1,
        chatId,
        participants: ["current-user", `user-${chatId}`],
        lastMessage: lastMessage ? {
          content: lastMessage.content,
          type: lastMessage.type,
          timestamp: lastMessage.timestamp,
          senderId: lastMessage.senderId
        } : null,
        isRead: lastMessage?.isRead || false,
        createdAt: chatMessages[0]?.timestamp || new Date().toISOString()
      }
    })
    
    this.nextMessageId = Math.max(...this.messages.map(m => m.Id)) + 1
    this.nextConversationId = Math.max(...this.conversations.map(c => c.Id)) + 1
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

async getConversations() {
    await this.delay()
    return [...this.conversations]
  }

async getConversationById(chatId) {
    await this.delay()
    const conversation = this.conversations.find(c => c.chatId === chatId)
    return conversation ? { ...conversation } : null
  }

  async getChatMessages(chatId) {
    await this.delay()
    return this.messages
      .filter(m => m.chatId === chatId)
      .map(m => ({ ...m }))
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  }

  async create(messageData) {
    await this.delay()
    const newMessage = {
      ...messageData,
      Id: this.nextMessageId++,
      timestamp: new Date().toISOString()
    }
    this.messages.push(newMessage)
    
    // Update conversation with latest message
// Update conversation last message
    const conversationIndex = this.conversations.findIndex(c => c.chatId === messageData.chatId)
    if (conversationIndex !== -1) {
      this.conversations[conversationIndex].lastMessage = {
        content: newMessage.content,
        type: newMessage.type,
        timestamp: newMessage.timestamp,
        senderId: newMessage.senderId
      }
      this.conversations[conversationIndex].isRead = false
    } else {
      // Create new conversation if it doesn't exist
      const newConversation = {
        Id: this.nextConversationId++,
        chatId: messageData.chatId,
        participants: ["current-user", `user-${messageData.chatId}`],
        lastMessage: {
          content: newMessage.content,
          type: newMessage.type,
          timestamp: newMessage.timestamp,
          senderId: newMessage.senderId
        },
        isRead: false,
        createdAt: newMessage.timestamp
      }
      this.conversations.push(newConversation)
    }
    
    return { ...newMessage }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.messages.findIndex(m => m.Id === id)
    if (index === -1) {
      throw new Error("Message not found")
    }
    
    this.messages[index] = { ...this.messages[index], ...updates }
    return { ...this.messages[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.messages.findIndex(m => m.Id === id)
    if (index === -1) {
      throw new Error("Message not found")
    }
    
    const deleted = this.messages.splice(index, 1)[0]
    return { ...deleted }
  }
}

export const messageService = new MessageService()