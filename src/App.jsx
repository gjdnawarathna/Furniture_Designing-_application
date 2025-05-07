import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import FurniturePage from './pages/FurniturePage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RoomDesignerPage from './pages/RoomDesignerPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'
import AdminDesignsPage from './pages/admin/AdminDesignsPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivateRoute from './components/auth/PrivateRoute'
import AdminRoute from './components/auth/AdminRoute'
import { useAuth } from './contexts/AuthContext'

function App() {
  const location = useLocation()
  const { checkAuth } = useAuth()

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="furniture" element={<FurniturePage />} />
        <Route path="furniture/:id" element={<ProductDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Protected routes for authenticated users */}
        <Route element={<PrivateRoute />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="room-designer" element={<RoomDesignerPage />} />
        </Route>
        
        {/* Protected routes for admin users */}
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="admin/orders" element={<AdminOrdersPage />} />
          <Route path="admin/designs" element={<AdminDesignsPage />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App