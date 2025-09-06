import { useState } from "react"
import SearchBar from "@/components/molecules/SearchBar"
import FilterBar from "@/components/molecules/FilterBar"
import ProductGrid from "@/components/organisms/ProductGrid"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({})
  const [searchHistory] = useState([
    "iPhone 13", "Nike shoes", "Gaming chair", "MacBook Pro", "Coffee maker"
  ])
  const [savedSearches] = useState([
    { query: "iPhone under $500", filters: { priceRange: { max: 500 }, categories: ["Electronics"] } },
    { query: "Designer clothes", filters: { categories: ["Fashion"] } }
  ])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleQuickSearch = (query) => {
    setSearchQuery(query)
  }

  const trendingSearches = [
    "iPhone 14", "PlayStation 5", "MacBook Air", "Nike Jordan", "Airpods Pro"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Section */}
        <div className="mb-6">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search products, brands, or categories..."
            className="mb-4"
          />
          
          <FilterBar 
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Search Results Count */}
        {searchQuery && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Showing results for "<span className="font-medium text-gray-900">{searchQuery}</span>"
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Save search functionality
                }}
              >
                <ApperIcon name="Bookmark" size={16} />
                Save Search
              </Button>
            </div>
          </div>
        )}

        {/* Search Suggestions - Show when no search query */}
        {!searchQuery && (
          <div className="space-y-6 mb-8">
            {/* Trending Searches */}
            <div>
              <h2 className="font-display font-semibold text-lg text-gray-900 mb-3">
                🔥 Trending Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((search) => (
                  <Badge
                    key={search}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                    onClick={() => handleQuickSearch(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Saved Searches */}
            {savedSearches.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-lg text-gray-900 mb-3">
                  📌 Saved Searches
                </h2>
                <div className="space-y-2">
                  {savedSearches.map((saved, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setSearchQuery(saved.query)
                        setFilters(saved.filters)
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <ApperIcon name="Search" size={16} className="text-gray-400" />
                        <span className="text-gray-900">{saved.query}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                        <ApperIcon name="X" size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {searchHistory.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-lg text-gray-900 mb-3">
                  🕒 Recent Searches
                </h2>
                <div className="space-y-2">
                  {searchHistory.map((search, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                      onClick={() => handleQuickSearch(search)}
                    >
                      <div className="flex items-center space-x-3">
                        <ApperIcon name="Clock" size={16} className="text-gray-400" />
                        <span className="text-gray-900">{search}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                        <ApperIcon name="X" size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Shortcuts */}
            <div>
              <h2 className="font-display font-semibold text-lg text-gray-900 mb-3">
                📂 Browse Categories
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: "Electronics", icon: "Smartphone", count: "2,340 items" },
                  { name: "Fashion", icon: "Shirt", count: "1,820 items" },
                  { name: "Home & Garden", icon: "Home", count: "956 items" },
                  { name: "Sports", icon: "Dumbbell", count: "743 items" },
                  { name: "Books", icon: "BookOpen", count: "612 items" },
                  { name: "Automotive", icon: "Car", count: "438 items" },
                  { name: "Beauty", icon: "Sparkles", count: "321 items" },
                  { name: "Toys", icon: "Gamepad2", count: "287 items" }
                ].map((category) => (
                  <div
                    key={category.name}
                    className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => setFilters({ categories: [category.name] })}
                  >
                    <ApperIcon name={category.icon} size={24} className="text-primary mb-2" />
                    <h3 className="font-medium text-gray-900 text-sm mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {category.count}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="font-display font-semibold text-xl text-gray-900">
                  Search Results
                </h2>
                <Badge variant="info" size="sm">
                  234 found
                </Badge>
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Relevance</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Distance</option>
                  </select>
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                  >
                    <ApperIcon name="Grid3X3" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                  >
                    <ApperIcon name="List" size={16} />
                  </Button>
                </div>
              </div>
            </div>

            <ProductGrid 
              searchQuery={searchQuery}
              filters={filters}
              showAds={true}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage