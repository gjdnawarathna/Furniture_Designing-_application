import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categories, products } from '../data/dummyData'
import ProductCard from '../components/ui/ProductCard'

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  
  useEffect(() => {
    // Get random products for featured section
    const shuffled = [...products].sort(() => 0.5 - Math.random())
    setFeaturedProducts(shuffled.slice(0, 4))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" 
            alt="Modern living room" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-40"></div>
        </div>
        
        <div className="container-custom mx-auto z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              Transform Your Space
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover exceptional furniture that redefines comfort and elegance for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/furniture" 
                className="btn btn-primary text-center py-3 px-8 text-lg"
              >
                Shop Now
              </Link>
              <Link 
                to="/room-designer" 
                className="btn bg-white text-primary-600 hover:bg-neutral-100 text-center py-3 px-8 text-lg"
              >
                Try Room Designer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
            <p className="text-neutral-600 max-w-xl mx-auto">
              Explore our carefully curated collection of furniture for every room in your home.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/furniture?category=${category.id}`}
                className="fade-in"
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden h-48 relative"
                >
                  <img 
                    src={`https://images.pexels.com/photos/${getCategoryImage(category.id)}`}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Featured Collection</h2>
            <p className="text-neutral-600 max-w-xl mx-auto">
              Discover our most popular furniture pieces, handpicked for exceptional quality and design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/furniture" 
              className="btn btn-outline py-3 px-8"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 3D Room Designer Promo */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-4">Design Your Perfect Room</h2>
                <p className="text-lg text-neutral-700 mb-6">
                  Our innovative 3D Room Designer lets you visualize furniture in your space before you buy. 
                  Experiment with layouts, colors, and styles to create your dream room.
                </p>
                <Link
                  to="/room-designer"
                  className="btn btn-primary py-3 px-8 inline-block"
                >
                  Try Room Designer
                </Link>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img 
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
                alt="3D Room Designer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
            <p className="text-neutral-600 max-w-xl mx-auto">
              Read testimonials from our satisfied customers about their experience with Infinix Furniture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-50 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent-500">★</span>
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-500">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Helper function to get category images
const getCategoryImage = (categoryId) => {
  const imageMap = {
    'living-room': '1571460/pexels-photo-1571460.jpeg',
    'bedroom': '1743229/pexels-photo-1743229.jpeg',
    'dining': '1395967/pexels-photo-1395967.jpeg',
    'office': '1957477/pexels-photo-1957477.jpeg',
    'outdoor': '1643383/pexels-photo-1643383.jpeg'
  }
  
  return imageMap[categoryId] || '276583/pexels-photo-276583.jpeg'
}

// Dummy testimonials
const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'New York, NY',
    text: 'The quality of Infinix Furniture is exceptional. My new sofa is both beautiful and comfortable. The 3D room designer tool was a game-changer for my renovation project!',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  },
  {
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    text: 'I was hesitant to buy furniture online, but Infinix made the process seamless. The room designer feature helped me visualize exactly how everything would look in my space.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    name: 'Emily Rodriguez',
    location: 'Chicago, IL',
    text: 'The dining set I purchased exceeded my expectations. The customer service was amazing throughout the entire process. Will definitely shop here again!',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  }
]

export default HomePage