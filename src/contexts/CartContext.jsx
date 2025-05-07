import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from './AuthContext'
import localforage from 'localforage'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  // Load cart items from storage when user changes
  useEffect(() => {
    const loadCartItems = async () => {
      if (currentUser) {
        try {
          const savedCart = await localforage.getItem(`cart-${currentUser.id}`)
          if (savedCart) {
            setCartItems(savedCart)
          } else {
            setCartItems([])
          }
        } catch (error) {
          console.error('Error loading cart:', error)
          setCartItems([])
        }
      } else {
        setCartItems([])
      }
      setLoading(false)
    }

    loadCartItems()
  }, [currentUser])

  // Save cart items whenever they change
  useEffect(() => {
    const saveCartItems = async () => {
      if (currentUser && !loading) {
        try {
          await localforage.setItem(`cart-${currentUser.id}`, cartItems)
        } catch (error) {
          console.error('Error saving cart:', error)
        }
      }
    }

    saveCartItems()
  }, [cartItems, currentUser, loading])

  const addToCart = (product, quantity = 1) => {
    if (!currentUser) {
      toast.error('Please log in to add items to your cart')
      return
    }

    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id)
      
      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        }
        toast.success(`Updated quantity in cart`)
        return updatedItems
      } else {
        // Add new item to cart
        toast.success(`Added to cart`)
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
    toast.info('Item removed from cart')
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}