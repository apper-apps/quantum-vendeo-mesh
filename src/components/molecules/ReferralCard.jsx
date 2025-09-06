import { useState } from "react"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"
import { formatDistance } from "date-fns"

const ReferralCard = ({ referralData, className = "" }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralData.referralLink)
    setCopied(true)
    toast.success("Referral link copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform) => {
    const text = `Join me on Vendeo - the best local marketplace! Use my link: ${referralData.referralLink}`
    
    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`)
        break
      case "facebook":
        window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralData.referralLink)}`)
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`)
        break
      default:
        handleCopyLink()
    }
  }

  return (
    <Card className={`bg-gradient-primary text-white ${className}`}>
      <div className="text-center">
        {/* Earnings Display */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3">
            <ApperIcon name="DollarSign" size={24} className="text-white" />
          </div>
          <h2 className="font-display font-bold text-3xl mb-1">
            ${referralData.totalEarnings.toFixed(2)}
          </h2>
          <p className="text-white/80">Total Earned</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="font-bold text-xl">{referralData.totalReferrals}</div>
            <div className="text-sm text-white/80">Total Referrals</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="font-bold text-xl">{referralData.monthlyReferrals}</div>
            <div className="text-sm text-white/80">This Month</div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <p className="text-sm text-white/80 mb-2">Your Referral Link</p>
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 rounded px-3 py-2 text-sm font-mono flex-1 text-left truncate">
              {referralData.referralLink}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLink}
              className="text-white hover:bg-white/20 flex-shrink-0"
            >
              <ApperIcon name={copied ? "Check" : "Copy"} size={16} />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mb-6">
          <p className="text-sm text-white/80 mb-3">Share & Earn</p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => handleShare("whatsapp")}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors"
            >
              <ApperIcon name="MessageCircle" size={16} />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
            >
              <ApperIcon name="Facebook" size={16} />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors"
            >
              <ApperIcon name="Twitter" size={16} />
            </button>
            <button
              onClick={handleCopyLink}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
            >
              <ApperIcon name="Link" size={16} />
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        {referralData.recentActivity && referralData.recentActivity.length > 0 && (
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-medium mb-3">Recent Activity</h3>
            <div className="space-y-2">
              {referralData.recentActivity.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="UserPlus" size={12} />
                    <span>{activity.userName} joined</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>+${activity.reward}</span>
                    <Badge variant="success" size="xs">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-6 pt-4 border-t border-white/20 text-left">
          <h4 className="font-medium mb-2">How It Works</h4>
          <div className="space-y-2 text-sm text-white/80">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs mt-0.5">1</div>
              <span>Share your referral link with friends</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs mt-0.5">2</div>
              <span>They sign up and make their first purchase/sale</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs mt-0.5">3</div>
              <span>You both earn $5 credit!</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ReferralCard