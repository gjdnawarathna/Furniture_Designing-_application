import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaTrash, FaArrowLeft, FaCreditCard, FaLock } from 'react-icons/fa'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart, loading } = useCart()
  const { currentUser } = useAuth()
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  
  // Form states
  const [shippingDetails, setShippingDetails] = useState({
    firstName: currentUser?.name.split(' ')[0] || '',
    lastName: currentUser?.name.split(' ')[1] || '',
    email: currentUser?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  })
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })
  
  const handleShippingChange = (e) => {
    const { name, value } = e.target
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handlePaymentChange = (e) => {
    const { name, value } = e.target
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmitShipping = (e) => {
    e.preventDefault()
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode']
    const isValid = requiredFields.every(field => shippingDetails[field].trim() !== '')
    
    if (isValid) {
      setCheckoutStep(2)
      window.scrollTo(0, 0)
    }
  }
  
  const handleSubmitPayment = async (e) => {
    e.preventDefault()
    // Basic validation
    const requiredFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv']
    const isValid = requiredFields.every(field => paymentDetails[field].trim() !== '')
    
    if (isValid) {
      setPaymentProcessing(true)
      
      // Simulate payment processing
      setTimeout(() => {
        setPaymentProcessing(false)
        setOrderCompleted(true)
        clearCart()
        window.scrollTo(0, 0)
      }, 2000)
    }
  }
  
  const subtotal = getCartTotal()
  const shipping = subtotal > 500 ? 0 : 50
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  
  if (loading) {
    return <LoadingSpinner size="lg" />
  }
  
  // Empty cart
  if (cartItems.length === 0 && !orderCompleted) {
    return (
      <div className="container-custom mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link to="/furniture" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    )
  }
  
  // Order completed
  if (orderCompleted) {
    return (
      <div className="container-custom mx-auto py-16 px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto"
        >
          <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Completed!</h1>
          <p className="text-lg mb-6">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="text-neutral-600 mb-8">
            We've sent a confirmation email to {shippingDetails.email} with all the details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-primary px-8">
              Return Home
            </Link>
            <Link to="/furniture" className="btn btn-outline px-8">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto">
        <div className="mb-8">
          <Link 
            to="/furniture" 
            className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">
          {checkoutStep === 1 
            ? 'Your Shopping Cart' 
            : 'Checkout'}
        </h1>
        
        {/* Checkout Progress */}
        {checkoutStep > 1 && (
          <div className="mb-8">
            <div className="flex items-center">
              <div className="flex items-center text-white relative">
                <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-primary-600 border-primary-600 text-center">
                  <FaShoppingCart className="w-full" />
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium text-primary-600">
                  Cart
                </div>
              </div>
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-primary-600"></div>
              <div className="flex items-center text-white relative">
                <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-center ${
                  checkoutStep >= 2 ? 'bg-primary-600 border-primary-600' : 'bg-white border-neutral-300 text-neutral-300'
                }`}>
                  <FaTruck className={`w-full ${checkoutStep >= 2 ? 'text-white' : 'text-neutral-400'}`} />
                </div>
                <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium ${
                  checkoutStep >= 2 ? 'text-primary-600' : 'text-neutral-500'
                }`}>
                  Shipping
                </div>
              </div>
              <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                checkoutStep >= 2 ? 'border-primary-600' : 'border-neutral-300'
              }`}></div>
              <div className="flex items-center text-white relative">
                <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-center ${
                  checkoutStep >= 3 ? 'bg-primary-600 border-primary-600' : 'bg-white border-neutral-300 text-neutral-300'
                }`}>
                  <FaCreditCard className={`w-full ${checkoutStep >= 3 ? 'text-white' : 'text-neutral-400'}`} />
                </div>
                <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium ${
                  checkoutStep >= 3 ? 'text-primary-600' : 'text-neutral-500'
                }`}>
                  Payment
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Cart Items or Checkout Forms */}
          <div className="lg:col-span-2">
            {checkoutStep === 1 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-semibold">Cart Items</h2>
                </div>
                
                <div>
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center"
                    >
                      <div className="w-full sm:w-20 h-20 flex-shrink-0 mb-4 sm:mb-0">
                        <img 
                          src={item.images[0]} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>
                      
                      <div className="flex-grow sm:ml-6">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-neutral-500 text-sm">
                          ${(item.discount > 0 ? item.price - item.discount : item.price).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center mt-4 sm:mt-0">
                        <div className="flex items-center mr-6">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 border border-neutral-300 rounded-l-md bg-neutral-50"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            min="1"
                            className="w-12 px-2 py-1 border-y border-neutral-300 text-center"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 border border-neutral-300 rounded-r-md bg-neutral-50"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-error-500 hover:text-error-600"
                          aria-label="Remove item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {checkoutStep === 2 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                </div>
                
                <form onSubmit={handleSubmitShipping} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="label">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingDetails.firstName}
                        onChange={handleShippingChange}
                        required
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="label">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingDetails.lastName}
                        onChange={handleShippingChange}
                        required
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={shippingDetails.email}
                      onChange={handleShippingChange}
                      required
                      className="input"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="address" className="label">Street Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleShippingChange}
                      required
                      className="input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="city" className="label">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleShippingChange}
                        required
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="label">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingDetails.state}
                        onChange={handleShippingChange}
                        required
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="zipCode" className="label">ZIP / Postal Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={shippingDetails.zipCode}
                        onChange={handleShippingChange}
                        required
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="label">Country</label>
                      <select
                        id="country"
                        name="country"
                        value={shippingDetails.country}
                        onChange={handleShippingChange}
                        required
                        className="input"
                      >
                        <option value="USA">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="btn btn-outline"
                    >
                      Back to Cart
                    </button>
                    
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {checkoutStep === 3 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-semibold">Payment Information</h2>
                </div>
                
                <form onSubmit={handleSubmitPayment} className="p-6">
                  <div className="mb-6">
                    <label htmlFor="cardNumber" className="label">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="input pl-10"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCreditCard className="text-neutral-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="cardName" className="label">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={paymentDetails.cardName}
                      onChange={handlePaymentChange}
                      required
                      className="input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="expiryDate" className="label">Expiry Date (MM/YY)</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        required
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="label">CVV</label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentDetails.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          required
                          className="input pl-10"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="text-neutral-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-neutral-50 rounded-md">
                    <div className="flex items-center">
                      <FaLock className="text-primary-600 mr-2" />
                      <p className="text-sm text-neutral-600">
                        This is a secure SSL encrypted payment. Your credit card details are safe.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(2)}
                      className="btn btn-outline"
                      disabled={paymentProcessing}
                    >
                      Back to Shipping
                    </button>
                    
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center justify-center"
                      disabled={paymentProcessing}
                    >
                      {paymentProcessing ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        'Complete Order'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="flow-root">
                  <div className="-my-4 divide-y divide-neutral-200">
                    {checkoutStep === 1 && cartItems.map((item) => (
                      <div key={item.id} className="py-4 flex">
                        <div className="flex-shrink-0 w-16 h-16">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-16 h-16 rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium">{item.name}</h3>
                            <p className="text-sm font-medium">
                              ${((item.discount > 0 ? item.price - item.discount : item.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 mt-6 pt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {checkoutStep === 1 && (
                  <div className="mt-6">
                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="btn btn-primary w-full"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Import necessary icons
import { FaShoppingCart, FaTruck, FaCheck, FaSpinner } from 'react-icons/fa'

export default CartPage