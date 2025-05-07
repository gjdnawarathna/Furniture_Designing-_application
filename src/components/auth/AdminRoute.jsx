import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoadingSpinner from '../ui/LoadingSpinner'

const AdminRoute = () => {
  const { isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner />
  }

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  )
}

export default AdminRoute