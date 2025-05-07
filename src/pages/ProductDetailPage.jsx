import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStar, FaShoppingCart, FaCube, FaArrowLeft, FaCheck } from 'react-icons/fa'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { products } from '../data/dummyData'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  
  useEffect(() => {
    // Find product in dummy data
    const foundProduct = products.find(p => p.id === id)
    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedImage(0) // Reset selected image when product changes
    }
    setLoading(false)
  }, [id])
  
  if (loading) {
    return <LoadingSpinner size="lg" />
  }
  
  if (!product) {
    return (
      <div className="container-custom mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/furniture')} 
          className="btn btn-primary"
        >
          Browse Products
        </button>
      </div>
    )
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }
  
  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, value)
    setQuantity(newQuantity)
  }
  
  const {
    name,
    price,
    discount,
    rating,
    reviews,
    description,
    details,
    features,
    images,
    category,
    inStock
  } = product
  
  const hasDiscount = discount > 0
  const discountedPrice = price - discount
  const finalPrice = hasDiscount ? discountedPrice : price
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-neutral-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to products
        </button>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md mb-4"
            >
              <img 
                src={images[selectedImage]} 
                alt={name}
                className="w-full h-96 object-cover"
              />
            </motion.div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-md overflow-hidden border-2 transition ${
                      selectedImage === index 
                        ? 'border-primary-600' 
                        : 'border-transparent hover:border-neutral-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${name} view ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-accent-500 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(rating) ? 'text-accent-500' : 'text-neutral-300'} 
                      />
                    ))}
                  </div>
                  <span className="text-neutral-600">
                    {rating} ({reviews} reviews)
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  {hasDiscount ? (
                    <>
                      <span className="text-3xl font-bold text-primary-600">${discountedPrice.toFixed(2)}</span>
                      <span className="ml-2 text-xl text-neutral-500 line-through">${price.toFixed(2)}</span>
                      <span className="ml-2 bg-error-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        Save ${discount.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-primary-600">${price.toFixed(2)}</span>
                  )}
                </div>
                <div className="text-green-600 flex items-center">
                  <FaCheck className="mr-1" />
                  <span>{inStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-neutral-700">{description}</p>
              </div>
              
              {/* Quantity Selector & Add to Cart */}
              <div className="mb-8">
                <label htmlFor="quantity" className="label">
                  Quantity
                </label>
                <div className="flex items-center mb-6">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-2 border border-neutral-300 rounded-l-md bg-neutral-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-16 px-3 py-2 border-y border-neutral-300 text-center"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-2 border border-neutral-300 rounded-r-md bg-neutral-50"
                  >
                    +
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!isAuthenticated || !inStock || addedToCart}
                    className={`btn ${
                      !isAuthenticated || !inStock 
                        ? 'bg-neutral-300 cursor-not-allowed' 
                        : addedToCart 
                          ? 'bg-success-500 hover:bg-success-600' 
                          : 'btn-primary'
                    } flex items-center justify-center py-3 px-6 flex-1`}
                  >
                    {!isAuthenticated ? (
                      'Sign in to purchase'
                    ) : !inStock ? (
                      'Out of Stock'
                    ) : addedToCart ? (
                      <>
                        <FaCheck className="mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => navigate(`/room-designer?product=${id}`)}
                    disabled={!isAuthenticated}
                    className={`btn ${
                      !isAuthenticated ? 'bg-neutral-300 cursor-not-allowed' : 'btn-outline'
                    } flex items-center justify-center py-3 px-6 flex-1`}
                  >
                    <FaCube className="mr-2" />
                    Try in Room Designer
                  </button>
                </div>
                
                {!isAuthenticated && (
                  <p className="text-neutral-500 text-sm mt-2">
                    Please <a href="/login" className="text-primary-600 hover:underline">sign in</a> to add items to cart or use the Room Designer.
                  </p>
                )}
              </div>
              
              {/* Product Details */}
              <div className="border-t border-neutral-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
                  {details && Object.entries(details).map(([key, value]) => (
                    <div key={key} className="mb-2">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                      <span className="text-neutral-700">{value.toString()}</span>
                    </div>
                  ))}
                </div>
                
                {features && features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Key Features:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {features.map((feature, index) => (
                        <li key={index} className="text-neutral-700">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage