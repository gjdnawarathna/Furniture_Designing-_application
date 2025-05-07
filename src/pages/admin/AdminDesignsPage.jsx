import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { savedDesigns } from '../../data/dummyData'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminDesignsPage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  
  // View design details
  const viewDesign = (designId) => {
    // In a real app, this would load the design in the room designer
    navigate(`/room-designer?design=${designId}`)
  }
  
  // Delete design (in a real app, this would call an API)
  const deleteDesign = (designId) => {
    const designIndex = savedDesigns.findIndex(design => design.id === designId)
    if (designIndex !== -1) {
      savedDesigns.splice(designIndex, 1)
      // Force re-render
      setSortBy(prev => prev === 'newest' ? 'newest_temp' : 'newest')
      toast.success('Design deleted successfully')
    }
  }
  
  // Filter and sort designs
  const filteredDesigns = [...savedDesigns].filter(design => {
    const matchesSearch = searchQuery === '' || 
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      design.userName.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  }).sort((a, b) => {
    if (sortBy === 'newest' || sortBy === 'newest_temp') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    }
    return 0
  })
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold mb-6">Saved Designs</h1>
        
        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="search" className="label">Search Designs</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-neutral-400" />
                </div>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by design name or user"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            
            <div className="md:w-1/4">
              <label htmlFor="sort" className="label">Sort By</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Design Name</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Designs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-neutral-500">No saved designs found matching your criteria</p>
            </div>
          ) : (
            filteredDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <img 
                    src={design.thumbnail}
                    alt={design.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-lg">{design.name}</h3>
                    <p className="text-neutral-200 text-sm">By {design.userName}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="text-sm text-neutral-500 mb-4">
                    Created: {new Date(design.createdAt).toLocaleDateString()}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => viewDesign(design.id)}
                      className="btn btn-outline py-2 px-4 flex items-center"
                    >
                      <FaEye className="mr-2" />
                      View
                    </button>
                    <button
                      onClick={() => deleteDesign(design.id)}
                      className="btn py-2 px-4 bg-error-500 hover:bg-error-600 text-white flex items-center"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDesignsPage