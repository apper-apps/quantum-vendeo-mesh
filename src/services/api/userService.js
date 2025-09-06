import usersData from "@/services/mockData/users.json"
import referralsData from "@/services/mockData/referrals.json"

class UserService {
  constructor() {
    this.users = [...usersData]
    this.referrals = [...referralsData]
    this.nextId = Math.max(...this.users.map(u => u.Id)) + 1
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.users]
  }

  async getById(id) {
    await this.delay()
    const user = this.users.find(u => u.Id === id)
    return user ? { ...user } : null
  }

  async getCurrentUser() {
    await this.delay()
    // Return the first user as current user for demo
    const currentUser = this.users[0]
    return currentUser ? { ...currentUser } : null
  }

  async getReferralData() {
    await this.delay()
    const currentUser = this.users[0]
    
    return {
      totalEarnings: currentUser.earnings || 127.50,
      totalReferrals: 15,
      monthlyReferrals: 3,
      pendingEarnings: 25.00,
      conversionRate: 75,
      referralLink: `https://vendeo.app/ref/${currentUser.referralCode}`,
      recentActivity: [
        {
          userName: "Sarah Johnson",
          reward: 5.00,
          status: "paid",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
          userName: "Mike Chen",
          reward: 5.00,
          status: "pending",
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
          userName: "Lisa Wong",
          reward: 5.00,
          status: "paid",
          timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
        }
      ]
    }
  }

  async getReferralHistory() {
    await this.delay()
    return [...this.referrals]
  }

  async create(userData) {
    await this.delay()
    const newUser = {
      ...userData,
      Id: this.nextId++,
      joinedAt: new Date().toISOString()
    }
    this.users.push(newUser)
    return { ...newUser }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.users.findIndex(u => u.Id === id)
    if (index === -1) {
      throw new Error("User not found")
    }
    
    this.users[index] = { ...this.users[index], ...updates }
    return { ...this.users[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.users.findIndex(u => u.Id === id)
    if (index === -1) {
      throw new Error("User not found")
    }
    
    const deleted = this.users.splice(index, 1)[0]
    return { ...deleted }
  }
}

export const userService = new UserService()