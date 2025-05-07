import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categories, products } from '../data/dummyData'
import ProductCard from '../components/ui/ProductCard'
import { FaFilter, FaTimes } from 'react-icons/fa'

const FurniturePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sort: 'featured'
  })
  
  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const categoryParam = params.get('category')
    const priceRangeParam = params.get('price')
    const sortParam = params.get('sort')
    
    setFilters({
      category: categoryParam || '',
      priceRange: priceRangeParam || '',
      sort: sortParam || 'featured'
    })
  }, [location.search])

  // Apply filters
  useEffect(() => {
    let result = [...products]
    
    // Filter by category
    if (filters.category) {
      result = result.filter(product => product.category === filters.category)
    }
    
    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number)
      result = result.filter(product => {
        const finalPrice = product.discount > 0 ? product.price - product.discount : product.price
        return finalPrice >= min && (max ? finalPrice <= max : true)
      })
    }
    
    // Sort products
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = a.discount > 0 ? a.price - a.discount : a.price
          const priceB = b.discount > 0 ? b.price - b.discount : b.price
          return priceA - priceB
        })
        break
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = a.discount > 0 ? a.price - a.discount : a.price
          const priceB = b.discount > 0 ? b.price - b.discount : b.price
          return priceB - priceA
        })
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        // 'featured' is default, no specific sorting
        break
    }
    
    setFilteredProducts(result)
  }, [filters])

  // Update URL when filters change
  const updateFilters = (newFilters) => {
    const params = new URLSearchParams()
    
    if (newFilters.category) {
      params.set('category', newFilters.category)
    }
    
    if (newFilters.priceRange) {
      params.set('price', newFilters.priceRange)
    }
    
    if (newFilters.sort && newFilters.sort !== 'featured') {
      params.set('sort', newFilters.sort)
    }
    
    navigate({ pathname: '/furniture', search: params.toString() })
    setFilters(newFilters)
  }

  // Clear all filters
  const clearFilters = () => {
    navigate('/furniture')
    setFilters({
      category: '',
      priceRange: '',
      sort: 'featured'
    })
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Furniture Collection</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Browse our extensive collection of high-quality furniture for every room in your home. 
            Use the filters to find exactly what you're looking for.
          </p>
        </div>
        
        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <button 
              className="flex items-center text-neutral-700 md:hidden mb-4"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              {filterOpen ? <FaTimes className="mr-2" /> : <FaFilter className="mr-2" />}
              {filterOpen ? 'Close Filters' : 'Show Filters'}
            </button>
            
            <div className="flex items-center">
              <span className="text-neutral-700 mr-2">Sort by:</span>
              <select
                value={filters.sort}
                onChange={(e) => updateFilters({ ...filters, sort: e.target.value })}
                className="border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary-300"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            
            <p className="text-neutral-600 mt-2 md:mt-0">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          {/* Filters - Mobile (hidden by default, toggled by button) */}
          <motion.div
            className="md:hidden bg-white shadow-md rounded-lg p-4 mb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: filterOpen ? 'auto' : 0, opacity: filterOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            {filterOpen && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === category.id}
                          onChange={() => updateFilters({ ...filters, category: category.id })}
                          className="mr-2"
                        />
                        {category.name}
                      </label>
                    ))}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === ''}
                        onChange={() => updateFilters({ ...filters, category: '' })}
                        className="mr-2"
                      />
                      All Categories
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.value} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange === range.value}
                          onChange={() => updateFilters({ ...filters, priceRange: range.value })}
                          className="mr-2"
                        />
                        {range.label}
                      </label>
                    ))}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === ''}
                        onChange={() => updateFilters({ ...filters, priceRange: '' })}
                        className="mr-2"
                      />
                      All Prices
                    </label>
                  </div>
                </div>
                
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Filters - Desktop (always visible on larger screens) */}
          <div className="hidden md:block w-64 mr-8">
            <div className="bg-white shadow-md rounded-lg p-6 sticky top-24">
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category.id}
                        onChange={() => updateFilters({ ...filters, category: category.id })}
                        className="mr-2"
                      />
                      {category.name}
                    </label>
                  ))}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === ''}
                      onChange={() => updateFilters({ ...filters, category: '' })}
                      className="mr-2"
                    />
                    All Categories
                  </label>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range.value}
                        onChange={() => updateFilters({ ...filters, priceRange: range.value })}
                        className="mr-2"
                      />
                      {range.label}
                    </label>
                  ))}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange === ''}
                      onChange={() => updateFilters({ ...filters, priceRange: '' })}
                      className="mr-2"
                    />
                    All Prices
                  </label>
                </div>
              </div>
              
              <button
                onClick={clearFilters}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-neutral-600 mb-4">
                  We couldn't find any products matching your current filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Price range options
const priceRanges = [
  { label: 'Under $300', value: '0-300' },
  { label: '$300 - $600', value: '300-600' },
  { label: '$600 - $1000', value: '600-1000' },
  { label: 'Over $1000', value: '1000-99999' }
]

export default FurniturePage