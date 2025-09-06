import { useState, useEffect } from "react"
import ProductCard from "@/components/molecules/ProductCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { productService } from "@/services/api/productService"

const ProductGrid = ({ 
  filters = {}, 
  searchQuery = "",
  className = "",
  showAds = true 
}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await productService.getAll()
      
      // Apply filters
      let filteredProducts = data

      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      if (filters.categories && filters.categories.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters.categories.includes(product.category)
        )
      }

      if (filters.condition) {
        filteredProducts = filteredProducts.filter(product =>
          product.condition === filters.condition
        )
      }

      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(product => {
          const price = product.price
          const min = filters.priceRange.min || 0
          const max = filters.priceRange.max || Infinity
          return price >= min && price <= max
        })
      }

      // Sort by relevance/date
      filteredProducts.sort((a, b) => {
        // Prioritize sponsored posts
        if (a.isSponsored && !b.isSponsored) return -1
        if (!a.isSponsored && b.isSponsored) return 1
        // Then by creation date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      setProducts(filteredProducts)
    } catch (err) {
      setError(err.message || "Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [filters, searchQuery])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadProducts} />
  }

  if (products.length === 0) {
    return (
      <Empty
        title="No products found"
        description="Try adjusting your search or filters to find what you're looking for."
        actionText="Clear Filters"
        onAction={() => window.location.reload()}
      />
    )
  }

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard 
            key={product.Id} 
            product={product}
            className={product.isSponsored ? "ring-2 ring-purple-200" : ""}
          />
        ))}
      </div>

      {/* Load More Button */}
      {products.length >= 20 && (
        <div className="text-center mt-8">
          <button className="btn-primary px-8 py-3">
            Load More Products
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid