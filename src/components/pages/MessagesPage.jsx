import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { messageService } from "@/services/api/messageService";
import { formatDistance } from "date-fns";
import { useTranslation } from "@/i18n/translations";
import ApperIcon from "@/components/ApperIcon";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import SearchBar from "@/components/molecules/SearchBar";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

const MessagesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all") // all, unread, archived

  const loadConversations = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await messageService.getConversations()
      setConversations(data)
    } catch (err) {
      setError(err.message || "Failed to load conversations")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadConversations()
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = !searchQuery || 
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = 
      filter === "all" || 
      (filter === "unread" && conv.unreadCount > 0) ||
      (filter === "archived" && conv.archived)

    return matchesSearch && matchesFilter
  })

  const handleConversationClick = (chatId) => {
    navigate(`/chat/${chatId}`)
  }

  if (loading) {
    return <Loading message="Loading conversations..." />
  }

  if (error) {
    return <Error message={error} onRetry={loadConversations} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">
{t("messages")}
          </h1>
          <p className="text-gray-600">
{t("stayConnected")}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <SearchBar 
            onSearch={handleSearch}
placeholder={t("searchConversations")}
            className="mb-4"
          />
          
          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
{ key: "all", label: t("all"), count: conversations.length },
              { key: "unread", label: t("unread"), count: conversations.filter(c => c.unreadCount > 0).length },
              { key: "archived", label: t("archived"), count: conversations.filter(c => c.archived).length }
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={filter === tab.key ? "primary" : "outline"}
                size="sm"
                onClick={() => setFilter(tab.key)}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <Badge 
                    variant={filter === tab.key ? "secondary" : "primary"} 
                    size="xs"
                    className="ml-2"
                  >
                    {tab.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        {filteredConversations.length === 0 ? (
          <Empty
icon="MessageCircle"
            title={t("noConversationsYet")}
description={t("startChatting")}
            actionText={t("browseProducts")}
            onAction={() => navigate("/")}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {filteredConversations.map((conversation, index) => (
              <div
                key={conversation.Id}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  index !== filteredConversations.length - 1 ? "border-b border-gray-100" : ""
                }`}
                onClick={() => handleConversationClick(conversation.chatId)}
              >
                {/* Avatar */}
                <div className="relative">
                  <Avatar 
                    size="lg" 
                    fallback={conversation.participantName[0]}
                    className="mr-4"
                  />
                  {conversation.online && (
                    <div className="absolute bottom-0 right-4 w-3 h-3 bg-success border-2 border-white rounded-full"></div>
                  )}
                </div>

                {/* Conversation Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conversation.participantName}
                      </h3>
                      {conversation.verified && (
                        <ApperIcon name="CheckCircle" size={14} className="text-primary" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatDistance(new Date(conversation.lastMessage.timestamp), new Date(), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {conversation.lastMessage.type === "audio" ? (
                        <div className="flex items-center space-x-1 text-gray-600">
                          <ApperIcon name="Mic" size={12} />
<span className="text-sm">{t("voiceMessage")}</span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 truncate max-w-[200px] sm:max-w-[300px]">
                          {conversation.lastMessage.content}
                        </p>
                      )}
                      {conversation.lastMessage.senderId !== "current-user" && conversation.unreadCount > 0 && (
                        <Badge variant="primary" size="xs" className="ml-2">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {/* Product Image if conversation is about a product */}
                      {conversation.productImage && (
                        <img
                          src={conversation.productImage}
                          alt="Product"
                          className="w-8 h-8 rounded object-cover"
                        />
                      )}
                      
                      <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
<h3 className="font-medium text-gray-900 mb-4">{t("quickActions")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/search")}
              className="flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Search" size={16} />
<span>{t("findProductsToBuy")}</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate("/sell")}
              className="flex items-center justify-center space-x-2"
            >
<ApperIcon name="Plus" size={16} />
              <span>{t("listSomethingToSell")}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagesPage