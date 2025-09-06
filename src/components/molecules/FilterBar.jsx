import { useState } from "react"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const FilterBar = ({ filters = {}, onFiltersChange, className = "" }) => {
  const [showAllFilters, setShowAllFilters] = useState(false)

  const categories = [
    "Electronics", "Fashion", "Home", "Sports", "Books", "Automotive", "Beauty", "Toys"
  ]

  const conditions = ["New", "Like New", "Good", "Fair", "Poor"]
  const priceRanges = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $500", min: 100, max: 500 },
    { label: "$500+", min: 500, max: null }
  ]

  const handleCategoryFilter = (category) => {
    const newCategories = filters.categories?.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...(filters.categories || []), category]
    
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleConditionFilter = (condition) => {
    onFiltersChange({ ...filters, condition })
  }

  const handlePriceRangeFilter = (range) => {
    onFiltersChange({ 
      ...filters, 
      priceRange: { min: range.min, max: range.max }
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const activeFiltersCount = [
    filters.categories?.length || 0,
    filters.condition ? 1 : 0,
    filters.priceRange ? 1 : 0,
    filters.location ? 1 : 0
  ].reduce((sum, count) => sum + count, 0)

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-4 ${className}`}>
      {/* Quick Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 overflow-x-auto">
          {categories.slice(0, showAllFilters ? categories.length : 4).map((category) => (
            <Badge
              key={category}
              variant={filters.categories?.includes(category) ? "primary" : "secondary"}
              className="cursor-pointer whitespace-nowrap hover:scale-105 transition-transform"
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </Badge>
          ))}
          
          {!showAllFilters && categories.length > 4 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllFilters(true)}
              className="whitespace-nowrap"
            >
              <ApperIcon name="Plus" size={14} />
              More
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAllFilters(!showAllFilters)}
            className="relative"
          >
            <ApperIcon name="SlidersHorizontal" size={16} />
            Filters
            {activeFiltersCount > 0 && (
              <Badge 
                variant="primary" 
                size="xs" 
                className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAllFilters && (
        <div className="border-t pt-4 space-y-4">
          {/* All Categories */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={filters.categories?.includes(category) ? "primary" : "secondary"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Condition</h4>
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition) => (
                <Badge
                  key={condition}
                  variant={filters.condition === condition ? "primary" : "secondary"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleConditionFilter(condition)}
                >
                  {condition}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range, index) => (
                <Badge
                  key={index}
                  variant={
                    filters.priceRange?.min === range.min && 
                    filters.priceRange?.max === range.max 
                      ? "primary" 
                      : "secondary"
                  }
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handlePriceRangeFilter(range)}
                >
                  {range.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar