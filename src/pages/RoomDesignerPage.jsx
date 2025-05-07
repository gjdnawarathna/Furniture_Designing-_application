import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HexColorPicker } from 'react-colorful'
import { toast } from 'react-toastify'
import { FaSave, FaUndo, FaRedo, FaTrash, FaPalette, FaCube, FaRuler, FaArrowsAlt, FaTimes } from 'react-icons/fa'
import RoomScene from '../components/room/RoomScene'
import { products, savedDesigns } from '../data/dummyData'
import { useAuth } from '../contexts/AuthContext'

const RoomDesignerPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  
  // Room state
  const [roomData, setRoomData] = useState({
    dimensions: { width: 15, length: 20, height: 10 },
    wallColor: '#F5F5F5',
    floorColor: '#8B4513',
    furniture: []
  })
  
  // UI states
  const [availableProducts, setAvailableProducts] = useState([])
  const [selectedFurnitureIndex, setSelectedFurnitureIndex] = useState(null)
  const [savedDesignName, setSavedDesignName] = useState('')
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [colorTarget, setColorTarget] = useState(null) // 'wall' or 'floor'
  const [showSettings, setShowSettings] = useState(false)
  const [designHistory, setDesignHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  // Initialize room with a product if provided in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const productId = params.get('product')
    
    if (productId) {
      const product = products.find(p => p.id === productId)
      if (product) {
        addFurnitureToRoom(product)
      }
    }
    
    // Set available products
    setAvailableProducts(products)
    
    // Initialize history
    addToHistory(roomData)
  }, [location.search])
  
  // Add a furniture item to the room
  const addFurnitureToRoom = (product) => {
    // Calculate a position that doesn't overlap with existing furniture
    const position = calculateNewPosition(roomData.furniture)
    
    const newFurniture = {
      id: product.id,
      name: product.name,
      position,
      rotation: 0,
      scale: 1
    }
    
    const updatedFurniture = [...roomData.furniture, newFurniture]
    const updatedRoom = { ...roomData, furniture: updatedFurniture }
    
    setRoomData(updatedRoom)
    addToHistory(updatedRoom)
    toast.success(`Added ${product.name} to room`)
  }
  
  // Select a furniture item for editing
  const handleSelectFurniture = (index) => {
    setSelectedFurnitureIndex(index)
  }
  
  // Update furniture position
  const updateFurniturePosition = (axis, value) => {
    if (selectedFurnitureIndex === null) return
    
    const updatedFurniture = [...roomData.furniture]
    if (!updatedFurniture[selectedFurnitureIndex].position) {
      updatedFurniture[selectedFurnitureIndex].position = { x: 0, y: 0.5, z: 0 }
    }
    
    updatedFurniture[selectedFurnitureIndex].position[axis] = parseFloat(value)
    
    const updatedRoom = { ...roomData, furniture: updatedFurniture }
    setRoomData(updatedRoom)
  }
  
  // Update furniture rotation
  const updateFurnitureRotation = (value) => {
    if (selectedFurnitureIndex === null) return
    
    const updatedFurniture = [...roomData.furniture]
    updatedFurniture[selectedFurnitureIndex].rotation = parseFloat(value)
    
    const updatedRoom = { ...roomData, furniture: updatedFurniture }
    setRoomData(updatedRoom)
  }
  
  // Update furniture scale
  const updateFurnitureScale = (value) => {
    if (selectedFurnitureIndex === null) return
    
    const updatedFurniture = [...roomData.furniture]
    updatedFurniture[selectedFurnitureIndex].scale = parseFloat(value)
    
    const updatedRoom = { ...roomData, furniture: updatedFurniture }
    setRoomData(updatedRoom)
  }
  
  // Remove selected furniture
  const removeSelectedFurniture = () => {
    if (selectedFurnitureIndex === null) return
    
    const updatedFurniture = roomData.furniture.filter((_, index) => index !== selectedFurnitureIndex)
    const updatedRoom = { ...roomData, furniture: updatedFurniture }
    
    setRoomData(updatedRoom)
    setSelectedFurnitureIndex(null)
    addToHistory(updatedRoom)
    toast.info('Removed furniture item')
  }
  
  // Update room dimensions
  const updateRoomDimension = (dimension, value) => {
    const updatedDimensions = { ...roomData.dimensions, [dimension]: parseFloat(value) }
    const updatedRoom = { ...roomData, dimensions: updatedDimensions }
    
    setRoomData(updatedRoom)
  }
  
  // Open color picker
  const openColorPicker = (target) => {
    setColorTarget(target)
    setColorPickerOpen(true)
  }
  
  // Update room colors
  const updateRoomColor = (color) => {
    if (!colorTarget) return
    
    if (colorTarget === 'wall') {
      const updatedRoom = { ...roomData, wallColor: color }
      setRoomData(updatedRoom)
    } else if (colorTarget === 'floor') {
      const updatedRoom = { ...roomData, floorColor: color }
      setRoomData(updatedRoom)
    }
  }
  
  // Save current design
  const saveDesign = () => {
    if (!savedDesignName.trim()) {
      toast.error('Please enter a name for your design')
      return
    }
    
    // In a real app, this would send data to a backend
    const newDesign = {
      id: `design-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      name: savedDesignName,
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      roomData: roomData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Add to dummy data
    savedDesigns.push(newDesign)
    
    toast.success('Design saved successfully')
    setSaveModalOpen(false)
    setSavedDesignName('')
  }
  
  // Add to design history
  const addToHistory = (design) => {
    // If we're not at the end of the history, remove all future states
    if (historyIndex < designHistory.length - 1) {
      setDesignHistory(designHistory.slice(0, historyIndex + 1))
    }
    
    // Add new state to history
    setDesignHistory([...designHistory, JSON.parse(JSON.stringify(design))])
    setHistoryIndex(historyIndex + 1)
  }
  
  // Undo last action
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setRoomData(JSON.parse(JSON.stringify(designHistory[historyIndex - 1])))
    }
  }
  
  // Redo last undone action
  const redo = () => {
    if (historyIndex < designHistory.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setRoomData(JSON.parse(JSON.stringify(designHistory[historyIndex + 1])))
    }
  }
  
  // Calculate a position for a new furniture item
  const calculateNewPosition = (existingFurniture) => {
    // Very simple positioning - just place items in a line
    return {
      x: (existingFurniture.length % 3) * 3 - 3,
      y: 0.5, // Half height
      z: Math.floor(existingFurniture.length / 3) * 3 - 3
    }
  }
  
  // Get selected furniture item
  const selectedFurniture = selectedFurnitureIndex !== null ? roomData.furniture[selectedFurnitureIndex] : null
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold mb-4">3D Room Designer</h1>
        <p className="text-neutral-600 mb-8">
          Design your perfect room by adding furniture, adjusting positions, and changing colors.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-md p-4 space-y-6">
              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => setSaveModalOpen(true)}
                  className="btn btn-primary py-2 px-4 flex items-center"
                >
                  <FaSave className="mr-2" />
                  Save
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={undo}
                    disabled={historyIndex <= 0}
                    className={`p-2 rounded-md ${
                      historyIndex <= 0 
                        ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' 
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                    title="Undo"
                  >
                    <FaUndo />
                  </button>
                  <button
                    onClick={redo}
                    disabled={historyIndex >= designHistory.length - 1}
                    className={`p-2 rounded-md ${
                      historyIndex >= designHistory.length - 1 
                        ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' 
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                    title="Redo"
                  >
                    <FaRedo />
                  </button>
                </div>
              </div>
              
              {/* Room Settings Toggle */}
              <div>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center justify-between w-full p-3 bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors"
                >
                  <span className="font-medium">Room Settings</span>
                  <span className="transform transition-transform">
                    {showSettings ? '−' : '+'}
                  </span>
                </button>
                
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    {/* Room Dimensions */}
                    <div>
                      <h3 className="font-medium mb-2">Room Dimensions</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-sm text-neutral-600 block mb-1">Width</label>
                          <input
                            type="number"
                            value={roomData.dimensions.width}
                            onChange={(e) => updateRoomDimension('width', e.target.value)}
                            min="5"
                            max="30"
                            className="input py-1 px-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-neutral-600 block mb-1">Length</label>
                          <input
                            type="number"
                            value={roomData.dimensions.length}
                            onChange={(e) => updateRoomDimension('length', e.target.value)}
                            min="5"
                            max="30"
                            className="input py-1 px-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-neutral-600 block mb-1">Height</label>
                          <input
                            type="number"
                            value={roomData.dimensions.height}
                            onChange={(e) => updateRoomDimension('height', e.target.value)}
                            min="5"
                            max="20"
                            className="input py-1 px-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Room Colors */}
                    <div>
                      <h3 className="font-medium mb-2">Room Colors</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-neutral-600 block mb-1">Wall Color</label>
                          <div 
                            className="h-8 rounded-md cursor-pointer border border-neutral-300"
                            style={{ backgroundColor: roomData.wallColor }}
                            onClick={() => openColorPicker('wall')}
                          />
                        </div>
                        <div>
                          <label className="text-sm text-neutral-600 block mb-1">Floor Color</label>
                          <div 
                            className="h-8 rounded-md cursor-pointer border border-neutral-300"
                            style={{ backgroundColor: roomData.floorColor }}
                            onClick={() => openColorPicker('floor')}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Selected Furniture Controls */}
              {selectedFurniture && (
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Selected Furniture</h3>
                    <button
                      onClick={removeSelectedFurniture}
                      className="text-error-500 hover:text-error-600 p-1"
                      title="Remove Item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  
                  <p className="text-sm text-neutral-600 mb-3">{selectedFurniture.name}</p>
                  
                  {/* Position Controls */}
                  <div className="mb-4">
                    <h4 className="flex items-center text-sm font-medium mb-2">
                      <FaArrowsAlt className="mr-1" /> Position
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs text-neutral-500 block mb-1">X</label>
                        <input
                          type="number"
                          value={selectedFurniture.position?.x || 0}
                          onChange={(e) => updateFurniturePosition('x', e.target.value)}
                          step="0.5"
                          min={-roomData.dimensions.width / 2}
                          max={roomData.dimensions.width / 2}
                          className="input py-1 px-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-500 block mb-1">Y</label>
                        <input
                          type="number"
                          value={selectedFurniture.position?.y || 0.5}
                          onChange={(e) => updateFurniturePosition('y', e.target.value)}
                          step="0.5"
                          min="0"
                          max={roomData.dimensions.height / 2}
                          className="input py-1 px-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-500 block mb-1">Z</label>
                        <input
                          type="number"
                          value={selectedFurniture.position?.z || 0}
                          onChange={(e) => updateFurniturePosition('z', e.target.value)}
                          step="0.5"
                          min={-roomData.dimensions.length / 2}
                          max={roomData.dimensions.length / 2}
                          className="input py-1 px-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Rotation Control */}
                  <div className="mb-4">
                    <label className="flex items-center text-sm font-medium mb-2">
                      <FaCube className="mr-1" /> Rotation
                    </label>
                    <input
                      type="range"
                      value={selectedFurniture.rotation || 0}
                      onChange={(e) => updateFurnitureRotation(e.target.value)}
                      min="0"
                      max="6.28"
                      step="0.01"
                      className="w-full"
                    />
                  </div>
                  
                  {/* Scale Control */}
                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <FaRuler className="mr-1" /> Scale
                    </label>
                    <input
                      type="range"
                      value={selectedFurniture.scale || 1}
                      onChange={(e) => updateFurnitureScale(e.target.value)}
                      min="0.5"
                      max="2"
                      step="0.1"
                      className="w-full"
                    />
                    <div className="text-xs text-neutral-500 text-center mt-1">
                      {(selectedFurniture.scale || 1).toFixed(1)}x
                    </div>
                  </div>
                </div>
              )}
              
              {/* Available Furniture */}
              <div className="border-t border-neutral-200 pt-4">
                <h3 className="font-medium mb-3">Add Furniture</h3>
                <div className="max-h-96 overflow-y-auto pr-2">
                  {availableProducts.map(product => (
                    <div 
                      key={product.id}
                      className="flex items-center p-2 mb-2 rounded-md hover:bg-neutral-100 cursor-pointer transition-colors"
                      onClick={() => addFurnitureToRoom(product)}
                    >
                      <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                        <img 
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-xs text-neutral-500">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Panel - 3D Room */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <RoomScene 
                roomSize={roomData.dimensions}
                wallColor={roomData.wallColor}
                floorColor={roomData.floorColor}
                furniture={roomData.furniture}
                onSelectFurniture={handleSelectFurniture}
              />
            </div>
            
            <div className="mt-4 text-center text-sm text-neutral-500">
              Click and drag to rotate view. Click on furniture to select and edit.
            </div>
          </div>
        </div>
        
        {/* Save Design Modal */}
        {saveModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Save Design</h2>
                <button
                  onClick={() => setSaveModalOpen(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="mb-4">
                <label htmlFor="designName" className="label">Design Name</label>
                <input
                  id="designName"
                  type="text"
                  value={savedDesignName}
                  onChange={(e) => setSavedDesignName(e.target.value)}
                  placeholder="My Perfect Living Room"
                  className="input"
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSaveModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={saveDesign}
                  className="btn btn-primary"
                >
                  Save Design
                </button>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Color Picker Modal */}
        {colorPickerOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-xs w-full mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  {colorTarget === 'wall' ? 'Wall Color' : 'Floor Color'}
                </h2>
                <button
                  onClick={() => setColorPickerOpen(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="mb-4">
                <HexColorPicker 
                  color={colorTarget === 'wall' ? roomData.wallColor : roomData.floorColor}
                  onChange={updateRoomColor}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-8 h-8 rounded-md border border-neutral-300 mr-2"
                    style={{ 
                      backgroundColor: colorTarget === 'wall' ? roomData.wallColor : roomData.floorColor 
                    }}
                  />
                  <span className="uppercase">
                    {colorTarget === 'wall' ? roomData.wallColor : roomData.floorColor}
                  </span>
                </div>
                
                <button
                  onClick={() => setColorPickerOpen(false)}
                  className="btn btn-primary px-4 py-2"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoomDesignerPage