import { useState } from "react"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ onSearch, placeholder = "Search products...", className = "" }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleVoiceSearch = () => {
    // Voice search implementation would go here
    console.log("Voice search initiated")
  }

  return (
    <form onSubmit={handleSubmit} className={`flex space-x-2 ${className}`}>
      <div className="flex-1 relative">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          icon="Search"
          iconPosition="left"
          className="pr-12"
        />
        <button
          type="button"
          onClick={handleVoiceSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
        >
          <ApperIcon name="Mic" size={18} />
        </button>
      </div>
      <Button type="submit" icon="Search" className="px-4">
        Search
      </Button>
    </form>
  )
}

export default SearchBar