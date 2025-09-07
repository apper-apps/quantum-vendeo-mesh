export const translations = {
  en: {
    // Header
    vendeo: "Vendeo",
    search: "Search",
    messages: "Messages",
    profile: "Profile",
    sellItem: "Sell Item",
    referrals: "Referrals",
    location: "San Francisco, CA",
    earnFive: "Earn $5",
    notifications: "Notifications",
    viewAllNotifications: "View All Notifications",
    minutesAgo: "minutes ago",
    hourAgo: "hour ago",
    hoursAgo: "hours ago",
    interestedIn: "is interested in your",
    earnedFromReferral: "You earned $5 from a referral!",
    leftReview: "left you a 5-star review",
    
    // HomePage
    welcomeBack: "Welcome back! 👋",
    discoverDeals: "Discover amazing deals from your local community",
    searchPlaceholder: "Search products, brands, or categories...",
    popularCategories: "Popular Categories",
    viewAll: "View All",
    trendingNow: "Trending Now",
    latestListings: "Latest Listings",
    resultsFor: "Results for",
    sortBy: "Sort by:",
    newest: "Newest",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    mostPopular: "Most Popular",
    electronics: "Electronics",
    fashion: "Fashion",
    home: "Home",
    sports: "Sports",
    books: "Books",
    automotive: "Automotive",
    
    // MessagesPage
    stayConnected: "Stay connected with buyers and sellers",
    searchConversations: "Search conversations...",
    all: "All",
    unread: "Unread",
    archived: "Archived",
    noConversationsYet: "No conversations yet",
    startChatting: "Start chatting with sellers and buyers to see your messages here.",
    browseProducts: "Browse Products",
    quickActions: "Quick Actions",
    findProductsToBuy: "Find Products to Buy",
    listSomethingToSell: "List Something to Sell",
    voiceMessage: "Voice message",
    
    // ProductDetailPage
    description: "Description",
    details: "Details",
    condition: "Condition:",
    category: "Category:",
    listed: "Listed:",
    location2: "Location:",
    messageSeller: "Message Seller",
    safetyTips: "🛡️ Safety Tips",
    meetInPublic: "Meet in a public, well-lit location",
    bringFriend: "Bring a friend if possible",
    inspectItem: "Inspect the item before purchasing",
    trustInstincts: "Trust your instincts",
    reportListing: "Report this listing",
    similarItems: "Similar Items",
    
    // ReferralCard
    referralProgram: "Referral Program",
    totalReferrals: "Total Referrals",
    thisMonth: "This Month",
    yourReferralLink: "Your Referral Link",
    copy: "Copy",
    copied: "Copied!",
    recentActivity: "Recent Activity",
    joined: "joined",
    pending: "Pending",
    howItWorks: "How It Works",
    shareLink: "Share your link with friends",
    friendJoins: "Friend joins and makes first purchase",
    bothEarn: "You both earn $5 credit!",
    
    // ProductCard
    sponsored: "Sponsored",
    message: "Message"
  },
  fr: {
    // Header
    vendeo: "Vendeo",
    search: "Rechercher",
    messages: "Messages",
    profile: "Profil",
    sellItem: "Vendre un Article",
    referrals: "Parrainages",
    location: "San Francisco, CA",
    earnFive: "Gagner 5$",
    notifications: "Notifications",
    viewAllNotifications: "Voir Toutes les Notifications",
    minutesAgo: "minutes",
    hourAgo: "heure",
    hoursAgo: "heures",
    interestedIn: "est intéressé par votre",
    earnedFromReferral: "Vous avez gagné 5$ grâce à un parrainage!",
    leftReview: "vous a laissé un avis 5 étoiles",
    
    // HomePage
    welcomeBack: "Bon retour! 👋",
    discoverDeals: "Découvrez des offres incroyables de votre communauté locale",
    searchPlaceholder: "Rechercher des produits, marques ou catégories...",
    popularCategories: "Catégories Populaires",
    viewAll: "Voir Tout",
    trendingNow: "Tendances",
    latestListings: "Dernières Annonces",
    resultsFor: "Résultats pour",
    sortBy: "Trier par:",
    newest: "Plus récent",
    priceLowToHigh: "Prix: Croissant",
    priceHighToLow: "Prix: Décroissant",
    mostPopular: "Plus populaire",
    electronics: "Électronique",
    fashion: "Mode",
    home: "Maison",
    sports: "Sports",
    books: "Livres",
    automotive: "Automobile",
    
    // MessagesPage
    stayConnected: "Restez en contact avec les acheteurs et vendeurs",
    searchConversations: "Rechercher des conversations...",
    all: "Tout",
    unread: "Non lus",
    archived: "Archivés",
    noConversationsYet: "Aucune conversation pour le moment",
    startChatting: "Commencez à discuter avec des vendeurs et acheteurs pour voir vos messages ici.",
    browseProducts: "Parcourir les Produits",
    quickActions: "Actions Rapides",
    findProductsToBuy: "Trouver des Produits à Acheter",
    listSomethingToSell: "Mettre en Vente",
    voiceMessage: "Message vocal",
    
    // ProductDetailPage
    description: "Description",
    details: "Détails",
    condition: "État:",
    category: "Catégorie:",
    listed: "Publié:",
    location2: "Localisation:",
    messageSeller: "Contacter le Vendeur",
    safetyTips: "🛡️ Conseils de Sécurité",
    meetInPublic: "Rencontrez-vous dans un lieu public et bien éclairé",
    bringFriend: "Amenez un ami si possible",
    inspectItem: "Inspectez l'article avant l'achat",
    trustInstincts: "Faites confiance à votre instinct",
    reportListing: "Signaler cette annonce",
    similarItems: "Articles Similaires",
    
    // ReferralCard
    referralProgram: "Programme de Parrainage",
    totalReferrals: "Total Parrainages",
    thisMonth: "Ce Mois-ci",
    yourReferralLink: "Votre Lien de Parrainage",
    copy: "Copier",
    copied: "Copié!",
    recentActivity: "Activité Récente",
    joined: "a rejoint",
    pending: "En attente",
    howItWorks: "Comment ça Marche",
    shareLink: "Partagez votre lien avec des amis",
    friendJoins: "Un ami s'inscrit et fait son premier achat",
    bothEarn: "Vous gagnez tous les deux 5$ de crédit!",
    
    // ProductCard
    sponsored: "Sponsorisé",
    message: "Message"
  }
}

export const useTranslation = () => {
  const currentLanguage = localStorage.getItem('language') || 'en'
  
  const t = (key) => {
    return translations[currentLanguage][key] || key
  }
  
  return { t, currentLanguage }
}

export const changeLanguage = (lang) => {
  localStorage.setItem('language', lang)
  if (typeof window !== 'undefined' && window.CustomEvent) {
    window.dispatchEvent(new window.CustomEvent('languageChanged'))
  }
}