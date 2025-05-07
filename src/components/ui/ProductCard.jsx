import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStar, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  
  const {
    id,
    name,
    price,
    discount,
    rating,
    reviews,
    images
  } = product

  const hasDiscount = discount > 0
  const discountedPrice = price - discount

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="card card-hover h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/furniture/${id}`}>
        <div className="relative overflow-hidden h-64">
          <img 
            src={images[0]} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-error-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Save ${discount.toFixed(2)}
            </div>
          )}
          
          {isAuthenticated && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg"
              aria-label="Add to cart"
            >
              <FaShoppingCart size={18} />
            </motion.button>
          )}
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center text-accent-500 mb-2">
            <FaStar />
            <span className="ml-1 text-sm font-medium">{rating}</span>
            <span className="ml-1 text-xs text-neutral-500">({reviews} reviews)</span>
          </div>
          
          <h3 className="font-medium text-lg mb-2 line-clamp-2">{name}</h3>
          
          <div className="mt-auto flex items-baseline">
            {hasDiscount ? (
              <>
                <span className="font-semibold text-lg">${discountedPrice.toFixed(2)}</span>
                <span className="ml-2 text-neutral-500 line-through text-sm">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-semibold text-lg">${price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard