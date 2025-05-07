import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { users } from '../data/dummyData'
import localforage from 'localforage'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check if user is already logged in from local storage
  const checkAuth = useCallback(async () => {
    try {
      const savedUser = await localforage.getItem('user')
      if (savedUser) {
        setCurrentUser(savedUser)
      }
    } catch (error) {
      console.error('Error checking authentication:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email, password) => {
    setLoading(true)
    try {
      // Simulate API call with dummy data
      const user = users.find(u => u.email === email && u.password === password)
      
      if (user) {
        // Remove password from user object before storing
        const { password, ...userWithoutPassword } = user
        setCurrentUser(userWithoutPassword)
        await localforage.setItem('user', userWithoutPassword)
        toast.success('Login successful!')
        navigate('/')
        return true
      } else {
        toast.error('Invalid email or password')
        return false
      }
    } catch (error) {
      toast.error('Login failed: ' + error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    setLoading(true)
    try {
      // Check if email already exists
      const existingUser = users.find(u => u.email === email)
      if (existingUser) {
        toast.error('Email is already in use')
        return false
      }

      // Create new user (in a real app, this would be an API call)
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString()
      }

      // Add to local dummy data (in a real app, this would be stored in a database)
      users.push({ ...newUser, password })
      
      // Log in the new user automatically
      setCurrentUser(newUser)
      await localforage.setItem('user', newUser)
      
      toast.success('Registration successful!')
      navigate('/')
      return true
    } catch (error) {
      toast.error('Registration failed: ' + error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setCurrentUser(null)
    await localforage.removeItem('user')
    toast.success('Logged out successfully')
    navigate('/')
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin',
    loading,
    login,
    register,
    logout,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}