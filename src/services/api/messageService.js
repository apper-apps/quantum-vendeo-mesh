import messagesData from "@/services/mockData/messages.json"
import conversationsData from "@/services/mockData/conversations.json"

class MessageService {
  constructor() {
    this.messages = [...messagesData]
    this.conversations = [...conversationsData]
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
    const conversationIndex = this.conversations.findIndex(c => c.chatId === messageData.chatId)
    if (conversationIndex !== -1) {
      this.conversations[conversationIndex].lastMessage = {
        content: newMessage.content,
        type: newMessage.type,
        timestamp: newMessage.timestamp,
        senderId: newMessage.senderId
      }
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