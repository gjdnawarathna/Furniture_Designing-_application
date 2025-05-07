import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUserFriends, FaShoppingCart, FaPaintBrush, FaBox, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { orders, savedDesigns, products } from '../../data/dummyData'

const AdminDashboardPage = () => {
  // Filter orders by date
  const currentDate = new Date()
  const lastMonth = new Date()
  lastMonth.setMonth(currentDate.getMonth() - 1)
  
  // Calculate metrics
  const totalOrdersThisMonth = orders.filter(order => new Date(order.createdAt) > lastMonth).length
  const totalRevenueThisMonth = orders
    .filter(order => new Date(order.createdAt) > lastMonth)
    .reduce((total, order) => total + order.grandTotal, 0)
  
  // Dummy metrics with fake growth percentages
  const metrics = [
    {
      title: 'Total Orders',
      value: totalOrdersThisMonth,
      change: 12.5,
      positive: true,
      icon: <FaShoppingCart className="text-white" />
    },
    {
      title: 'Revenue',
      value: `$${totalRevenueThisMonth.toFixed(2)}`,
      change: 8.3,
      positive: true,
      icon: <FaDollarSign className="text-white" />
    },
    {
      title: 'Products',
      value: products.length,
      change: 3.2,
      positive: true,
      icon: <FaBox className="text-white" />
    },
    {
      title: 'Saved Designs',
      value: savedDesigns.length,
      change: 5.7,
      positive: true,
      icon: <FaPaintBrush className="text-white" />
    }
  ]
  
  // Recent orders for the dashboard
  const recentOrders = [...orders].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 5)
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-neutral-500 text-sm">{metric.title}</p>
                    <h2 className="text-2xl font-bold mt-1">{metric.value}</h2>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-primary-600' : 
                    index === 1 ? 'bg-accent-500' : 
                    index === 2 ? 'bg-success-500' : 
                    'bg-accent-500'
                  }`}>
                    {metric.icon}
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className={`text-sm flex items-center ${
                    metric.positive ? 'text-success-500' : 'text-error-500'
                  }`}>
                    {metric.positive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                    {metric.change}%
                  </span>
                  <span className="text-neutral-500 text-sm ml-2">vs last month</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/admin/orders" 
                className="flex flex-col items-center justify-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <FaShoppingCart className="text-2xl text-primary-600 mb-2" />
                <span className="text-primary-600 font-medium">View Orders</span>
              </Link>
              <Link 
                to="/admin/designs" 
                className="flex flex-col items-center justify-center p-4 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors"
              >
                <FaPaintBrush className="text-2xl text-accent-500 mb-2" />
                <span className="text-accent-500 font-medium">View Designs</span>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Store Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <FaBox className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500 text-xs">Products</p>
                    <p className="font-semibold">{products.length} items</p>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                    <FaUserFriends className="text-accent-500" />
                  </div>
                  <div>
                    <p className="text-neutral-500 text-xs">Customers</p>
                    <p className="font-semibold">24 users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <Link to="/admin/orders" className="text-primary-600 hover:text-primary-700 font-medium">
                View All
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                      {order.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                      ${order.grandTotal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage