import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [navigate])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown if clicking outside
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [profileDropdownOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container-custom mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-primary-600 font-bold text-2xl">INFINIX</span>
          <span className="ml-1 text-accent-500 font-light text-xl">furniture</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" 
            className={({isActive}) => 
              `font-medium hover:text-primary-600 transition-colors ${
                isActive ? 'text-primary-600' : 'text-neutral-700'
              }`
            }
          >
            Home
          </NavLink>
          
          <NavLink to="/furniture" 
            className={({isActive}) => 
              `font-medium hover:text-primary-600 transition-colors ${
                isActive ? 'text-primary-600' : 'text-neutral-700'
              }`
            }
          >
            Furniture
          </NavLink>
          
          {isAuthenticated && (
            <NavLink to="/room-designer" 
              className={({isActive}) => 
                `font-medium hover:text-primary-600 transition-colors ${
                  isActive ? 'text-primary-600' : 'text-neutral-700'
                }`
              }
            >
              Room Designer
            </NavLink>
          )}
          
          {isAdmin && (
            <NavLink to="/admin" 
              className={({isActive}) => 
                `font-medium hover:text-primary-600 transition-colors ${
                  isActive ? 'text-primary-600' : 'text-neutral-700'
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated && (
            <Link to="/cart" className="relative p-1">
              <FaShoppingCart className="text-neutral-700 hover:text-primary-600 transition-colors" size={20} />
              {getCartCount() > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {getCartCount()}
                </motion.span>
              )}
            </Link>
          )}

          {isAuthenticated ? (
            <div className="relative profile-dropdown">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors"
              >
                <FaUser className="mr-2" />
                <span className="font-medium">{currentUser.name.split(' ')[0]}</span>
              </button>
              
              {profileDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                >
                  {isAdmin && (
                    <>
                      <Link to="/admin/orders" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Orders</Link>
                      <Link to="/admin/designs" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Saved Designs</Link>
                      <div className="border-t border-neutral-200 my-1"></div>
                    </>
                  )}
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-neutral-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md mt-2 py-4 px-6 z-50"
          >
            <div className="flex flex-col space-y-4">
              <NavLink to="/" 
                className={({isActive}) => 
                  `font-medium py-2 ${
                    isActive ? 'text-primary-600' : 'text-neutral-700'
                  }`
                }
              >
                Home
              </NavLink>
              
              <NavLink to="/furniture" 
                className={({isActive}) => 
                  `font-medium py-2 ${
                    isActive ? 'text-primary-600' : 'text-neutral-700'
                  }`
                }
              >
                Furniture
              </NavLink>
              
              {isAuthenticated && (
                <>
                  <NavLink to="/room-designer" 
                    className={({isActive}) => 
                      `font-medium py-2 ${
                        isActive ? 'text-primary-600' : 'text-neutral-700'
                      }`
                    }
                  >
                    Room Designer
                  </NavLink>
                  
                  <NavLink to="/cart" 
                    className={({isActive}) => 
                      `font-medium py-2 flex items-center ${
                        isActive ? 'text-primary-600' : 'text-neutral-700'
                      }`
                    }
                  >
                    <FaShoppingCart className="mr-2" />
                    Cart 
                    {getCartCount() > 0 && (
                      <span className="ml-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getCartCount()}
                      </span>
                    )}
                  </NavLink>
                </>
              )}
              
              {isAdmin && (
                <>
                  <NavLink to="/admin" 
                    className={({isActive}) => 
                      `font-medium py-2 ${
                        isActive ? 'text-primary-600' : 'text-neutral-700'
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                  
                  <NavLink to="/admin/orders" 
                    className={({isActive}) => 
                      `font-medium py-2 ${
                        isActive ? 'text-primary-600' : 'text-neutral-700'
                      }`
                    }
                  >
                    Orders
                  </NavLink>
                  
                  <NavLink to="/admin/designs" 
                    className={({isActive}) => 
                      `font-medium py-2 ${
                        isActive ? 'text-primary-600' : 'text-neutral-700'
                      }`
                    }
                  >
                    Saved Designs
                  </NavLink>
                </>
              )}
              
              <div className="border-t border-neutral-200 pt-2">
                {isAuthenticated ? (
                  <button 
                    onClick={logout}
                    className="font-medium py-2 text-error-500"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link to="/login" className="btn btn-primary w-full text-center">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Navbar