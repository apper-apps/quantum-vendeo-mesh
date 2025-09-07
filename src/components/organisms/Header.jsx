import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { changeLanguage, useTranslation } from "@/i18n/translations";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

const Header = ({ className = "" }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)

const { t, currentLanguage } = useTranslation()
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const handleLanguageChange = () => forceUpdate(prev => prev + 1)
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return t("vendeo")
      case "/search":
        return t("search")
      case "/messages":
        return t("messages")
      case "/profile":
        return t("profile")
      case "/sell":
        return t("sellItem")
      case "/referrals":
        return t("referrals")
      default:
        return t("vendeo")
    }
  }

const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'fr' : 'en'
    changeLanguage(newLang)
  }
  const shouldShowBackButton = () => {
    return location.pathname !== "/" && 
           location.pathname !== "/search" && 
           location.pathname !== "/messages" && 
           location.pathname !== "/profile"
  }

  return (
    <header className={`bg-white border-b border-gray-200 px-4 py-3 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {shouldShowBackButton() ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ApperIcon name="ArrowLeft" size={20} />
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="ShoppingBag" size={18} className="text-white" />
              </div>
              <h1 className="font-display font-bold text-xl text-gray-900">
                {getPageTitle()}
              </h1>
            </div>
          )}
        </div>

        {/* Right Section */}
<div className="flex items-center space-x-3">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="hidden sm:flex items-center space-x-1 text-gray-600"
          >
            <ApperIcon name="Globe" size={16} />
            <span className="text-sm">{currentLanguage.toUpperCase()}</span>
          </Button>

          {/* Location Indicator */}
          {location.pathname === "/" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {/* Handle location picker */}}
              className="hidden sm:flex items-center space-x-1 text-gray-600"
            >
              <ApperIcon name="MapPin" size={16} />
              <span className="text-sm">{t("location")}</span>
              <ApperIcon name="ChevronDown" size={14} />
            </Button>
          )}

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 relative"
            >
              <ApperIcon name="Bell" size={20} />
              <Badge 
                variant="error" 
                size="xs" 
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center p-0"
              >
                3
              </Badge>
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border z-50">
                <div className="p-4 border-b">
<h3 className="font-medium text-gray-900">{t("notifications")}</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {/* Sample notifications */}
                  <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <Avatar size="sm" fallback="J" />
                      <div className="flex-1 min-w-0">
<p className="text-sm text-gray-900">
                          <span className="font-medium">John</span> {t("interestedIn")} iPhone 13
                        </p>
<p className="text-xs text-gray-500 mt-1">2 {t("minutesAgo")}</p>
                      </div>
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                        <ApperIcon name="DollarSign" size={14} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
<p className="text-sm text-gray-900">
                          {t("earnedFromReferral")}
                        </p>
<p className="text-xs text-gray-500 mt-1">1 {t("hourAgo")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <Avatar size="sm" fallback="M" />
                      <div className="flex-1 min-w-0">
<p className="text-sm text-gray-600">
                          <span className="font-medium">Mike</span> {t("leftReview")}
                        </p>
<p className="text-xs text-gray-500 mt-1">3 {t("hoursAgo")}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 text-center border-t">
                  <Button variant="ghost" size="sm" className="text-primary">
{t("viewAllNotifications")}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Referrals */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/referrals")}
            className="hidden sm:flex items-center space-x-1 text-gray-600"
>
            <ApperIcon name="Users" size={16} />
            <span className="text-sm">{t("earnFive")}</span>
          </Button>

          {/* Profile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/profile")}
            className="p-1"
          >
            <Avatar size="sm" fallback="U" />
          </Button>
        </div>
      </div>

      {/* Close notifications on outside click */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </header>
  )
}

export default Header