import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ReferralCard from "@/components/molecules/ReferralCard"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Card from "@/components/atoms/Card"
import Avatar from "@/components/atoms/Avatar"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import { userService } from "@/services/api/userService"
import { formatDistance } from "date-fns"
import { toast } from "react-toastify"

const ReferralPage = () => {
  const navigate = useNavigate()
  const [referralData, setReferralData] = useState(null)
  const [referralHistory, setReferralHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("overview") // overview, history, leaderboard

  const loadReferralData = async () => {
    try {
      setLoading(true)
      setError("")
      
      // Load referral data
      const data = await userService.getReferralData()
      setReferralData(data)
      
      // Load referral history
      const history = await userService.getReferralHistory()
      setReferralHistory(history)
      
    } catch (err) {
      setError(err.message || "Failed to load referral data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReferralData()
  }, [])

  const handleRequestPayout = () => {
    toast.success("Payout request submitted! You'll receive your earnings within 3-5 business days.")
  }

  if (loading) {
    return <Loading message="Loading referral data..." />
  }

  if (error) {
    return <Error message={error} onRetry={loadReferralData} />
  }

  const leaderboardData = [
    { name: "Sarah J.", earnings: 245.50, referrals: 49 },
    { name: "Mike C.", earnings: 189.00, referrals: 38 },
    { name: "Lisa W.", earnings: 156.75, referrals: 31 },
    { name: "You", earnings: referralData?.totalEarnings || 0, referrals: referralData?.totalReferrals || 0, isCurrentUser: true },
    { name: "John D.", earnings: 98.25, referrals: 19 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">
            Referral Program
          </h1>
          <p className="text-gray-600">
            Earn money by inviting friends to join Vendeo
          </p>
        </div>

        {/* Main Referral Card */}
        {referralData && (
          <div className="mb-8">
            <ReferralCard referralData={referralData} />
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
          {[
            { key: "overview", label: "Overview" },
            { key: "history", label: "History", count: referralHistory.length },
            { key: "leaderboard", label: "Leaderboard" }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.key)}
              className="flex-1"
            >
              {tab.label}
              {tab.count !== undefined && (
                <Badge 
                  variant={activeTab === tab.key ? "secondary" : "primary"} 
                  size="xs"
                  className="ml-2"
                >
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <ApperIcon name="DollarSign" size={20} className="text-green-600" />
                  </div>
                  <div className="font-bold text-xl text-gray-900">
                    ${referralData?.pendingEarnings?.toFixed(2) || "0.00"}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </Card>

              <Card>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <ApperIcon name="Users" size={20} className="text-blue-600" />
                  </div>
                  <div className="font-bold text-xl text-gray-900">
                    {referralData?.monthlyReferrals || 0}
                  </div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
              </Card>

              <Card>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                    <ApperIcon name="TrendingUp" size={20} className="text-purple-600" />
                  </div>
                  <div className="font-bold text-xl text-gray-900">
                    {referralData?.conversionRate || "0"}%
                  </div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </Card>
            </div>

            {/* How It Works */}
            <Card>
              <h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                How It Works
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                    <ApperIcon name="Share2" size={24} className="text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">1. Share</h3>
                  <p className="text-sm text-gray-600">
                    Share your unique referral link with friends and family
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                    <ApperIcon name="UserPlus" size={24} className="text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">2. Join</h3>
                  <p className="text-sm text-gray-600">
                    They sign up using your link and complete their first transaction
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                    <ApperIcon name="DollarSign" size={24} className="text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">3. Earn</h3>
                  <p className="text-sm text-gray-600">
                    You both earn $5 credit that can be withdrawn or used on the platform
                  </p>
                </div>
              </div>
            </Card>

            {/* Payout Section */}
            {referralData?.totalEarnings > 0 && (
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      Ready to cash out?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Minimum payout is $20. You currently have ${referralData.totalEarnings.toFixed(2)} available.
                    </p>
                  </div>
                  <Button
                    onClick={handleRequestPayout}
                    disabled={referralData.totalEarnings < 20}
                    icon="CreditCard"
                  >
                    Request Payout
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-xl text-gray-900">
                Referral History
              </h2>
            </div>

            {referralHistory.length === 0 ? (
              <Card className="text-center py-12">
                <ApperIcon name="Users" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No referrals yet</h3>
                <p className="text-gray-600 mb-4">
                  Start sharing your referral link to earn money
                </p>
                <Button onClick={() => setActiveTab("overview")}>
                  Get Your Link
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {referralHistory.map((referral) => (
                  <Card key={referral.Id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar size="md" fallback={referral.userName[0]} />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {referral.userName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {referral.type === "buyer" ? "New buyer" : "New seller"} • {" "}
                            {formatDistance(new Date(referral.createdAt), new Date(), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-medium text-green-600">
                          +${referral.reward.toFixed(2)}
                        </div>
                        <Badge 
                          variant={referral.status === "paid" ? "success" : "warning"}
                          size="sm"
                        >
                          {referral.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-xl text-gray-900">
                Top Referrers This Month
              </h2>
              <Badge variant="info" size="sm">
                Updated daily
              </Badge>
            </div>

            <Card>
              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      user.isCurrentUser ? "bg-primary/5 border-2 border-primary/20" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? "bg-yellow-100 text-yellow-800" :
                        index === 1 ? "bg-gray-100 text-gray-700" :
                        index === 2 ? "bg-orange-100 text-orange-700" :
                        "bg-gray-50 text-gray-600"
                      }`}>
                        #{index + 1}
                      </div>

                      {/* User Info */}
                      <div className="flex items-center space-x-3">
                        <Avatar size="sm" fallback={user.name[0]} />
                        <div>
                          <span className={`font-medium ${
                            user.isCurrentUser ? "text-primary" : "text-gray-900"
                          }`}>
                            {user.name}
                            {user.isCurrentUser && " (You)"}
                          </span>
                          <p className="text-xs text-gray-500">
                            {user.referrals} referrals
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Earnings */}
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        ${user.earnings.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Want to climb the leaderboard?
                </p>
                <Button size="sm" onClick={() => setActiveTab("overview")}>
                  Share Your Link
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReferralPage