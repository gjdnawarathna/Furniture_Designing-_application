import { useState } from 'react'
import { motion } from 'framer-motion'
import { orders } from '../../data/dummyData'
import { FaSearch, FaFilter, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa'

const AdminOrdersPage = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [sortBy, setSortBy] = useState({ field: 'createdAt', ascending: false })
  
  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null)
    } else {
      setExpandedOrderId(orderId)
    }
  }
  
  // Handle sorting
  const handleSort = (field) => {
    setSortBy({
      field,
      ascending: field === sortBy.field ? !sortBy.ascending : true
    })
  }
  
  // Filter and sort orders
  const filteredOrders = [...orders].filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.userName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    let matchesDate = true
    if (dateFilter === 'today') {
      const today = new Date()
      const orderDate = new Date(order.createdAt)
      matchesDate = orderDate.toDateString() === today.toDateString()
    } else if (dateFilter === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const orderDate = new Date(order.createdAt)
      matchesDate = orderDate >= weekAgo
    } else if (dateFilter === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      const orderDate = new Date(order.createdAt)
      matchesDate = orderDate >= monthAgo
    }
    
    return matchesSearch && matchesStatus && matchesDate
  }).sort((a, b) => {
    // Sort by specified field
    if (sortBy.field === 'createdAt') {
      return sortBy.ascending
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    } else if (sortBy.field === 'total') {
      return sortBy.ascending
        ? a.grandTotal - b.grandTotal
        : b.grandTotal - a.grandTotal
    } else if (sortBy.field === 'status') {
      return sortBy.ascending
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status)
    }
    return 0
  })
  
  // Get stats for the admin order dashboard
  const orderStats = {
    total: orders.length,
    delivered: orders.filter(order => order.status === 'delivered').length,
    processing: orders.filter(order => order.status === 'processing').length,
    pending: orders.filter(order => order.status === 'pending').length,
  }
  
  // Update order status (in a real app, this would call an API)
  const updateOrderStatus = (orderId, newStatus) => {
    const orderIndex = orders.findIndex(order => order.id === orderId)
    if (orderIndex !== -1) {
      orders[orderIndex].status = newStatus
      // Force component re-render
      setExpandedOrderId(null)
      setTimeout(() => setExpandedOrderId(orderId), 0)
    }
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold mb-6">Order Management</h1>
        
        {/* Order Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <div className="text-neutral-500 text-sm">Total Orders</div>
            <div className="text-2xl font-bold mt-1">{orderStats.total}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <div className="text-neutral-500 text-sm">Delivered</div>
            <div className="text-2xl font-bold mt-1 text-success-500">{orderStats.delivered}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <div className="text-neutral-500 text-sm">Processing</div>
            <div className="text-2xl font-bold mt-1 text-blue-500">{orderStats.processing}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <div className="text-neutral-500 text-sm">Pending</div>
            <div className="text-2xl font-bold mt-1 text-yellow-500">{orderStats.pending || 0}</div>
          </motion.div>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="search" className="label">Search Orders</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-neutral-400" />
                </div>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by order ID or customer name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="status" className="label">Status</label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="label">Date Range</label>
              <select
                id="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
                setDateFilter('all')
              }}
              className="flex items-center text-primary-600 hover:text-primary-700"
            >
              <FaTimes className="mr-1" />
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center">
                      Date
                      {sortBy.field === 'createdAt' && (
                        sortBy.ascending ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      {sortBy.field === 'status' && (
                        sortBy.ascending ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('total')}
                  >
                    <div className="flex items-center">
                      Total
                      {sortBy.field === 'total' && (
                        sortBy.ascending ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-neutral-500">
                      No orders found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr className={`hover:bg-neutral-50 ${expandedOrderId === order.id ? 'bg-neutral-50' : ''}`}>
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
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => toggleOrderDetails(order.id)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                          </button>
                        </td>
                      </tr>
                      
                      {/* Expanded Details */}
                      {expandedOrderId === order.id && (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 bg-neutral-50">
                            <div className="flex flex-col md:flex-row gap-8">
                              {/* Order Items */}
                              <div className="flex-grow">
                                <h3 className="font-semibold text-sm mb-3">Order Items</h3>
                                <div className="space-y-3">
                                  {order.items.map((item) => (
                                    <div key={item.productId} className="flex items-center">
                                      <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                                        <img 
                                          src={item.image}
                                          alt={item.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-grow">
                                        <div className="font-medium text-sm">{item.name}</div>
                                        <div className="text-xs text-neutral-500">Qty: {item.quantity}</div>
                                      </div>
                                      <div className="text-sm font-medium">
                                        ${(item.price * item.quantity).toFixed(2)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="border-t border-neutral-200 mt-4 pt-4">
                                  <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${order.total.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm mt-1">
                                    <span>Tax</span>
                                    <span>${order.tax.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm mt-1">
                                    <span>Shipping</span>
                                    <span>{order.shipping > 0 ? `$${order.shipping.toFixed(2)}` : 'Free'}</span>
                                  </div>
                                  <div className="flex justify-between font-semibold mt-2">
                                    <span>Total</span>
                                    <span>${order.grandTotal.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Customer Info & Order Status */}
                              <div className="md:w-1/3">
                                <div className="mb-6">
                                  <h3 className="font-semibold text-sm mb-3">Shipping Information</h3>
                                  <address className="text-sm not-italic">
                                    <div>{order.shippingAddress.street}</div>
                                    <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                                    <div>{order.shippingAddress.country}</div>
                                  </address>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-sm mb-3">Update Status</h3>
                                  <select
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    className="input mb-3"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                  
                                  <button className="btn btn-primary w-full">
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Import React for fragments
import React from 'react'

export default AdminOrdersPage